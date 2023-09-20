import BaseManager from './base/BaseManager'
import type BaseElement from '../elements/base/BaseElement'
export const SelectionEventNames = {
  Selected: 'selected',
  Deselected: 'deselected',
  SelectionChanged: 'selectionchanged'
}

export default class SelectionManager extends BaseManager {
  private readonly _selectedElements: Map<string, BaseElement> = new Map<string, BaseElement>()

  select (elements: BaseElement[], append: boolean): void {
    if (!append) {
      this.deselectAll()
    }

    const selectedElements: BaseElement[] = []
    elements.forEach((element) => {
      element.isSelected = true
      this._selectedElements.set(element.uuid, element)
      selectedElements.push(element)
    })

    this.emitSelectionEvent(SelectionEventNames.Selected, selectedElements)
    this.emitSelectionEvent(SelectionEventNames.SelectionChanged)
  }

  deselectAll (): void {
    const deselectedElements: BaseElement[] = []
    this._selectedElements.forEach((element) => {
      element.isSelected = false
      deselectedElements.push(element)
    })
    this._selectedElements.clear()
    this.emitSelectionEvent(SelectionEventNames.Deselected, deselectedElements)
    this.emitSelectionEvent(SelectionEventNames.SelectionChanged)
  }

  emitSelectionEvent (evt: string, ...args): void {
    this.emit(evt, ...args)
  }
}

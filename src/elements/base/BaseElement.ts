import ContainerResolverMixin from '../../base/mixins/ContainerResolverMixin'
import EventEmitterMixin from '../../base/mixins/EventEmitterMixin'
import { Mixin } from 'ts-mixer'
import type IScriptObject from '../../base/interfaces/IScriptObject'
import GraphicsMixin from '../../base/mixins/GraphicsMixin'
import type IDraggable from '../../base/interfaces/IDraggable'

export default abstract class BaseElement extends Mixin(ContainerResolverMixin, EventEmitterMixin, GraphicsMixin) implements IScriptObject, IDraggable {
  // #region Properties (3)

  private _canUpdate: boolean = false
  private readonly _cleanupOperations: Array<() => void> = new Array<() => void>()
  private _isSelected: boolean

  // #endregion Properties (3)

  // #region Public Accessors (4)

  public get canUpdate (): boolean {
    return this._canUpdate
  }

  public set canUpdate (value: boolean) {
    if (this._canUpdate === value) return
    if (this._canUpdate) {
      this.container.worldManager.unregisterForUpdates(this)
    }
    this._canUpdate = value
    if (value) {
      this.container.worldManager.registerForUpdates(this)
    }
  }

  public get isSelected (): boolean {
    return this._isSelected
  }

  public set isSelected (value: boolean) {
    if (this._isSelected === value) return
    if (this._isSelected) this.onDeselected()
    this._isSelected = value
    if (this._isSelected) this.onSelected()
  }

  // #endregion Public Accessors (4)

  // #region Public Methods (4)

  public onCleanup (): void {
    while (this._cleanupOperations.length > 0) {
      const operation = this._cleanupOperations.pop()
      if (operation !== undefined) {
        operation()
      }
    }
  }

  public registerForCleanup (operation: () => void): void {
    this._cleanupOperations.push(operation)
  }

  public onDragMove (evt: any): void {}

  public onDragStart (): void {}

  public onDragStop (): void {}

  // #endregion Public Methods (4)

  // #region Public Abstract Methods (6)

  public abstract onAwake (): void
  public abstract onDeselected (): void
  public abstract onDestroyed (): void
  public abstract onSelected (): void
  public abstract onStart (): void
  public abstract onUpdate (delta: number): void

  // #endregion Public Abstract Methods (6)
}

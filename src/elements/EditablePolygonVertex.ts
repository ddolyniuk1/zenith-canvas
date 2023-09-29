import type { Point } from 'pixi.js'
import { type EditablePolygon } from './EditablePolygon'
import BaseElement from './base/BaseElement'

export default class EditablePolygonVertex extends BaseElement {
  // #region Properties (2)

  private readonly _initialPosition: Point

  private _owner: EditablePolygon | null

  // #endregion Properties (2)

  // #region Constructors (1)

  constructor (position: Point, owner: EditablePolygon | null = null) {
    super()
    this._owner = owner
    this._initialPosition = position
  }

  // #endregion Constructors (1)

  // #region Public Accessors (2)

  public get owner (): EditablePolygon | null {
    return this._owner
  }

  public set owner (value: EditablePolygon) {
    this._owner = value
  }

  // #endregion Public Accessors (2)

  // #region Public Methods (7)

  public onAwake (): void {
  }

  public onDeselected (): void {
  }

  public onDestroyed (): void {
  }

  public onDragMove (event: any): void {
    if (this._owner != null) {
      this._owner.redraw()
    }
  }

  public onSelected (): void {
  }

  public onStart (): void {
    this.registerForCleanup(this.container.interactionManager.scaleFactor.subscribe((oldValue: number, newValue: number) => { this.redraw() }))

    this.graphics.position.x = this._initialPosition.x
    this.graphics.position.y = this._initialPosition.y
    this.redraw()
  }

  public redraw (): void {
    this.graphics.clear()
    const scale = this.container.interactionManager.scaleFactor.value
    this.container.interactionManager.registerInteractions(this)
    if (this.isSelected) {
      this.graphics.lineStyle(2 / scale, 0xFFFF00) // Red stroke
    } else {
      this.graphics.lineStyle(2 / scale, 0xFF0000) // Red stroke
    }
    this.graphics.beginFill(0xFFD700) // Gold fill color
    this.graphics.drawEllipse(0, 0, 5 / scale, 5 / scale) // Draw an ellipse
    this.graphics.endFill()
  }

  public onUpdate (): void {
  }

  // #endregion Public Methods (7)
}

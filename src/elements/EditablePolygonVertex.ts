import * as PIXI from 'pixi.js'
import { type EditablePolygon } from './EditablePolygon'
import type IDraggable from '../base/interfaces/IDraggable'
import ZenithApp from '../ZenithApp'

export default class EditablePolygonVertex extends PIXI.Graphics implements IDraggable {
  // #region Properties (1)

  private _owner: EditablePolygon | null

  // #endregion Properties (1)

  // #region Constructors (1)

  constructor (position: PIXI.Point, owner: EditablePolygon | null = null) {
    super()
    this._owner = owner
    this.position.x = position.x
    this.position.y = position.y
    this.lineStyle(2, 0xFF0000) // Red stroke
    this.beginFill(0xFFD700) // Gold fill color
    this.drawEllipse(0, 0, 25, 25) // Draw an ellipse
    this.endFill()
    ZenithApp.getInstance().interactionManager.registerDraggable(this)
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

  // #region Public Methods (3)

  public onDragMove (event: any): void {
    if (this._owner != null) {
      this._owner.redraw()
    }
  }

  public onDragStart (): void {
  }

  public onDragStop (): void {
  }

  // #endregion Public Methods (3)
}

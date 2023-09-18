import * as PIXI from 'pixi.js'
import EditablePolygonVertex from './EditablePolygonVertex'
import ZenithApp from '../ZenithApp'
import type IDragHandler from '../base/interfaces/IDragHandler'

export class EditablePolygon extends PIXI.Graphics implements IDragHandler {
  // #region Properties (2)

  private readonly _vertexes: EditablePolygonVertex[] = []

  private _points: PIXI.IPoint[]

  // #endregion Properties (2)

  // #region Constructors (1)

  constructor () {
    super()
    ZenithApp.getInstance().interactionManager.registerDraggable(this)
  }

  // #endregion Constructors (1)

  // #region Public Methods (5)

  public addVertex (x: number, y: number): void {
    const point = new PIXI.Point(x, y)
    const vertex = new EditablePolygonVertex(point, this)
    this.addChild(vertex)
    this._vertexes.push(vertex)
    this._points = this._vertexes.flatMap(t => t.position)
    this.redraw()
  }

  public onDragMove (event: any): void {
  }

  public onDragStart (): void {
  }

  public onDragStop (): void {
  }

  public redraw (): void {
    this.clear()
    this.beginFill(0x5d0015)

    this.drawPolygon(
      this._points
    )
    this.endFill()
  }

  // #endregion Public Methods (5)
}

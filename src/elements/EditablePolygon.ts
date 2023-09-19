import * as PIXI from 'pixi.js'
import EditablePolygonVertex from './EditablePolygonVertex'
import BaseElement from './base/BaseElement'

export class EditablePolygon extends BaseElement {
  // #region Properties (3)

  private readonly _vertexes: EditablePolygonVertex[] = []

  private _points: PIXI.IPoint[]

  public onStart = (): void => {
    this.container?.interactionManager.registerDraggable(this)
  }

  // #endregion Properties (3)

  // #region Public Methods (8)

  public addVertex (x: number, y: number): void {
    const point = new PIXI.Point(x, y)
    const vertex = new EditablePolygonVertex(point, this)
    this.container?.worldManager.addToWorld(vertex, this)
    this._vertexes.push(vertex)
    this._points = this._vertexes.flatMap(t => t.graphics.position)
    this.redraw()
  }

  public onAwake (): void {

  }

  public onDestroyed (): void {

  }

  public onDragMove (event: any): void {
  }

  public onDragStart (): void {
  }

  public onDragStop (): void {
  }

  public onUpdate (): void {

  }

  public redraw (): void {
    this.graphics.clear()
    this.graphics.beginFill(0x5d0015)
    this.graphics.drawPolygon(
      this._points
    )
    this.graphics.endFill()
  }

  // #endregion Public Methods (8)
}

import * as PIXI from 'pixi.js'
import EditablePolygonVertex from './EditablePolygonVertex'
import BaseElement from './base/BaseElement'

export class EditablePolygon extends BaseElement {
  // #region Properties (5)

  private readonly _vertexes: EditablePolygonVertex[] = []

  private _fillColor: number = 0x000000
  private _points: PIXI.IPoint[]
  private _stroke: number | null = null

  public onStart = (): void => {
    this.container?.interactionManager.registerInteractions(this)
    this.canUpdate = true
    this.fillColor = 0x5d0015
    this.registerForCleanup(this.container.interactionManager.scaleFactor.subscribe((oldValue: number, newValue: number) => { this.redraw() }))
  }

  // #endregion Properties (5)

  // #region Public Accessors (4)

  public get fillColor (): number {
    return this._fillColor
  }

  public set fillColor (value: number) {
    if (this._fillColor === value) return
    this._fillColor = value
    this.redraw()
  }

  public get stroke (): number | null {
    return this._stroke
  }

  public set stroke (value: number | null) {
    if (this._stroke === value) return
    this._stroke = value
    this.redraw()
  }

  // #endregion Public Accessors (4)

  // #region Public Methods (10)

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

  public onDeselected (): void {
    this.stroke = null
  }

  public onDestroyed (): void {
  }

  public onDragMove (event: any): void {
  }

  public onDragStart (): void {
  }

  public onDragStop (): void {
  }

  public onSelected (): void {
    this.stroke = 0xffff00
  }

  public onUpdate (delta: number): void {
  }

  public redraw (): void {
    const scale = this.container.interactionManager.scaleFactor.value
    if (this._points == null || this._points.length === 0) return
    this.graphics.clear()
    if (this._stroke !== null) {
      this.graphics.lineStyle(4 / scale, this._stroke)
    }
    this.graphics.beginFill(this._fillColor)
    this.graphics.drawPolygon(
      this._points
    )
    this.graphics.endFill()
  }

  // #endregion Public Methods (10)
}

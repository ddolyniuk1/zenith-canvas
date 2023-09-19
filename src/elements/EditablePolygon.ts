import * as PIXI from 'pixi.js'
import EditablePolygonVertex from './EditablePolygonVertex'
import BaseElement from './base/BaseElement'
import TWEEN from '@tweenjs/tween.js'
import { convertRGBToInt, extractRGB } from '../utilities/ColorUtil'

export class EditablePolygon extends BaseElement {
  // #region Properties (6)

  private readonly _vertexes: EditablePolygonVertex[] = []
  private readonly isAlarmed: boolean = true

  private _fillColor: number = 0x000000
  private _points: PIXI.IPoint[]
  private _tween: any | null = null

  public onStart = (): void => {
    this.container?.interactionManager.registerDraggable(this)
    this.canUpdate = true
    this.fillColor = 0x5d0015

    if (this.isAlarmed) {
      console.dir(extractRGB(0x110000))
      const val = { r: 17, g: 0, b: 0 }
      this.tween = new TWEEN.Tween(val, false) // Create a new tween that modifies 'coords'.
        .to({ r: 255, g: 0, b: 0 }, 200) // Move to (300, 200) in 1 second.
        .easing(TWEEN.Easing.Quadratic.InOut)
        .onUpdate(e => {
          console.dir(e)
          this.fillColor = Math.round(convertRGBToInt(e))
        })
        .repeat(Infinity)
        .yoyo(true)
        .start()
    }
  }

  // #endregion Properties (6)

  // #region Public Accessors (4)

  public get fillColor (): number {
    return this._fillColor
  }

  public set fillColor (value: number) {
    if (this._fillColor === value) return
    this._fillColor = value
    this.redraw()
  }

  public get tween (): any {
    return this._tween
  }

  public set tween (value: any) {
    if (this._tween != null) {
      this._tween.stop()
      delete this._tween
    }
    this._tween = value
    if (this._tween != null) {
      this._tween.start()
    }
  }

  // #endregion Public Accessors (4)

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

  public onUpdate (delta: number): void {
    if (this.tween != null) {
      this.tween.update()
    }
  }

  public redraw (): void {
    if (this._points == null || this._points.length === 0) return
    this.graphics.clear()
    this.graphics.beginFill(this._fillColor)
    this.graphics.drawPolygon(
      this._points
    )
    this.graphics.endFill()
  }

  // #endregion Public Methods (8)
}

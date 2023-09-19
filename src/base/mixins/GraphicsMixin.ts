import * as PIXI from 'pixi.js'
import IdentifiableMixin from './IdentifiableMixin'
export default class GraphicsMixin extends IdentifiableMixin {
  // #region Properties (3)

  private readonly _children: Map<string, GraphicsMixin> = new Map<string, GraphicsMixin>()

  private _parent: GraphicsMixin | null = null

  public _graphics: PIXI.Graphics

  // #endregion Properties (3)

  // #region Public Accessors (5)

  public get children (): Map<string, GraphicsMixin> {
    return this._children
  }

  public get graphics (): PIXI.Graphics {
    if (this._graphics === undefined) {
      this.onBuild()
    }
    return this._graphics
  }

  public set graphics (value: PIXI.Graphics) {
    this._graphics = value
  }

  public get parent (): GraphicsMixin | null {
    return this._parent
  }

  public set parent (value: GraphicsMixin) {
    if (this._parent != null) {
      this._parent.removeChild(this)
    }
    this._parent = value
    this._parent.addChild(this)
  }

  // #endregion Public Accessors (5)

  // #region Public Methods (3)

  public addChild (child: GraphicsMixin): boolean {
    if (this._children.has(child.uuid)) {
      return false
    }

    this._graphics.addChild(child.graphics)
    this._children.set(child.uuid, child)
    return true
  }

  public onBuild (): void {
    this._graphics = new PIXI.Graphics()
  }

  public removeChild (child: GraphicsMixin): boolean {
    if (!this._children.has(child.uuid)) {
      return false
    }

    const index = this._graphics.getChildIndex(this.graphics)
    if (index !== -1) {
      this.graphics.removeChildAt(index)
    }
    return this._children.delete(child.uuid)
  }

  // #endregion Public Methods (3)
}

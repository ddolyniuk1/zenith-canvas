import { EditablePolygon } from '../elements/EditablePolygon'
import BaseTool from './base/BaseTool'

export default class PolygonTool extends BaseTool {
  // #region Properties (1)

  private _activePoly: EditablePolygon

  // #endregion Properties (1)

  // #region Public Methods (5)

  public init (): void {
    this._activePoly = new EditablePolygon()
    this.container.worldManager.addToWorld(this._activePoly)
    this._activePoly.graphics.zIndex = 999
  }

  public onClick (event: any): void {
  }

  public onDoubleClick (event: any): void {
    const localPos = this._activePoly.graphics.toLocal(event.data.global)
    this._activePoly.addVertex(localPos.x, localPos.y)
  }

  public unInit (): void {
  }

  public onKeyDown (event: any): void {

  }

  public onKeyUp (event: any): void {
  }

  // #endregion Public Methods (5)
}

import ZenithApp from '../ZenithApp'
import type IToolInteraction from '../base/interfaces/IToolInteraction'
import { EditablePolygon } from '../components/EditablePolygon'

export default class PolygonTool implements IToolInteraction {
  // #region Properties (1)

  private _activePoly: EditablePolygon

  // #endregion Properties (1)

  // #region Public Methods (5)

  public init (): void {
    this._activePoly = new EditablePolygon()
    ZenithApp.getInstance().worldManager.stage.addChild(this._activePoly)
    this._activePoly.zIndex = 999
  }

  public onClick (event: any): void {
  }

  public onDoubleClick (event: any): void {
    const localPos = this._activePoly.toLocal(event.data.global)
    this._activePoly.addVertex(localPos.x, localPos.y)
  }

  public onKeyPress (event: any): void {
  }

  public unInit (): void {
  }

  // #endregion Public Methods (5)
}

import type * as PIXI from 'pixi.js'
import BaseManager from './base/BaseManager'

export default class WorldManager extends BaseManager {
  // #region Properties (1)

  private _stage: PIXI.Container<PIXI.DisplayObject>

  // #endregion Properties (1)

  // #region Public Accessors (2)

  public get stage (): PIXI.Container<PIXI.DisplayObject> {
    return this._stage
  }

  public set stage (value: PIXI.Container<PIXI.DisplayObject>) {
    this._stage = value
    this.container.pixi.stage.addChild(this._stage)
  }

  // #endregion Public Accessors (2)

  // #region Public Methods (1)

  public addToWorld (displayObject: PIXI.DisplayObject): void {
    this.stage.addChild(displayObject)
  }

  // #endregion Public Methods (1)
}

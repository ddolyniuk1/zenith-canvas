import type * as PIXI from 'pixi.js'
import type BaseElement from '../elements/base/BaseElement'
import BaseManager from './base/BaseManager'
import type GraphicsMixin from '../base/mixins/GraphicsMixin'

export default class WorldManager extends BaseManager {
  // #region Properties (3)

  private readonly _elementMap: Map<string, BaseElement> = new Map<string, BaseElement>()

  private _isStarted: boolean = false
  private _stage: PIXI.Container<PIXI.DisplayObject>

  // #endregion Properties (3)

  // #region Public Accessors (4)

  public get isStarted (): boolean {
    return this._isStarted
  }

  public set isStarted (value: boolean) {
    this._isStarted = value
  }

  public get stage (): PIXI.Container<PIXI.DisplayObject> {
    return this._stage
  }

  public set stage (value: PIXI.Container<PIXI.DisplayObject>) {
    this._stage = value
    this.container.pixi.stage.addChild(this._stage)
  }

  // #endregion Public Accessors (4)

  // #region Public Methods (2)

  public addToWorld (object: BaseElement, parent: BaseElement | null = null): void {
    if (parent == null) {
      this.stage.addChild(object.graphics)
    } else {
      (parent).addChild(object)
    }
    this._elementMap.set(object.uuid, object)

    console.log(this.isStarted + ' is started')
    if (this.isStarted) {
      object.onAwake()
      object.onStart()
    }
  }

  public removeFromWorld (object: GraphicsMixin): boolean {
    if (!this._elementMap.has(object.uuid)) {
      return false
    }
    const removed = this._elementMap.delete(object.uuid)
    console.log('removed ' + object.uuid + ' from world')
    object.children.forEach((child) => {
      if (child != null) {
        this.removeFromWorld(child)
      }
    })
    if (object.parent != null) {
      // Recurse through each child object and remove it from world if it is an BaseElement
      object.parent.removeChild(object)
    }
    const scriptObject = object as BaseElement
    scriptObject.onDestroyed()

    return removed
  }

  public awake (): void {
    console.log('awake world')
    this._elementMap.forEach(element => {
      console.log(`${element.uuid} awake`)
      element.onAwake()
    })
  }

  public start (): void {
    console.log('start world')
    this.isStarted = true
    this._elementMap.forEach(element => {
      console.log(`${element.uuid} start`)
      element.onStart()
    })
  }

  // #endregion Public Methods (2)
}

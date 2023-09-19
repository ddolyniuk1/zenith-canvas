import type * as PIXI from 'pixi.js'
import type BaseElement from '../elements/base/BaseElement'
import BaseManager from './base/BaseManager'
import type GraphicsMixin from '../base/mixins/GraphicsMixin'

export default class WorldManager extends BaseManager {
  // #region Properties (5)

  private readonly _elementMap: Map<string, BaseElement> = new Map<string, BaseElement>()
  private readonly _updateMap: Map<string, BaseElement> = new Map<string, BaseElement>()

  private _isStarted: boolean = false
  private _stage: PIXI.Container<PIXI.DisplayObject>

  public time: number = 0

  // #endregion Properties (5)

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

  // #region Public Methods (7)

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

  public awake (): void {
    console.log('awake world')
    this._elementMap.forEach(element => {
      console.log(`${element.uuid} awake`)
      element.onAwake()
    })
  }

  public registerForUpdates (element: BaseElement): void {
    this._updateMap.set(element.uuid, element)
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
    if (scriptObject != null) {
      scriptObject.onDestroyed()
      this.unregisterForUpdates(scriptObject)
    }

    return removed
  }

  public start (): void {
    if (this.isStarted) {
      throw new Error('Already started world!')
    }
    this.isStarted = true
    this._elementMap.forEach(element => {
      element.onAwake()
      element.onStart()
    })
  }

  public unregisterForUpdates (element: BaseElement): void {
    this._updateMap.delete(element.uuid)
  }

  public updateWorld (delta: number): void {
    this._updateMap.forEach(element => {
      this.time += delta
      element.onUpdate(delta)
    })
  }

  // #endregion Public Methods (7)
}

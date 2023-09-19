import type * as PIXI from 'pixi.js'
import AnimationManager from './managers/AnimationManager'
import InteractionManager from './managers/InteractionManager'
import ToolManager from './managers/ToolManager'
import PolygonTool from './Tools/PolygonTool'
import type IContainer from './base/interfaces/IContainer'
import WorldManager from './managers/WorldManager'

export default class ZenithApp implements IContainer {
  private static _instance: ZenithApp | null
  private readonly _toolManager: ToolManager
  private readonly _worldManager: WorldManager

  private readonly _pixi: PIXI.Application
  private readonly _animationManager: AnimationManager
  private readonly _interactionManager: InteractionManager

  constructor (app: PIXI.Application) {
    ZenithApp._instance = this
    this._pixi = app

    // initialize managers
    this._worldManager = new WorldManager()
    this._animationManager = new AnimationManager()
    this._interactionManager = new InteractionManager()
    this._toolManager = new ToolManager()

    // register tools
    this._toolManager.registerTool('polygon', new PolygonTool())

    this._worldManager.awake()
    this._worldManager.start()
    app.ticker.add((delta) => { this.gameLoop(delta) })
  }

  public get interactionManager (): InteractionManager {
    return this._interactionManager
  }

  public get animationManager (): AnimationManager {
    return this._animationManager
  }

  public get pixi (): PIXI.Application {
    return this._pixi
  }

  public get toolManager (): ToolManager {
    return this._toolManager
  }

  public get worldManager (): WorldManager {
    return this._worldManager
  }

  public static getInstance (): ZenithApp {
    if (ZenithApp._instance == null) {
      throw new Error('No ZenithApp instance found!')
    }
    return ZenithApp._instance
  }

  private gameLoop (delta: number): void {
    this.worldManager.updateWorld(delta)
  }
}

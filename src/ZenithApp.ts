import * as PIXI from "pixi.js";
import { AnimationManager } from "./managers/AnimationManager";
import InteractionManager from "./managers/InteractionManager"; 
import ToolManager from "./managers/ToolManager";
import PolygonTool from "./Tools/PolygonTool";

export default class ZenithApp {
  private static _instance: ZenithApp;
  private _toolManager: ToolManager;

  public static getInstance(): ZenithApp {
    if (!ZenithApp._instance) {
      throw "No ZenithApp instance found!";
    }
    return ZenithApp._instance;
  }

  private _app: PIXI.Application;
  private _animationManager: AnimationManager;  
  private _interactionManager: InteractionManager;
  public get interactionManager(): InteractionManager {
    return this._interactionManager;
  } 
  public animate(): void {
    this._app.ticker.add(() => {
      this._animationManager.redraw();
    });
  }

  public get animationManager(): AnimationManager {
    return this._animationManager;
  }

  public get pixi(): PIXI.Application {
    return this._app;
  }

  constructor(app: PIXI.Application) {
    ZenithApp._instance = this;
    this._app = app;
    this._animationManager = new AnimationManager(this);
    this._interactionManager = new InteractionManager(this);
    this._toolManager = new ToolManager(this);
    
    // register tools
    this._toolManager.registerTool('polygon', new PolygonTool());
    this._toolManager.setActiveTool('polygon')
    
    app.ticker.add(delta => this.gameLoop(delta)); 
  }

  private gameLoop(delta) {
     
  }
}
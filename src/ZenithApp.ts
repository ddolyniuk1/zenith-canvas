import * as PIXI from "pixi.js";
import { AnimationManager } from "./managers/AnimationManager";
import InteractionManager from "./managers/InteractionManager";

export default class ZenithApp {
  private static _instance: ZenithApp;

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
    this._app.renderer.resize(document.documentElement.clientWidth, document.documentElement.clientHeight); 
  }
}
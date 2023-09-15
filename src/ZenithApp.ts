import * as PIXI from "pixi.js";
import { AnimationManager } from "./managers/AnimationManager";
import InteractionManager from "./managers/InteractionManager";

export default class ZenithApp {
  private _app: PIXI.Application;
  private _animationManager: AnimationManager;  
  private _interactionManager: InteractionManager;
  public get interactionManager(): InteractionManager {
    return this._interactionManager;
  } 
  public animate(): void {
    this._app.ticker.add(() => {
      this._animationManager.render();
    });
  }

  public get animationManager(): AnimationManager {
    return this._animationManager;
  }

  public get pixi(): PIXI.Application {
    return this._app;
  }

  constructor(app: PIXI.Application) {
    this._app = app;
    this._animationManager = new AnimationManager(this);
    this._interactionManager = new InteractionManager(this);
    this._app.renderer.resize(window.innerWidth, window.innerHeight); 
  }
}

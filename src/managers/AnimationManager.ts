import ZenithApp from "../ZenithApp";
import { IAnimatable } from "../base/interfaces/IAnimatable";

export class AnimationManager {
  private animatables: IAnimatable[] = [];

  private _app: ZenithApp;

  constructor(app: ZenithApp) {
    this._app = app;
  }
  

  public register(animatable: IAnimatable): void {
    this.animatables.push(animatable);
  }

  public render(): void {
    this.animatables.forEach(animatable => animatable.render());
  }
}

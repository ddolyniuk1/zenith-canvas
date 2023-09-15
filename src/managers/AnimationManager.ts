import ZenithApp from "../ZenithApp";
import { IAnimateable } from "../base/interfaces/IAnimateable";

export class AnimationManager {
  private animateables: IAnimateable[] = [];

  private _app: ZenithApp;

  constructor(app: ZenithApp) {
    this._app = app;
  }
  

  public register(animateable: IAnimateable): void {
    this.animateables.push(animateable);
  }

  public render(): void {
    this.animateables.forEach(animateable => animateable.render());
  }
}

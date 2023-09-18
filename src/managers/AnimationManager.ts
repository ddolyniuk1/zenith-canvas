import { type IAnimatable } from '../base/interfaces/IAnimatable'
import BaseManager from './base/BaseManager'

export default class AnimationManager extends BaseManager {
  // #region Properties (1)

  private readonly animatables: IAnimatable[] = []

  // #endregion Properties (1)

  // #region Public Methods (2)

  public redraw (): void {
    this.animatables.forEach(animatable => { animatable.render() })
  }

  public register (animatable: IAnimatable): void {
    this.animatables.push(animatable)
  }

  // #endregion Public Methods (2)
}

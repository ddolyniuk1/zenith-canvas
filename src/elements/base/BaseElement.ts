import ContainerResolverMixin from '../../base/mixins/ContainerResolverMixin'
import EventEmitterMixin from '../../base/mixins/EventEmitterMixin'
import { Mixin } from 'ts-mixer'
import type IScriptObject from '../../base/interfaces/IScriptObject'
import GraphicsMixin from '../../base/mixins/GraphicsMixin'
import type IDraggable from '../../base/interfaces/IDraggable'

export default abstract class BaseElement extends Mixin(ContainerResolverMixin, EventEmitterMixin, GraphicsMixin) implements IScriptObject, IDraggable {
  // #region Properties (1)

  private _isSelected: boolean

  // #endregion Properties (1)

  // #region Public Accessors (2)

  public get isSelected (): boolean {
    return this._isSelected
  }

  public set isSelected (value: boolean) {
    this._isSelected = value
  }

  // #endregion Public Accessors (2)

  // #region Public Methods (3)

  public onDragMove (evt: any): void {}

  public onDragStart (): void {}

  public onDragStop (): void {}

  // #endregion Public Methods (3)

  // #region Public Abstract Methods (4)

  public abstract onAwake (): void
  public abstract onDestroyed (): void
  public abstract onStart (): void
  public abstract onUpdate (): void

  // #endregion Public Abstract Methods (4)
}

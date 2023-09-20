import ContainerResolverMixin from '../../base/mixins/ContainerResolverMixin'
import EventEmitterMixin from '../../base/mixins/EventEmitterMixin'
import { Mixin } from 'ts-mixer'
import type IScriptObject from '../../base/interfaces/IScriptObject'
import GraphicsMixin from '../../base/mixins/GraphicsMixin'
import type IDraggable from '../../base/interfaces/IDraggable'

export default abstract class BaseElement extends Mixin(ContainerResolverMixin, EventEmitterMixin, GraphicsMixin) implements IScriptObject, IDraggable {
  // #region Properties (2)

  private _canUpdate: boolean = false
  private _isSelected: boolean

  // #endregion Properties (2)

  // #region Public Accessors (4)

  public get canUpdate (): boolean {
    return this._canUpdate
  }

  public set canUpdate (value: boolean) {
    if (this._canUpdate === value) return
    if (this._canUpdate) {
      this.container.worldManager.unregisterForUpdates(this)
    }
    this._canUpdate = value
    if (value) {
      this.container.worldManager.registerForUpdates(this)
    }
  }

  public get isSelected (): boolean {
    return this._isSelected
  }

  public set isSelected (value: boolean) {
    if (this._isSelected === value) return
    if (this._isSelected) this.onDeselected()
    this._isSelected = value
    if (this._isSelected) this.onSelected()
  }

  // #endregion Public Accessors (4)

  // #region Public Methods (3)

  public onDragMove (evt: any): void {}

  public onDragStart (): void {}

  public onDragStop (): void {}

  // #endregion Public Methods (3)

  // #region Public Abstract Methods (4)

  public abstract onSelected (): void
  public abstract onDeselected (): void
  public abstract onAwake (): void
  public abstract onDestroyed (): void
  public abstract onStart (): void
  public abstract onUpdate (delta: number): void

  // #endregion Public Abstract Methods (4)
}

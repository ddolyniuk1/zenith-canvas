import ContainerResolverMixin from '../../base/mixins/ContainerResolverMixin'
import EventEmitterMixin from '../../base/mixins/EventEmitterMixin'
import * as PIXI from 'pixi.js'
class BaseElementInternal extends PIXI.Graphics {
  private _isSelected: boolean
  public get isSelected (): boolean {
    return this._isSelected
  }

  public set isSelected (value: boolean) {
    this._isSelected = value
  }
}

export default class BaseElement extends ContainerResolverMixin(EventEmitterMixin(BaseElementInternal)) {}

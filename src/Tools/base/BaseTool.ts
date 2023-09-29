import { Mixin } from 'ts-mixer'
import type IToolInteraction from '../../base/interfaces/IToolInteraction'
import ContainerResolverMixin from '../../base/mixins/ContainerResolverMixin'
import EventEmitterMixin from '../../base/mixins/EventEmitterMixin'

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export default abstract class BaseTool extends Mixin(EventEmitterMixin, ContainerResolverMixin) implements IToolInteraction {
  abstract onDoubleClick (event: any, target: any | null): void
  abstract onClick (event: any, target: any | null): void
  abstract onKeyDown (event: any): void
  abstract onKeyUp (event: any): void
  abstract init (): void
  abstract unInit (): void
}

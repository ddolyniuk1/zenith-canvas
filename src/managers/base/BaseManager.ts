import ContainerResolverMixin from '../../base/mixins/ContainerResolverMixin'
import EventEmitterMixin from '../../base/mixins/EventEmitterMixin'
import { Mixin } from 'ts-mixer'

export default class BaseManager extends Mixin(ContainerResolverMixin, EventEmitterMixin) {

}

import ContainerResolverMixin from '../../base/mixins/ContainerResolverMixin'
import EventEmitterMixin from '../../base/mixins/EventEmitterMixin'

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
class BaseManagerInternal {
}

export default class BaseManager extends ContainerResolverMixin(EventEmitterMixin(BaseManagerInternal)) {}

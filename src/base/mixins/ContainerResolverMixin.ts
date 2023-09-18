import ZenithApp from '../../ZenithApp'
import type IContainer from '../interfaces/IContainer'

export default function ContainerResolverMixin (Base: any): new (...args: any[]) => any {
  return class extends Base {
    private _container: IContainer | null = null
    public get container (): IContainer | null {
      if (this._container == null) {
        this._container = ZenithApp.getInstance() as IContainer
      }
      return this._container
    }
  }
}

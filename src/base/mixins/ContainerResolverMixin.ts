import ZenithApp from '../../ZenithApp'
import type IContainer from '../interfaces/IContainer'

export default class implements IContainerResolver {
  private _container: IContainer
  public get container (): IContainer {
    if (this._container == null || this._container === undefined) {
      this._container = ZenithApp.getInstance() as IContainer
    }
    return this._container
  }
}

export interface IContainerResolver {
  get container (): IContainer | null
}

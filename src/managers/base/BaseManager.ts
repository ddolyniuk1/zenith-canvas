import type IContainer from '../../base/interfaces/IContainer'

export default class BaseManager {
  // #region Properties (1)

  private readonly _container: IContainer

  // #endregion Properties (1)

  // #region Constructors (1)

  constructor (container: IContainer) {
    this._container = container
  }

  // #endregion Constructors (1)

  // #region Public Accessors (1)

  public get container (): IContainer {
    return this._container
  }

  // #endregion Public Accessors (1)
}

import { v4 as uuidv4 } from 'uuid'

export default class implements IIdentifiable {
  private readonly _uuid: string

  constructor () {
    this._uuid = uuidv4()
  }

  public get uuid (): string {
    return this._uuid
  }
}

export interface IIdentifiable {
  // #region Public Accessors (1)

  get uuid(): string

  // #endregion Public Accessors (1)
}

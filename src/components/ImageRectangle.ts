import * as PIXI from 'pixi.js'

export default class ImageRectangle extends PIXI.Graphics {
  // #region Properties (2)

  private _imagePath: string
  private _texture: PIXI.Texture

  // #endregion Properties (2)

  // #region Constructors (1)

  constructor (imagePath: string) {
    super()
    this._texture = PIXI.Texture.from(imagePath)
    this.beginTextureFill({ texture: this._texture })
    this.drawRect(0, 0, this._texture.width, this._texture.height)
    this.endFill()
  }

  // #endregion Constructors (1)

  // #region Public Accessors (2)

  public get image (): string {
    return this._imagePath
  }

  public set image (imagePath: string) {
    this._imagePath = imagePath
    this._texture = PIXI.Texture.from(imagePath)
    this.clear()
    this.beginTextureFill({ texture: this._texture })
    this.drawRect(0, 0, this._texture.width, this._texture.height)
    this.endFill()
  }

  // #endregion Public Accessors (2)
}

import * as PIXI from "pixi.js";

export default class ImageRectangle extends PIXI.Graphics {
  private _texture: PIXI.Texture;
    private _imagePath: string;

  constructor(imagePath: string) {
    super();
    this._texture = PIXI.Texture.from(imagePath);
    this.beginTextureFill({ texture: this._texture });
    this.drawRect(0, 0, this._texture.width, this._texture.height);
    this.endFill();
  }

  set image(imagePath: string) {
    this._imagePath = imagePath;
    this._texture = PIXI.Texture.from(imagePath);
    this.clear();
    this.beginTextureFill({ texture: this._texture });
    this.drawRect(0, 0, this._texture.width, this._texture.height);
    this.endFill();
  }

  get image(): string {
    return this._imagePath;
  }
}

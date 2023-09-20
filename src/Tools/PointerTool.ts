import BaseTool from './base/BaseTool'

export default class PointerTool extends BaseTool {
  // #region Public Methods (6)

  public init (): void {

  }

  public onClick (event: any): void {
    console.dir(this.container.interactionManager.lastClicked)
    if (this.container.interactionManager.lastClicked != null) {
      this.container.selectionManager.select([this.container.interactionManager.lastClicked], false)
    } else {
      this.container.selectionManager.deselectAll()
    }
  }

  public onDoubleClick (event: any): void {

  }

  public onKeyDown (event: any): void {

  }

  public onKeyUp (event: any): void {

  }

  public unInit (): void {
  }

  // #endregion Public Methods (6)
}

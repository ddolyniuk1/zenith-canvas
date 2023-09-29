import { InteractionEventNames } from '../managers/InteractionManager'
import BaseTool from './base/BaseTool'

export default class PointerTool extends BaseTool {
  // #region Public Methods (6)

  public init (): void {
    this.container.interactionManager.on(InteractionEventNames.ObjectClicked, this.onObjectClicked.bind(this))
  }

  public onClick (event: any, target: any | null): void {
    if (target == null) {
      this.container.selectionManager.deselectAll()
    }
  }

  public onDoubleClick (event: any, target: any | null): void {
  }

  public onKeyDown (event: any): void {
  }

  public onKeyUp (event: any): void {
  }

  public unInit (): void {
  }

  // #endregion Public Methods (6)

  // #region Private Methods (1)

  private onObjectClicked (target: any | null): void {
    if (target != null) {
      this.container.selectionManager.select([target], false)
    } else {
      this.container.selectionManager.deselectAll()
    }
  }

  // #endregion Private Methods (1)
}

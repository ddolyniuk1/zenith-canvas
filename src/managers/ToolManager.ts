import type IToolInteraction from '../base/interfaces/IToolInteraction'
import { Events as GlobalInteractionEvents } from './InteractionManager'
import BaseManager from './base/BaseManager'

export default class ToolManager extends BaseManager {
  // #region Properties (2)

  private _activeTool: IToolInteraction | null
  private _tools: Record<string, IToolInteraction> = {}

  // #endregion Properties (2)

  // #region Constructors (1)

  constructor () {
    super()
    this.container.interactionManager.on(GlobalInteractionEvents.DoubleClick, this.onDoubleClick.bind(this))
    this.container.interactionManager.on(GlobalInteractionEvents.Click, this.onClick.bind(this))
    this.container.interactionManager.on(GlobalInteractionEvents.KeyDown, this.onKeyDown.bind(this))
    this.container.interactionManager.on(GlobalInteractionEvents.KeyUp, this.onKeyUp.bind(this))
  }

  // #endregion Constructors (1)

  // #region Public Methods (5)

  public onClick (event: any): void {
    console.log('click')
    if (this._activeTool != null) {
      this._activeTool.onClick(event)
    }
  }

  public onDoubleClick (event: any): void {
    console.log('dblclick')
    if (this._activeTool != null) {
      this._activeTool.onDoubleClick(event)
    }
  }

  public onKeyDown (event: any): void {
    if (this._activeTool != null) {
      this._activeTool.onKeyDown(event)
    }
  }

  public onKeyUp (event: any): void {
    if (this._activeTool != null) {
      if (event.key === 'Enter' || event.key === 'Escape') {
        this._activeTool = null
      } else {
        this._activeTool.onKeyUp(event)
      }
    }
  }

  public registerTool (key: string, tool: IToolInteraction): void {
    this._tools[key] = tool
  }

  public setActiveTool (key: string): void {
    if (this._activeTool != null) {
      this._activeTool.unInit()
      this._activeTool = null
    }
    if (this._tools[key] != null) {
      this._activeTool = this._tools[key]
      this._activeTool.init()
    } else {
      throw new Error(`Tool with key ${key} not found.`)
    }
  }

  // #endregion Public Methods (5)
}

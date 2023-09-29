import type IToolInteraction from '../base/interfaces/IToolInteraction'
import { InteractionEventNames } from './InteractionManager'
import BaseManager from './base/BaseManager'

export default class ToolManager extends BaseManager {
  // #region Properties (2)

  private _activeTool: IToolInteraction | null
  private readonly _tools: Map<string, IToolInteraction> = new Map<string, IToolInteraction>()
  private _defaultTool: IToolInteraction | null = null

  // #endregion Properties (2)

  // #region Constructors (1)

  constructor () {
    super()
    this.container.interactionManager.on(InteractionEventNames.DoubleClick, this.onDoubleClick.bind(this))
    this.container.interactionManager.on(InteractionEventNames.Click, this.onClick.bind(this))
    this.container.interactionManager.on(InteractionEventNames.KeyDown, this.onKeyDown.bind(this))
    this.container.interactionManager.on(InteractionEventNames.KeyUp, this.onKeyUp.bind(this))
  }

  // #endregion Constructors (1)

  // #region Public Methods (5)

  public onClick (event: any, target: any | null): void {
    console.log('click')
    console.dir(target)
    if (this._activeTool != null) {
      this._activeTool.onClick(event, target)
    }
  }

  public onDoubleClick (event: any, target: any | null): void {
    console.log('dblclick')
    if (this._activeTool != null) {
      this._activeTool.onDoubleClick(event, target)
    }
  }

  public onKeyDown (event: any): void {
    if (this._activeTool != null) {
      this._activeTool.onKeyDown(event)
    }
  }

  public onKeyUp (event: any): void {
    if (this._activeTool !== this._defaultTool) {
      if (event.key === 'Enter' || event.key === 'Escape') {
        this._activeTool = this._defaultTool
      } else {
        this._activeTool?.onKeyUp(event)
      }
    }
  }

  public registerTool (key: string, tool: IToolInteraction, isDefault: boolean = false): void {
    this._tools.set(key, tool)
    if (isDefault) {
      this._defaultTool = tool
    }
    this.setActiveTool(key)
  }

  public setActiveTool (key: string): void {
    if (this._activeTool != null) {
      this._activeTool.unInit()
      this._activeTool = null
    }
    const hasTool = this._tools.has(key)
    const selectedTool = hasTool ? this._tools.get(key) : this._defaultTool
    if (selectedTool != null) {
      this._activeTool = selectedTool
      this._activeTool.init()
    }

    if (!hasTool) {
      throw new Error(`Tool with key ${key} not found.`)
    }
  }

  // #endregion Public Methods (5)
}

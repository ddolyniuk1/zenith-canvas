import type AnimationManager from '../../managers/AnimationManager'
import type InteractionManager from '../../managers/InteractionManager'
import type ToolManager from '../../managers/ToolManager'
import type WorldManager from '../../managers/WorldManager'
import type * as PIXI from 'pixi.js'

export default interface IContainer {
  get animationManager(): AnimationManager
  get interactionManager(): InteractionManager
  get toolManager(): ToolManager
  get worldManager(): WorldManager
  get pixi(): PIXI.Application
}

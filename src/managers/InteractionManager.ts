import * as PIXI from 'pixi.js'
import BaseManager from './base/BaseManager'
import type BaseElement from '../elements/base/BaseElement'

export const Events = {
  DoubleClick: 'doubleclick',
  Click: 'click',
  KeyDown: 'keydown',
  KeyUp: 'keyup'
}

export default class InteractionManager extends BaseManager {
  // #region Properties (6)

  private _dragStartPosition: PIXI.Point
  private _dragTarget: BaseElement | null = null
  private _draggingCanvas: boolean = false
  private _panZoomContainer: PIXI.Container<PIXI.DisplayObject>
  private _scaleFactor: number = 1

  // #endregion Properties (6)

  // #region Constructors (1)

  constructor () {
    super()
    void this.initDefaultInteractionBehavior()
    document.addEventListener(Events.KeyDown, (event: KeyboardEvent) => {
      this.emit(Events.KeyDown, event)
    })

    document.addEventListener(Events.KeyUp, (event: KeyboardEvent) => {
      this.emit(Events.KeyUp, event)
    })
  }

  // #endregion Constructors (1)

  // #region Public Methods (11)

  public canvasDragContinue (event: any): void {
    const panZoomContainer = this._panZoomContainer as any
    if (this._draggingCanvas) {
      const mousePos = event.data.global.clone()
      panZoomContainer.x += mousePos.x - this._dragStartPosition.x
      panZoomContainer.y += mousePos.y - this._dragStartPosition.y
      this._dragStartPosition = mousePos
    }
  }

  public canvasDragStart (event: any): void {
    const evtPos = event.data.global.clone()
    this._dragStartPosition = new PIXI.Point(evtPos.x, evtPos.y)
    this._draggingCanvas = true
  }

  public canvasDragStop (): void {
    this._draggingCanvas = false
  }

  public draggableDragContinue (event: any): void {
    const dragHandlerAny = this._dragTarget?.graphics as any
    this._dragTarget?.onDragMove(event)
    const mousePos = event.data.global
    dragHandlerAny.x += (mousePos.x - this._dragStartPosition.x) / this._scaleFactor
    dragHandlerAny.y += (mousePos.y - this._dragStartPosition.y) / this._scaleFactor
    this._dragStartPosition = new PIXI.Point(mousePos.x, mousePos.y)
  }

  public draggableDragStart (event: any): void {
    this._dragTarget?.onDragStart()
    const mousePos = event.data.global

    this._dragStartPosition = new PIXI.Point(mousePos.x, mousePos.y)
  }

  public draggableDragStop (): void {
    this._dragTarget?.onDragStop()
    this._dragTarget = null
  }

  public async initDefaultInteractionBehavior (): Promise<void> {
    const pixi = this.container.pixi
    const stage: any = this.container.pixi.stage
    stage.hitArea = new PIXI.Rectangle(
      0,
      0,
      pixi.renderer.width,
      pixi.renderer.height
    )
    stage.interactive = true

    this._panZoomContainer = new PIXI.Container();
    (this._panZoomContainer as any).sortableChildren = true
    this.container.worldManager.stage = this._panZoomContainer

    const texture = await PIXI.Assets.load('/images/origin.jpg')
    const imageRectangle = new PIXI.Sprite(texture)
    imageRectangle.transform.pivot.set(0.5, 0.5)
    imageRectangle.zIndex = 0
    this._panZoomContainer.addChild(imageRectangle)
    // Handle dragging to pan the stage
    stage.interactive = true

    let clickCount = 0
    stage.on('pointerdown', (event: any) => {
      clickCount++
      if (clickCount === 1) {
        setTimeout(() => {
          if (clickCount === 1) {
            this.emit(Events.Click, event)
          } else {
            this.emit(Events.DoubleClick, event)
          }
          clickCount = 0
        }, 300)
      }
      if (this._dragTarget != null) {
        this.draggableDragStart(event)
      } else {
        this.canvasDragStart(event)
      }
    })

    stage.on('pointerup', () => {
      if (this._dragTarget != null) {
        this.draggableDragStop()
      } else {
        this.canvasDragStop()
      }
    })

    stage.on('pointerupoutside', () => {
      if (this._dragTarget != null) {
        this.draggableDragStop()
      } else {
        this.canvasDragStop()
      }
    })

    stage.on('pointermove', (event: any) => {
      if (this._dragTarget != null) {
        this.draggableDragContinue(event)
      } else {
        this.canvasDragContinue(event)
      }
    })

    stage.on('wheel', (event: any) => {
      this._scaleFactor *= event.deltaY < 0 ? 1.1 : 0.9
      // Get the mouse position relative to the container
      const mousePos = this._panZoomContainer.toLocal(event.data.global)

      // Scale the container
      this._panZoomContainer.scale.set(this._scaleFactor)

      // Calculate the new mouse position after scaling
      const newPos = this._panZoomContainer.toGlobal(mousePos)

      // Adjust the container position using the difference between the new and old mouse positions
      this._panZoomContainer.x -= newPos.x - event.data.global.x
      this._panZoomContainer.y -= newPos.y - event.data.global.y
    })

    this.zoomToChild(imageRectangle)
  }

  public registerDraggable (dragHandler: BaseElement): (() => void) | null {
    const element: BaseElement | null = dragHandler as unknown as BaseElement ?? null
    if (element != null) {
      console.log(`register draggable ${element.uuid}`);
      (element.graphics as any).interactive = true;
      (element.graphics as any).buttonMode = true
      console.dir(element.graphics)

      const evt: (event: any) => void = (event: any) => {
        if (this._dragTarget != null) return
        console.log(`evt draggable ${element.uuid}`)
        this._dragTarget = dragHandler
      }
      (element.graphics as any).on('pointerdown', evt)
      return () => {
        (element.graphics as any).off('pointerdown', evt)
      }
    }
    return null
  }

  public zoomToChild (child: PIXI.DisplayObject): void {
    const childAny = child as any
    const cW = childAny.width
    const cH = childAny.height
    // Calculate the scale factor to accommodate the child's size versus the actual screen size
    const scaleFactorX = this.container.pixi.renderer.width / cW
    const scaleFactorY = this.container.pixi.renderer.height / cH
    this._scaleFactor = Math.min(scaleFactorX, scaleFactorY)

    // Scale the container to accommodate the child's size
    this._panZoomContainer.scale.set(this._scaleFactor)

    // Get the child's global position
    const childPos = child.toGlobal(new PIXI.Point())

    // Calculate the difference between the child's position and the center of the container
    const diffX = this.container.pixi.renderer.width / 2 - childPos.x - (cW / 2) * this._scaleFactor
    const diffY = this.container.pixi.renderer.height / 2 - childPos.y - (cH / 2) * this._scaleFactor

    // Move the container to center the child
    this._panZoomContainer.x = diffX
    this._panZoomContainer.y = diffY
  }

  // #endregion Public Methods (11)
}

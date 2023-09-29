import * as PIXI from 'pixi.js'
import BaseManager from './base/BaseManager'
import type BaseElement from '../elements/base/BaseElement'
import { ObservableNumber } from '../base/utility/Observable'

export const InteractionEventNames = {
  DoubleClick: 'doubleclick',
  Click: 'click',
  KeyDown: 'keydown',
  KeyUp: 'keyup',
  ObjectClicked: 'objectclicked'
}

export default class InteractionManager extends BaseManager {
  // #region Properties (8)

  private _dragStartPosition: PIXI.Point
  private _dragTarget: BaseElement | null = null
  private _draggingCanvas: boolean = false
  private _initialClickEvent: any
  private _lastClicked: BaseElement | null = null
  private _panZoomContainer: PIXI.Container<PIXI.DisplayObject>
  private _pointerDownTarget: BaseElement | null
  private readonly _scaleFactor: ObservableNumber = new ObservableNumber(1)

  // #endregion Properties (8)

  // #region Constructors (1)

  constructor () {
    super()
    void this.initDefaultInteractionBehavior()
    document.addEventListener(InteractionEventNames.KeyDown, (event: KeyboardEvent) => {
      this.emit(InteractionEventNames.KeyDown, event)
    })

    document.addEventListener(InteractionEventNames.KeyUp, (event: KeyboardEvent) => {
      this.emit(InteractionEventNames.KeyUp, event)
    })
  }

  // #endregion Constructors (1)

  // #region Public Accessors (4)

  public get lastClicked (): BaseElement | null {
    return this._lastClicked
  }

  public set lastClicked (value: BaseElement | null) {
    this._lastClicked = value
  }

  public get scaleFactor (): ObservableNumber {
    return this._scaleFactor
  }

  // #endregion Public Accessors (4)

  // #region Public Methods (9)

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
    dragHandlerAny.x += (mousePos.x - this._dragStartPosition.x) / this.scaleFactor.value
    dragHandlerAny.y += (mousePos.y - this._dragStartPosition.y) / this.scaleFactor.value
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

    let doubleClickTimeout: any | null = null
    let clickCount = 0
    const completedCallback = (): void => {
      if (clickCount === 1) {
        this.emit(InteractionEventNames.Click, this._initialClickEvent, this.lastClicked)
      } else {
        this.emit(InteractionEventNames.DoubleClick, this._initialClickEvent, this.lastClicked)
      }
      clickCount = 0
      this.lastClicked = null
    }
    stage.on('pointerdown', (event: any) => {
      clickCount++
      if (clickCount === 1) {
        this._initialClickEvent = event
        doubleClickTimeout = setTimeout(completedCallback, 300)
      } else {
        if (doubleClickTimeout != null) {
          clearTimeout(doubleClickTimeout)
          completedCallback()
        }
      }
      if (this._dragTarget != null) {
        this.draggableDragStart(event)
      } else {
        this.canvasDragStart(event)
      }
    })

    stage.on('pointerup', () => {
      console.log('pointer up null')
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
      this.scaleFactor.value *= event.deltaY < 0 ? 1.1 : 0.9
      // Get the mouse position relative to the container
      const mousePos = this._panZoomContainer.toLocal(event.data.global)

      // Scale the container
      this._panZoomContainer.scale.set(this.scaleFactor.value)

      // Calculate the new mouse position after scaling
      const newPos = this._panZoomContainer.toGlobal(mousePos)

      // Adjust the container position using the difference between the new and old mouse positions
      this._panZoomContainer.x -= newPos.x - event.data.global.x
      this._panZoomContainer.y -= newPos.y - event.data.global.y
    })

    this.zoomToChild(imageRectangle)
  }

  public registerInteractions (interactive: BaseElement): (() => void) | null {
    const element: BaseElement | null = interactive as unknown as BaseElement ?? null
    if (element != null) {
      const g = element.graphics as any
      g.interactive = true
      g.buttonMode = true

      const pointerDownHandler: (event: any) => void = (event: any) => {
        if (this._pointerDownTarget == null) {
          this._pointerDownTarget = element
        }
        if (this._dragTarget != null) return
        this._dragTarget = interactive
      }

      const pointerUpHandler: (event: any) => void = (event: any) => {
        if (this._pointerDownTarget === element) {
          this.lastClicked = element
          this._pointerDownTarget = null
          this.emit(InteractionEventNames.ObjectClicked, element)
        }
      }
      g.on('pointerdown', pointerDownHandler)
      g.on('pointerup', pointerUpHandler)
      return () => {
        g.off('pointerdown', pointerDownHandler)
        g.off('pointerup', pointerUpHandler)
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
    this.scaleFactor.value = Math.min(scaleFactorX, scaleFactorY)

    // Scale the container to accommodate the child's size
    this._panZoomContainer.scale.set(this.scaleFactor.value)

    // Get the child's global position
    const childPos = child.toGlobal(new PIXI.Point())

    // Calculate the difference between the child's position and the center of the container
    const diffX = this.container.pixi.renderer.width / 2 - childPos.x - (cW / 2) * this.scaleFactor.value
    const diffY = this.container.pixi.renderer.height / 2 - childPos.y - (cH / 2) * this.scaleFactor.value

    // Move the container to center the child
    this._panZoomContainer.x = diffX
    this._panZoomContainer.y = diffY
  }

  // #endregion Public Methods (9)
}

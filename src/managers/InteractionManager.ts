import ZenithApp from "../ZenithApp";
import * as PIXI from "pixi.js"; 
import IDragHandler from "../base/interfaces/IDragHandler";
import EventSystem from "../utilities/EventSystem";

export const Events = {
  DoubleClick: "doubleclick",
  Click: "click"
};

export default class InteractionManager {
  panZoomContainer: PIXI.Container<PIXI.DisplayObject>;
  dragStartPosition: PIXI.Point;
    scaleFactor: number = 1;
    dragTarget : IDragHandler | null = null;

  private eventSystem : EventSystem = new EventSystem();
 
  on(evt : string, listener: Function) {
    this.eventSystem.subscribe(evt, listener);
  }

  off(evt : string, listener : Function) {
    this.eventSystem.unsubscribe(evt, listener);
  }

  constructor(private _app: ZenithApp) {
    this.initDefaultInteractionBehavior();
  }
  
  async initDefaultInteractionBehavior() {
    const pixi = this._app.pixi;
    const stage: any = this._app.pixi.stage; 
    stage.hitArea = new PIXI.Rectangle(
      0,
      0,
      pixi.renderer.width,
      pixi.renderer.height
    );
    stage.interactive = true;

    this.panZoomContainer = new PIXI.Container();
    (this.panZoomContainer as any).sortableChildren = true;
    pixi.stage.addChild(this.panZoomContainer);
 
    const texture = await PIXI.Assets.load("/images/origin.jpg"); 
    const imageRectangle = new PIXI.Sprite(texture);
    imageRectangle.transform.pivot.set(0.5, 0.5);
    imageRectangle.zIndex = 0;
    this.panZoomContainer.addChild(imageRectangle);

    const panZoomContainer: any = this.panZoomContainer;
    // Handle dragging to pan the stage
    stage.interactive = true;
      
    let clickCount = 0;
    stage.on("pointerdown", (event: any) => { 
      clickCount++;
      if(clickCount === 1) {
        setTimeout(() => {
          if(clickCount === 1) { 
            this.eventSystem.emit(Events.Click, event);
          } else {
            this.eventSystem.emit(Events.DoubleClick, event);
          }
          clickCount = 0;
        }, 300);
      }
      if(this.dragTarget) {
        this.draggableDragStart(event);
      } else {
        this.canvasDragStart(event);
      } 
    });

    stage.on("pointerup", () => {
      if(this.dragTarget) {
        this.draggableDragStop();
      } else {
        this.canvasDragStop();
      }
    });

    
    stage.on("pointerupoutside", () => {
      if(this.dragTarget) {
        this.draggableDragStop();
      } else {
        this.canvasDragStop();
      }
    });

    stage.on("pointermove", (event: any) => {
      if(this.dragTarget) {
        this.draggableDragContinue(event);
      } else { 
        this.canvasDragContinue(event);
      } 
    }); 

    stage.on("wheel", (event: any) => { 
      this.scaleFactor *= event.deltaY < 0 ? 1.1 : 0.9;
      // Get the mouse position relative to the container
      const mousePos = this.panZoomContainer.toLocal(event.data.global);

      // Scale the container
      this.panZoomContainer.scale.set(this.scaleFactor);

      // Calculate the new mouse position after scaling
      const newPos = this.panZoomContainer.toGlobal(mousePos);

      // Adjust the container position using the difference between the new and old mouse positions
      this.panZoomContainer.x -= newPos.x - event.data.global.x;
      this.panZoomContainer.y -= newPos.y - event.data.global.y;
    });

    this.zoomToChild(imageRectangle); 
  }

  canvasDragStart(event: any) {
    const evtPos = event.data.global.clone();
    this.dragStartPosition = new PIXI.Point(evtPos.x, evtPos.y);
    (this.panZoomContainer as any).dragging = true;
  }
  
  canvasDragStop() {
    (this.panZoomContainer as any).dragging = false;
  }
  
  canvasDragContinue(event : any) {
    const panZoomContainer = this.panZoomContainer as any;
    if (panZoomContainer.dragging) {
      let mousePos = event.data.global.clone();
      panZoomContainer.x += mousePos.x - this.dragStartPosition.x;
      panZoomContainer.y += mousePos.y - this.dragStartPosition.y; 
      this.dragStartPosition = mousePos;
    }
  }

  registerDraggable(dragHandler: IDragHandler) {
    const dragHandlerAny : any = dragHandler as any;
    if (dragHandler instanceof PIXI.Graphics) {
      dragHandlerAny.interactive = true;
      dragHandlerAny.buttonMode = true;

      dragHandlerAny.on('pointerdown', (event: any) => {
        if(this.dragTarget) return;
        this.dragTarget = dragHandler; 
      });  
    }
  }

  draggableDragStart(event : any) { 
    const dragHandlerAny = this.dragTarget as any;
    dragHandlerAny.onDragStart();
    const globalPos = dragHandlerAny.toGlobal(new PIXI.Point());
    const mousePos = event.data.global;

    this.dragStartPosition = new PIXI.Point(mousePos.x, mousePos.y);
  }
  
  draggableDragStop() {
    const dragHandlerAny = this.dragTarget as any;
    dragHandlerAny.onDragStop();
    this.dragTarget = null;
  }

  draggableDragContinue(event : any) {
    const dragHandlerAny = this.dragTarget as any;
      dragHandlerAny.onDragMove(event);
      const mousePos = event.data.global;
      dragHandlerAny.x += (mousePos.x - this.dragStartPosition.x) / this.scaleFactor;
      dragHandlerAny.y += (mousePos.y - this.dragStartPosition.y) / this.scaleFactor;
      this.dragStartPosition = new PIXI.Point(mousePos.x, mousePos.y);
  }

  zoomToChild(child: PIXI.DisplayObject) { 
    const childAny = child as any;
    const cW = childAny.width;
    const cH = childAny.height;
    // Calculate the scale factor to accommodate the child's size versus the actual screen size
    const scaleFactorX = this._app.pixi.renderer.width / cW;
    const scaleFactorY = this._app.pixi.renderer.height / cH; 
    this.scaleFactor = Math.min(scaleFactorX, scaleFactorY); 

    // Scale the container to accommodate the child's size
    this.panZoomContainer.scale.set(this.scaleFactor);

     // Get the child's global position
     const childPos = child.toGlobal(new PIXI.Point());

     // Calculate the difference between the child's position and the center of the container
     const diffX = this._app.pixi.renderer.width / 2 - childPos.x - (cW / 2) * this.scaleFactor;
     const diffY = this._app.pixi.renderer.height / 2 - childPos.y - (cH / 2) * this.scaleFactor;
 
     // Move the container to center the child
     this.panZoomContainer.x = diffX;
     this.panZoomContainer.y = diffY;
  }
}

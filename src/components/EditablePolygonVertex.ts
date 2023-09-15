
import * as PIXI from 'pixi.js';
import { EditablePolygon } from './EditablePolygon';
import IDragHandler from '../base/interfaces/IDragHandler';
import ZenithApp from '../ZenithApp';

export default class EditablePolygonVertex extends PIXI.Graphics implements IDragHandler {
    private _owner: EditablePolygon;
    public get owner(): EditablePolygon {
        return this._owner;
    }
    public set owner(value: EditablePolygon) {
        this._owner = value;
    }
    
    constructor(position: PIXI.Point, owner: EditablePolygon | null = null) {
        super();
        this._owner = owner;
        this.position.x = position.x;
        this.position.y = position.y;
        this.lineStyle(2, 0xFF0000); // Red stroke
        this.beginFill(0xFFD700); // Gold fill color
        this.drawEllipse(0, 0, 25, 25); // Draw an ellipse
        this.endFill();
        ZenithApp.getInstance().interactionManager.registerDraggable(this);
    }
    onDragStart(): void {
    }
    onDragStop(): void {
    }
    onDragMove(event: any): void {
        if(this._owner) { 
            this._owner.redraw();
        }
    }
}




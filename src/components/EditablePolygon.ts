import * as PIXI from "pixi.js";
import EditablePolygonVertex from "./EditablePolygonVertex";
import ZenithApp from "../ZenithApp";
import IDragHandler from "../base/interfaces/IDragHandler";

export class EditablePolygon extends PIXI.Graphics implements IDragHandler {
    private _points: PIXI.IPoint[]; 
    private _vertexes: EditablePolygonVertex[] = [];

    constructor() {
        super(); 
        ZenithApp.getInstance().interactionManager.registerDraggable(this);
    }
    onDragStart(): void {
    }
    onDragStop(): void {
    }
    onDragMove(event: any): void {
    }
    addVertex(x, y) {
        let point = new PIXI.Point(x, y);
        let vertex = new EditablePolygonVertex(point, this);
        this.addChild(vertex);
        this._vertexes.push(vertex);
        this._points = this._vertexes.flatMap(t => t.position);
        this.redraw(); 
    }
    public redraw(): void {
        this.clear();
        this.beginFill(0x5d0015);
 
        this.drawPolygon(
            this._points
        ); 
        this.endFill(); 
    }
 
}

import * as PIXI from "pixi.js";
import EditablePolygonVertex from "./EditablePolygonVertex";
import ZenithApp from "../ZenithApp";
import IDragHandler from "../base/interfaces/IDragHandler";

export class EditablePolygon extends PIXI.Graphics implements IDragHandler {
    private _points: number[];
    private _polygon: PIXI.Polygon;
    private _vertexes: EditablePolygonVertex[] = [];

    constructor() {
        super();
        var path = [600, 370, 700, 460, 780, 420, 730, 570, 590, 520];
        for (let index = 0; index < path.length; index += 2) {
            const elementX = path[index];
            const elementY = path[index + 1];
            let point = new PIXI.Point(elementX, elementY);
            let vertex = new EditablePolygonVertex(this, point);
            this.addChild(vertex);
            this._vertexes.push(vertex);
        }
        this.redraw();
        ZenithApp.getInstance().interactionManager.registerDraggable(this);
    }
    onDragStart(): void {
    }
    onDragStop(): void {
    }
    onDragMove(event: any): void {
    }

    public redraw(): void {
        this.clear();
        this.beginFill(0x5d0015);

        let path = [];
        this._vertexes.forEach(element => {
            path.push(element.position.x)
            path.push(element.position.y)
        });

        this.drawPolygon(
            path
        );
        this.endFill();

       
    }

    public set points(points: number[]) {
        this._points = points;
        this.drawPolygon();
    }

    public get points(): number[] {
        return this._points;
    }
}

import ZenithApp from "../ZenithApp";
import IToolInteraction from "../base/interfaces/IToolInteraction";

export default class ToolManager implements IToolInteraction {
    OnDoubleClick(event: any) {
        if(this._activeTool) {
            this._activeTool.OnDoubleClick(event);
        }
    }
    OnClick(event: any) {
        if(this._activeTool) {
            this._activeTool.OnClick(event);
        }
    }
    OnKeyPress(event: any) {
        if(this._activeTool) {
            this._activeTool.OnKeyPress(event);
        }
    }

    private _activeTool : IToolInteraction | null;

    private _tools: { [key: string]: IToolInteraction } = {};

    registerTool(key: string, tool: IToolInteraction): void {
        this._tools[key] = tool;
    }

    setActiveTool(key: string): void {
        if (this._tools[key]) {
            this._activeTool = this._tools[key];
        } else {
            console.error(`Tool with key ${key} not found.`);
        }
    }
    
    constructor(app : ZenithApp) {
        const stage = app.pixi.stage as any;
        stage.on("dblclick", this.OnDoubleClick.bind(this));
        stage.on("click", this.OnClick.bind(this));
        stage.on("keyup", this.OnKeyPress.bind(this));
        
    }
}
import ZenithApp from "../ZenithApp";
import IToolInteraction from "../base/interfaces/IToolInteraction";
import { Events as GlobalInteractionEvents } from "./InteractionManager";

export default class ToolManager {
    onDoubleClick(event: any) {
        if (this._activeTool) {
            this._activeTool.onDoubleClick(event);
        }
    }
    onClick(event: any) {
        if (this._activeTool) {
            this._activeTool.onClick(event);
        }
    }
    onKeyPress(event: any) {
        if (this._activeTool) {
            this._activeTool.onKeyPress(event);
        }
    }

    private _activeTool: IToolInteraction | null;

    private _tools: { [key: string]: IToolInteraction } = {};

    registerTool(key: string, tool: IToolInteraction): void {
        this._tools[key] = tool;
    }

    setActiveTool(key: string): void {
        if (this._activeTool) {
            this._activeTool.uninit();
            this._activeTool = null;
        }
        if (this._tools[key]) {
            this._activeTool = this._tools[key];
            this._activeTool.init();
        } else {
            console.error(`Tool with key ${key} not found.`);
        }
    }

    constructor(app: ZenithApp) {
        const stage = app.pixi.stage as any;
        app.interactionManager.on(GlobalInteractionEvents.DoubleClick, this.onDoubleClick.bind(this));
        app.interactionManager.on(GlobalInteractionEvents.Click, this.onClick.bind(this)); 
    }
}
import ZenithApp from "../ZenithApp";
import IToolInteraction from "../base/interfaces/IToolInteraction";
import { EditablePolygon } from "../components/EditablePolygon";

export default class PolygonTool implements IToolInteraction {
    private _activePoly: EditablePolygon;
    init() {
        this._activePoly = new EditablePolygon();
        let cont = ZenithApp.getInstance().interactionManager.panZoomContainer;
        ZenithApp.getInstance().interactionManager.panZoomContainer.addChild(this._activePoly);
        this._activePoly.zIndex = 999; 
    }
    uninit() { 
    }
    onDoubleClick(event: any) {  
        let localPos = this._activePoly.toLocal(event.data.global); 
        
        this._activePoly.addVertex(localPos.x, localPos.y)
        console.dir(ZenithApp.getInstance().interactionManager.panZoomContainer);
    }
    onClick(event: any) { 
    }
    onKeyPress(event: any) { 
    }

}
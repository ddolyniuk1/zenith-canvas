import ZenithApp from "./ZenithApp"; 
import * as PIXI from "pixi.js"
import ColorUtil from "./utilities/ColorUtil";
 
document.addEventListener('DOMContentLoaded', () => {  
    let containerElement = document.getElementById('pixi-container');  
    let app = new PIXI.Application({
        resizeTo: containerElement,
        background: ColorUtil.convert('#312e2e'), backgroundAlpha: 1, antialias: true});
  
    containerElement.appendChild(app.view as any);  

    (window as any).zenithApp = new ZenithApp(app);
});


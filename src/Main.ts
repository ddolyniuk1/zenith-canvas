import ZenithApp from "./ZenithApp"; 
import * as PIXI from "pixi.js"
import ColorUtil from "./utilities/ColorUtil";
 
document.addEventListener('DOMContentLoaded', () => {  
    let containerElement = document.getElementById('pixi-container');  
    let app = new PIXI.Application({ background: ColorUtil.convert('#312e2e'), backgroundAlpha: 1, width: document.documentElement.clientWidth, height: document.documentElement.clientHeight, antialias: true, resizeTo: containerElement});
    let resizeCanvas = () => { 
        app.renderer.resize(document.documentElement.clientWidth, document.documentElement.clientHeight);
    };
  
    containerElement.appendChild(app.view as any);
    //resizeCanvas();
    //window.addEventListener('resize', resizeCanvas); 
});


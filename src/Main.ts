import ZenithApp from './ZenithApp'
import * as PIXI from 'pixi.js'
import { convert } from './utilities/ColorUtil'

document.addEventListener('DOMContentLoaded', () => {
  const containerElement: HTMLElement | undefined = document.getElementById('pixi-container') ?? undefined
  const app = new PIXI.Application({
    resizeTo: containerElement,
    background: convert('#312e2e'),
    backgroundAlpha: 1,
    antialias: true
  })

  if (containerElement !== undefined && containerElement != null) {
    containerElement.appendChild(app.view as any)
  }

  (window as any).zenithApp = new ZenithApp(app)
})

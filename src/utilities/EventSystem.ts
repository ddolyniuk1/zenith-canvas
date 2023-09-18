export default class EventSystem {
  private readonly _listeners: Map<string, Array<((...args: any[]) => void)>> = new Map<string, Array<((...args: any[]) => void)>>()

  subscribe (event: string, listener: (...args: any[]) => void): void {
    if (!this._listeners.has(event)) {
      this._listeners.set(event, new Array<((...args: any[]) => void)>())
    }
    this._listeners.get(event)?.push(listener)
  }

  unsubscribe (event: string, listener: (...args: any[]) => void): void {
    if (!this._listeners.has(event)) return
    const index = this._listeners.get(event)?.indexOf(listener)
    if (index != null && index > -1) {
      this._listeners.get(event)?.splice(index, 1)
    }
  }

  emit (event: string, ...args: any[]): void {
    if (!this._listeners.has(event)) return
    this._listeners.get(event)?.forEach((listener) => { listener(...args) })
  }
}

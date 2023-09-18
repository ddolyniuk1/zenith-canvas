import EventSystem from '../../utilities/EventSystem'

export default function EventEmitterMixin (Base: any): new (...args: any[]) => any {
  return class extends Base {
    private readonly _eventSystem: EventSystem = new EventSystem()
    public off (evt: string, listener: (...args: any[]) => void): void {
      this._eventSystem.unsubscribe(evt, listener)
    }

    public on (evt: string, listener: (...args: any[]) => void): () => void {
      this._eventSystem.subscribe(evt, listener)
      return () => { this._eventSystem.unsubscribe(evt, listener) }
    }

    public emit (evt: string, ...args: any[]): void {
      this._eventSystem.emit(evt, args)
    }
  }
}

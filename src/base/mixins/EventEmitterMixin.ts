import EventSystem from '../../utilities/EventSystem'

export default class implements IEventEmitter {
  private readonly _eventSystem: EventSystem = new EventSystem()
  public off (evt: string, listener: (...args: any[]) => void): void {
    this._eventSystem.unsubscribe(evt, listener)
  }

  public on (evt: string, listener: (...args: any[]) => void): () => void {
    this._eventSystem.subscribe(evt, listener)
    return () => { this._eventSystem.unsubscribe(evt, listener) }
  }

  public emit (evt: string, ...args: any[]): void {
    this._eventSystem.emit(evt, ...args)
  }
}

export interface IEventEmitter {
  off: (evt: string, listener: (...args: any[]) => void) => void
  on: (evt: string, listener: (...args: any[]) => void) => void
  emit: (evt: string, ...args: any[]) => void
}

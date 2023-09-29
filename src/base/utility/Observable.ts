export class Observable<T> {
  // #region Properties (2)

  private readonly _subscribers: Array<(oldValue: T, newValue: T) => void> = []

  private _value: T

  // #endregion Properties (2)

  // #region Constructors (1)

  constructor (initialValue: T) {
    this._value = initialValue
  }

  // #endregion Constructors (1)

  // #region Public Accessors (2)

  public get value (): T {
    return this._value
  }

  public set value (newValue: T) {
    if (this.equals(newValue)) return
    const oldValue = this._value
    this._value = newValue
    this._subscribers.forEach((subscriber) => { subscriber(oldValue, newValue) })
  }

  // #endregion Public Accessors (2)

  // #region Public Methods (3)

  public equals (otherValue: T): boolean {
    return this._value === otherValue
  }

  public subscribe (subscriber: (oldValue: T, newValue: T) => void): () => void {
    this._subscribers.push(subscriber)
    return function () { this.unsubscribe(subscriber) }.bind(this)
  }

  public unsubscribe (subscriber: (oldValue: T, newValue: T) => void): void {
    const subscriberIndex = this._subscribers.indexOf(subscriber)
    if (subscriberIndex !== -1) {
      this._subscribers.splice(subscriberIndex, 1)
    } else {
      console.warn('Trying to unsubscribe a non-subscribed subscriber.')
    }
  }

  // #endregion Public Methods (3)
}

export class ObservableNumber extends Observable<number> {
  // #region Public Methods (1)

  public override equals (otherValue: number): boolean {
    return Math.abs(this.value - otherValue) < Number.EPSILON
  }

  // #endregion Public Methods (1)
}

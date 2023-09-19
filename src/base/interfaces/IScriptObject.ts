export default interface IScriptObject {
  onAwake: () => void
  onStart: () => void
  onUpdate: (delta: number) => void
  onDestroyed: () => void
}

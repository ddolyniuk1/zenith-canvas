export default interface IScriptObject {
  onAwake: () => void
  onStart: () => void
  onUpdate: () => void
  onDestroyed: () => void
}

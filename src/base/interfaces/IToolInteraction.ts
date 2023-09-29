export default interface IToolInteraction {
  onDoubleClick: (event: any, target: any | null) => void
  onClick: (event: any, target: any | null) => void
  onKeyDown: (event: any) => void
  onKeyUp: (event: any) => void
  init: () => void
  unInit: () => void
}

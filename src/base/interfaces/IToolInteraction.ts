export default interface IToolInteraction {
  onDoubleClick: (event: any) => void
  onClick: (event: any) => void
  onKeyDown: (event: any) => void
  onKeyUp: (event: any) => void
  init: () => void
  unInit: () => void
}

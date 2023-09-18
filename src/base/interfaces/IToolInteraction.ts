export default interface IToolInteraction {
  onDoubleClick: (event: any) => void
  onClick: (event: any) => void
  onKeyPress: (event: any) => void
  init: () => void
  unInit: () => void
}

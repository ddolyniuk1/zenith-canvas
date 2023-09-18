export default interface IDraggable {
  onDragStart: () => void
  onDragStop: () => void
  onDragMove: (event: any) => void
}

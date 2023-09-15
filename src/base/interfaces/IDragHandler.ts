export default interface IDragHandler {
    onDragStart() : void;
    onDragStop() : void;
    onDragMove(event : any) : void; 
}
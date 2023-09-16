export default interface IToolInteraction {
    onDoubleClick(event : any);
    onClick(event : any);
    onKeyPress(event : any);
    init();
    uninit();
} 
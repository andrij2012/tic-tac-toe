var xBoard = 0;
var oBoard = 0;
var context;
var width, height;


function paintBoard() {
    var board = document.getElementById('canvas');

    width   = board.width;
    height  = board.height;
    context = board.getContext('2d');

    /**
     * Draw the board
     */
    context.beginPath();
    context.strokeStyle = "#000";
    context.lineWidth = 3;

    context.moveTo((width / 3), 0);
    context.lineTo((width / 3), height);

    context.moveTo((width / 3) * 2, 0);
    context.lineTo((width / 3) * 2, height);

    context.moveTo(0, (height / 3));
    context.lineTo(width, (height / 3));

    context.moveTo(0, 2 * (height / 3));
    context.lineTo(width, 2 * (height / 3));

    context.stroke();
    context.closePath();
}
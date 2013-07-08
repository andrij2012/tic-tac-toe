var context;
var clickedRaw = new Array();
var width, height; // width and height of Board

/**
 * Paint the Board for the game
 */
function paintBoard() {
    var board = document.getElementById('canvas');

    width   = board.width;
    height  = board.height;
    context = board.getContext('2d');

    // Paint the board
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

/**
 *  Paint the X
 *  @param float
 *  @param float
 */
function paintX(x, y) {
    var pair = x + " " + y;

    if (in_array(pair, clickedRaw)) {
        return false;
    } else {
        context.beginPath();
        context.strokeStyle = '#FF0000';

        var offsetX = (width / 3) * 0.1;
        var offsetY = (height / 3) * 0.1;

        var beginX = x * (width / 3) + offsetX;
        var beginY = y * (height / 3) + offsetY;

        var endX = (x + 1) * (width / 3) - offsetX * 2;
        var endY = (y + 1) * (height / 3) - offsetY * 2;

        context.moveTo(beginX, beginY);
        context.lineTo(endX, endY);

        context.moveTo(beginX, endY);
        context.lineTo(endX, beginY);

        context.stroke();
        context.closePath();

        clickedRaw[clickedRaw.length] = pair;

        return true;
    }

}

/**
 * Paint the O
 * @param float
 * @param float
 */
function paintO(x, y) {
    var pair = x + " " + y;

    if (in_array(pair, clickedRaw)) {
        return false;
    } else {
        context.beginPath();
        context.strokeStyle = '#0000FF';

        var offsetX = (width / 3) * 0.1;
        var offsetY = (height / 3) * 0.1;

        var beginX = x * (width / 3) + offsetX;
        var beginY = y * (height / 3) + offsetY;

        var endX = (x + 1) * (width / 3) - offsetX * 2;
        var endY = (y + 1) * (height / 3) - offsetY * 2;

        context.arc(beginX + ((endX - beginX) / 2), beginY + ((endY - beginY) / 2), (endX - beginX) / 2, 0, Math.PI * 2);

        context.stroke();
        context.closePath();
        clickedRaw[clickedRaw.length] = pair;

        return true;
    }
}

/**
 * Player move on the Board
 * @param event
 */
function movePlayer(e) {
    var x = Math.floor(e.clientX / (width / 3));
    var y = Math.floor(e.clientY / (height / 3));

    if (paintX(x, y)){
        moveComputer();
    }

}

/**
 * Computer move on the Board
 */
function moveComputer() {
    var x = Math.floor(Math.random() * 3);
    var y = Math.floor(Math.random() * 3);

    if (!paintO(x, y)) {
        moveComputer();
    }
}

/**
 * Is a value in array?
 * @param mixed
 * @param array
 * @return boolean
 */
function in_array(value, array) {
    for(var i = 0; i < array.length; i++) {
        console.log(array[i]);
        if(array[i] == value)
            return true;
    }
    return false;
}
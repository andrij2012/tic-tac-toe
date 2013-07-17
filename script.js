(function() {

    window.onload = function() {
        document.getElementById('start').onclick  = paintBoard;
        document.getElementById('canvas').onclick = movePlayer;
    };

    var numOfCell;
    var beginPlayer = true;
    var context;
    var xBoard = [];
    var oBoard = [];
    var width, height; // width and height of Board
    var winCombinations =  [['0 0', '1 0', '2 0', '3 0', '4 0', '5 0', '6 0', '7 0', '8 0'],
                            ['0 1', '1 1', '2 1', '3 1', '4 1', '5 1', '6 1', '7 1', '8 1'],
                            ['0 2', '1 2', '2 2', '3 2', '4 2', '5 2', '6 2', '7 2', '8 2'],
                            ['0 3', '1 3', '2 3', '3 3', '4 3', '5 3', '6 3', '7 3', '8 3'],
                            ['0 4', '1 4', '2 4', '3 4', '4 4', '5 4', '6 4', '7 4', '8 4'],
                            ['0 5', '1 5', '2 5', '3 5', '4 5', '5 5', '6 5', '7 5', '8 5'],
                            ['0 6', '1 6', '2 6', '3 6', '4 6', '5 6', '6 6', '7 6', '8 6'],
                            ['0 7', '1 7', '2 7', '3 7', '4 7', '5 7', '6 7', '7 7', '8 7'],
                            ['0 8', '1 8', '2 8', '3 8', '4 8', '5 8', '6 8', '7 8', '8 8'],

                            ['0 0', '0 1', '0 2', '0 3', '0 4', '0 5', '0 6', '0 7', '0 8'],
                            ['1 0', '1 1', '1 2', '1 3', '1 4', '1 5', '1 6', '1 7', '1 8'],
                            ['2 0', '2 1', '2 2', '2 3', '2 4', '2 5', '2 6', '2 7', '2 8'],
                            ['3 0', '3 1', '3 2', '3 3', '3 4', '3 5', '3 6', '3 7', '3 8'],
                            ['4 0', '4 1', '4 2', '4 3', '4 4', '4 5', '4 6', '4 7', '4 8'],
                            ['5 0', '5 1', '5 2', '5 3', '5 4', '5 5', '5 6', '5 7', '5 8'],
                            ['6 0', '6 1', '6 2', '6 3', '6 4', '6 5', '6 6', '6 7', '6 8'],
                            ['7 0', '7 1', '7 2', '7 3', '7 4', '7 5', '7 6', '7 7', '7 8'],
                            ['8 0', '8 1', '8 2', '8 3', '8 4', '8 5', '8 6', '8 7', '8 8'],

                            ['0 0', '1 1', '2 2', '3 3', '4 4', '5 5', '6 6', '7 7', '8 8'],
                            ['8 0', '7 1', '6 2', '5 3', '4 4', '3 5', '2 6', '1 7', '0 8']]; // winning combinations



    /**
     * Paint the Board for the game
     * |0 0|1 0|2 0|
     * |0 1|1 1|2 1|
     * |0 2|1 2|2 2|
     */
    function  paintBoard() {
        // Get the selected element from select list
        var index = document.getElementById('list').selectedIndex;
        numOfCell = parseInt(document.getElementsByTagName("option")[index].value, 10);

        var board = document.getElementById('canvas');

        // Hide the select list
        document.getElementById('cellNumber').style.display = "none";

        // Display the board
        board.style.display = 'inline';

        // Generate the width and the height of game board
        width   = numOfCell * 100;
        height  = numOfCell * 100;
        
        // Width and height of canvas element
        board.height = height;
        board.width  = width;
        
        context = board.getContext('2d');

        // Paint the board
        context.beginPath();
        context.strokeStyle = "#000";
        context.lineWidth = 3;

        /**
         * Generate the cells number
         */
        for(var i = 1; i < 9; i++) {
            context.moveTo((width / numOfCell) * i, 0);
            context.lineTo((width / numOfCell) * i, height);

            context.moveTo(0, i * (height / numOfCell));
            context.lineTo(width, i * (height / numOfCell));

            context.stroke();
            if(i == (numOfCell -1)) {
                break;
            }

        }
        context.closePath();
        if(beginPlayer) {
            beginPlayer = false;
        } else {
            setTimeout(randomMoveComputer, 400);
            beginPlayer = true;
        }

    }

    /**
     *  Paint the X
     *  @param float
     *  @param float
     */
    function paintX(x, y) {
        var pair = x + " " + y;

        if (xBoard.indexOf(pair) != -1 || oBoard.indexOf(pair) != -1) {
            return false;
        } else {
            context.beginPath();
            context.strokeStyle = '#FF0000';

            /*var offsetX = (width / 3) * 0.1;
            var offsetY = (height / 3) * 0.1;

            var beginX = x * (width / 3) + offsetX;
            var beginY = y * (height / 3) + offsetY;

            var endX = (x + 1) * (width / 3) - offsetX * 2;
            var endY = (y + 1) * (height / 3) - offsetY * 2;
            */
            var offsetX = (width / numOfCell) * 0.1;
            var offsetY = (height / numOfCell) * 0.1;

            var beginX = x * (width / numOfCell) + offsetX;
            var beginY = y * (height / numOfCell) + offsetY;

            var endX = (x + 1) * (width / numOfCell) - offsetX * 2;
            var endY = (y + 1) * (height / numOfCell) - offsetY * 2;

            context.moveTo(beginX, beginY);
            context.lineTo(endX, endY);

            context.moveTo(beginX, endY);
            context.lineTo(endX, beginY);

            context.stroke();
            context.closePath();

            xBoard[xBoard.length] = pair;

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

        if ((xBoard.indexOf(pair) != -1) || (oBoard.indexOf(pair) != -1)) {
            return false;
        } else {
            context.beginPath();
            context.strokeStyle = '#0000FF';

            var offsetX = (width / numOfCell) * 0.1;
            var offsetY = (height / numOfCell) * 0.1;

            var beginX = x * (width / numOfCell) + offsetX;
            var beginY = y * (height / numOfCell) + offsetY;

            var endX = (x + 1) * (width / numOfCell) - offsetX * 2;
            var endY = (y + 1) * (height / numOfCell) - offsetY * 2;

            context.arc(beginX + ((endX - beginX) / 2), beginY + ((endY - beginY) / 2), (endX - beginX) / 2, 0, Math.PI * 2);

            context.stroke();
            context.closePath();
            oBoard[oBoard.length] = pair;

            return true;
        }
    }

    /**
     * Player move on the Board
     * @param event
     */
    function movePlayer(e) {
        var x = Math.floor(e.clientX / (width / numOfCell));
        var y = Math.floor(e.clientY / (height / numOfCell));

        function timeOut() {
            if(oBoard.length == 0) {
                randomMoveComputer();
            } else {
                if (!attackComputer()) {
                    if (!defenseComputer()) {
                        randomMoveComputer();
                    }
                }
            }
        }

        if(paintX(x, y)) {
            if(checkWins()) {
                restart();
            } else setTimeout(timeOut, 400);
        }
    }

    /**
     * Move of computer is random (first move etc.)
     */
    function randomMoveComputer() {
        var x = Math.floor(Math.random() * numOfCell);
        var y = Math.floor(Math.random() * numOfCell);

        if(!paintO(x, y)) {
            randomMoveComputer();
        } else {
            if(checkWins()) {
                restart();
            }
        }
    }

    /**
     * Computer move that purposed for attack
     */
    function attackComputer() {
        for (var i = 0; i < winCombinations.length; i++) {
            ax = parseInt(winCombinations[i][0].charAt(0), 10);
            ay = parseInt(winCombinations[i][0].charAt(2), 10);
            bx = parseInt(winCombinations[i][1].charAt(0), 10);
            by = parseInt(winCombinations[i][1].charAt(2), 10);
            cx = parseInt(winCombinations[i][2].charAt(0), 10);
            cy = parseInt(winCombinations[i][2].charAt(2), 10);

            a = winCombinations[i][0];
            b = winCombinations[i][1];
            c  =winCombinations[i][2];

            if((oBoard.indexOf(a) != -1 && oBoard.indexOf(b) != -1) ||
                (oBoard.indexOf(b) != -1 && oBoard.indexOf(a) != -1)) {
                if(xBoard.indexOf(c) != -1) {
                    continue;
                } else {
                    paintO(cx,cy);
                    if(checkWins()) restart();
                    return true;
                }
            } else if((oBoard.indexOf(a) != -1 && oBoard.indexOf(c) != -1) ||
                (oBoard.indexOf(c) != -1 && oBoard.indexOf(a) != -1)) {
                if(xBoard.indexOf(b) != -1) {
                    continue;
                } else {
                    paintO(bx, by);
                    if(checkWins()) restart();
                    return true;
                }
            } else if ((oBoard.indexOf(b) != -1 && oBoard.indexOf(c) != -1) ||
                (oBoard.indexOf(c) != -1 && oBoard.indexOf(b) != -1)) {
                if(xBoard.indexOf(a) != -1) {
                    continue;
                } else {
                    paintO(ax, ay);
                    if(checkWins()) restart();
                    return true;
                }
            }
        }
        if(checkWins()) {
            restart();
            return true;
        }
    }

    /**
     * Computer move that purposed for defence
     */
    function defenseComputer() {
        for(var i = 0; i < winCombinations.length; i++) {
            ax = parseInt(winCombinations[i][0].charAt(0), 10);
            ay = parseInt(winCombinations[i][0].charAt(2), 10);
            bx = parseInt(winCombinations[i][1].charAt(0), 10);
            by = parseInt(winCombinations[i][1].charAt(2), 10);
            cx = parseInt(winCombinations[i][2].charAt(0), 10);
            cy = parseInt(winCombinations[i][2].charAt(2), 10);

            a = winCombinations[i][0];
            b = winCombinations[i][1];
            c  =winCombinations[i][2];

            if((xBoard.indexOf(a) != -1 && xBoard.indexOf(b) != -1) ||
                (xBoard.indexOf(b) != -1 && xBoard.indexOf(a) != -1)) {
                if(oBoard.indexOf(c) != -1) {
                    continue;
                } else {
                    paintO(cx,cy);
                    if(checkWins()) restart();
                    return true;
                }
            } else if((xBoard.indexOf(a) != -1 && xBoard.indexOf(c) != -1) ||
                (xBoard.indexOf(c) != -1 && xBoard.indexOf(a) != -1)) {
                if(oBoard.indexOf(b) != -1) {
                    continue;
                } else {
                    paintO(bx, by);
                    if(checkWins()) restart();
                    return true;
                }
            } else if((xBoard.indexOf(b) != -1 && xBoard.indexOf(c) != -1) ||
                (xBoard.indexOf(c) != -1 && xBoard.indexOf(b) != -1)) {
                if(oBoard.indexOf(a) != -1) {
                    continue;
                } else {
                    paintO(ax, ay);
                    if(checkWins()) restart();
                    return true;
                }

            }
        }
        if(checkWins()) {
            restart();
            return true;
        }
    }

    /**
     * Check the winner
     * @returns boolean
     */
    function checkWins() {
        for(var i = 0; i < winCombinations.length; i++) {
            a = winCombinations[i][0];
            b = winCombinations[i][1];
            c = winCombinations[i][2];

            if(xBoard.indexOf(a) != -1 && xBoard.indexOf(b) != -1 && xBoard.indexOf(c) != -1) {
                alert("Player win!");
                return true;
            } else if(oBoard.indexOf(a) != -1 && oBoard.indexOf(b) != -1 && oBoard.indexOf(c) != -1) {
                alert("Computer win!");
                return true;
            } else if (xBoard.length == 5 || oBoard.length == 5) {
                alert("Nobody win!");
                return true;
            }
        }
    }

    /**
     * Restart the game
     */
    function restart() {

        // Reset data
        context.clearRect (0, 0, width , height);
        xBoard = [];
        oBoard = [];
        paintBoard();
    }
})();
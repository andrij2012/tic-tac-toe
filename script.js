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

    /**
     * Winning combinations for different game boards
     */

    var winCombinations3x3 = [['0 0', '1 0', '2 0'],
                              ['0 1', '1 1', '2 1'],
                              ['0 2', '1 2', '2 2'],
                              ['0 0', '0 1', '0 2'],
                              ['1 0', '1 1', '1 2'],
                              ['2 0', '2 1', '2 2'],
                              ['0 0', '1 1', '2 2'],
                              ['2 0', '1 1', '0 2']];

    var winCombinations4x4 = [['0 0', '1 0', '2 0', '3 0'],
                              ['0 1', '1 1', '2 1', '3 1'],
                              ['0 2', '1 2', '2 2', '3 2'],
                              ['0 3', '1 3', '2 3', '3 3'],
                              ['0 0', '0 1', '0 2', '0 3'],
                              ['1 0', '1 1', '1 2', '1 3'],
                              ['2 0', '2 1', '2 2', '2 3'],
                              ['3 0', '3 1', '3 2', '3 3'],
                              ['0 0', '1 1', '2 2', '3 3'],
                              ['3 0', '2 1', '1 2', '0 3']];

    var winCombinations5x5 = [['0 0', '1 0', '2 0', '3 0', '4 0'],
                              ['0 1', '1 1', '2 1', '3 1', '4 1'],
                              ['0 2', '1 2', '2 2', '3 2', '4 2'],
                              ['0 3', '1 3', '2 3', '3 3', '4 3'],
                              ['0 4', '1 4', '2 4', '3 4', '4 4'],
                              ['0 0', '0 1', '0 2', '0 3', '0 4'],
                              ['1 0', '1 1', '1 2', '1 3', '1 4'],
                              ['2 0', '2 1', '2 2', '2 3', '2 4'],
                              ['3 0', '3 1', '3 2', '3 3', '3 4'],
                              ['4 0', '4 1', '4 2', '4 3', '4 4'],
                              ['0 0', '1 1', '2 2', '3 3', '4 4'],
                              ['4 0', '3 1', '2 2', '1 3', '0 4']];

    var winCombinations6x6 = [['0 0', '1 0', '2 0', '3 0', '4 0', '5 0'],
                              ['0 1', '1 1', '2 1', '3 1', '4 1', '5 1'],
                              ['0 2', '1 2', '2 2', '3 2', '4 2', '5 2'],
                              ['0 3', '1 3', '2 3', '3 3', '4 3', '5 3'],
                              ['0 4', '1 4', '2 4', '3 4', '4 4', '5 4'],
                              ['0 5', '1 5', '2 5', '3 5', '4 5', '5 5'],
                              ['0 0', '0 1', '0 2', '0 3', '0 4', '0 5'],
                              ['1 0', '1 1', '1 2', '1 3', '1 4', '1 5'],
                              ['2 0', '2 1', '2 2', '2 3', '2 4', '2 5'],
                              ['3 0', '3 1', '3 2', '3 3', '3 4', '3 5'],
                              ['4 0', '4 1', '4 2', '4 3', '4 4', '4 5'],
                              ['5 0', '5 1', '5 2', '5 3', '5 4', '5 5'],
                              ['0 0', '1 1', '2 2', '3 3', '4 4', '5 5'],
                              ['5 0', '4 1', '3 2', '2 3', '1 4', '0 5']];

    var winCombinations7x7 = [['0 0', '1 0', '2 0', '3 0', '4 0', '5 0', '6 0'],
                              ['0 1', '1 1', '2 1', '3 1', '4 1', '5 1', '6 1'],
                              ['0 2', '1 2', '2 2', '3 2', '4 2', '5 2', '6 2'],
                              ['0 3', '1 3', '2 3', '3 3', '4 3', '5 3', '6 3'],
                              ['0 4', '1 4', '2 4', '3 4', '4 4', '5 4', '6 4'],
                              ['0 5', '1 5', '2 5', '3 5', '4 5', '5 5', '6 5'],
                              ['0 6', '1 6', '2 6', '3 6', '4 6', '5 6', '6 6'],
                              ['0 0', '0 1', '0 2', '0 3', '0 4', '0 5', '0 6'],
                              ['1 0', '1 1', '1 2', '1 3', '1 4', '1 5', '1 6'],
                              ['2 0', '2 1', '2 2', '2 3', '2 4', '2 5', '2 6'],
                              ['3 0', '3 1', '3 2', '3 3', '3 4', '3 5', '3 6'],
                              ['4 0', '4 1', '4 2', '4 3', '4 4', '4 5', '4 6'],
                              ['5 0', '5 1', '5 2', '5 3', '5 4', '5 5', '5 6'],
                              ['6 0', '6 1', '6 2', '6 3', '6 4', '6 5', '6 6'],
                              ['0 0', '1 1', '2 2', '3 3', '4 4', '5 5', '6 6'],
                              ['6 0', '5 1', '4 2', '3 3', '2 4', '1 5', '0 6']];

    var winCombinations8x8 = [['0 0', '1 0', '2 0', '3 0', '4 0', '5 0', '6 0', '7 0'],
                              ['0 1', '1 1', '2 1', '3 1', '4 1', '5 1', '6 1', '7 1'],
                              ['0 2', '1 2', '2 2', '3 2', '4 2', '5 2', '6 2', '7 2'],
                              ['0 3', '1 3', '2 3', '3 3', '4 3', '5 3', '6 3', '7 3'],
                              ['0 4', '1 4', '2 4', '3 4', '4 4', '5 4', '6 4', '7 4'],
                              ['0 5', '1 5', '2 5', '3 5', '4 5', '5 5', '6 5', '7 5'],
                              ['0 6', '1 6', '2 6', '3 6', '4 6', '5 6', '6 6', '7 6'],
                              ['0 7', '1 7', '2 7', '3 7', '4 7', '5 7', '6 7', '7 7'],
                              ['0 0', '0 1', '0 2', '0 3', '0 4', '0 5', '0 6', '0 7'],
                              ['1 0', '1 1', '1 2', '1 3', '1 4', '1 5', '1 6', '1 7'],
                              ['2 0', '2 1', '2 2', '2 3', '2 4', '2 5', '2 6', '2 7'],
                              ['3 0', '3 1', '3 2', '3 3', '3 4', '3 5', '3 6', '3 7'],
                              ['4 0', '4 1', '4 2', '4 3', '4 4', '4 5', '4 6', '4 7'],
                              ['5 0', '5 1', '5 2', '5 3', '5 4', '5 5', '5 6', '5 7'],
                              ['6 0', '6 1', '6 2', '6 3', '6 4', '6 5', '6 6', '6 7'],
                              ['7 0', '7 1', '7 2', '7 3', '7 4', '7 5', '7 6', '7 7'],
                              ['0 0', '1 1', '2 2', '3 3', '4 4', '5 5', '6 6', '7 7'],
                              ['7 0', '6 1', '5 2', '4 3', '3 4', '2 5', '1 6', '0 7']];

    var winCombinations9x9 = [['0 0', '1 0', '2 0', '3 0', '4 0', '5 0', '6 0', '7 0', '8 0'],
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
            setTimeout(randomMoveComputer, 500);
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
        if(numOfCell == 3) {
            for (var i = 0; i < winCombinations3x3.length; i++) {
                ax = parseInt(winCombinations3x3[i][0].charAt(0), 10);
                ay = parseInt(winCombinations3x3[i][0].charAt(2), 10);
                a = winCombinations3x3[i][0];

                bx = parseInt(winCombinations3x3[i][1].charAt(0), 10);
                by = parseInt(winCombinations3x3[i][1].charAt(2), 10);
                b = winCombinations3x3[i][1];

                cx = parseInt(winCombinations3x3[i][2].charAt(0), 10);
                cy = parseInt(winCombinations3x3[i][2].charAt(2), 10);
                c = winCombinations3x3[i][2];

            /*  dx = parseInt(winCombinations[i][3].charAt(0), 10);
                dy = parseInt(winCombinations[i][3].charAt(2), 10);

                ex = parseInt(winCombinations[i][4].charAt(0), 10);
                ey = parseInt(winCombinations[i][4].charAt(2), 10);

                fx = parseInt(winCombinations[i][5].charAt(0), 10);
                fy = parseInt(winCombinations[i][5].charAt(2), 10);

                gx = parseInt(winCombinations[i][6].charAt(0), 10);
                gy = parseInt(winCombinations[i][6].charAt(2), 10);

                hx = parseInt(winCombinations[i][7].charAt(0), 10);
                hy = parseInt(winCombinations[i][7].charAt(2), 10);

                ix = parseInt(winCombinations[i][8].charAt(0), 10);
                iy = parseInt(winCombinations[i][8].charAt(2), 10);
    */
                
                
                
      /*        d = winCombinations[i][3];
                e = winCombinations[i][4];
                f = winCombinations[i][5];
                g = winCombinations[i][6];
                h = winCombinations[i][7];
                i = winCombinations[i][8];
    */
                // a,b,c
                
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
        }

            // a,b,c,d
        if(numOfCell == 4) {
            
        }

            // a,b,c,d,e
        if(numOfCell == 5) {
    
        }

            // a,b,c,d,e,f
        if(numOfCell == 6) {
            

        // a,b,c,d,e,f,g
        if(numOfCell == 7) {

        }

        // a,b,c,d,e,f,g,h
        if(numOfCell == 8) {

        }

        // a,b,c,d,e,f,g,h,i
        if(numOfCell == 9) {

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
        if(numOfCell == 3) {
            for(var i = 0; i < winCombinations3x3.length; i++) {
                ax = parseInt(winCombinations3x3[i][0].charAt(0), 10);
                ay = parseInt(winCombinations3x3[i][0].charAt(2), 10);
                
                bx = parseInt(winCombinations3x3[i][1].charAt(0), 10);
                by = parseInt(winCombinations3x3[i][1].charAt(2), 10);
                
                cx = parseInt(winCombinations3x3[i][2].charAt(0), 10);
                cy = parseInt(winCombinations3x3[i][2].charAt(2), 10);

                /*dx = parseInt(winCombinations[i][3].charAt(0), 10);
                dy = parseInt(winCombinations[i][3].charAt(2), 10);

                ex = parseInt(winCombinations[i][4].charAt(0), 10);
                ey = parseInt(winCombinations[i][4].charAt(2), 10);

                fx = parseInt(winCombinations[i][5].charAt(0), 10);
                fy = parseInt(winCombinations[i][5].charAt(2), 10);

                gx = parseInt(winCombinations[i][6].charAt(0), 10);
                gy = parseInt(winCombinations[i][6].charAt(2), 10);

                hx = parseInt(winCombinations[i][7].charAt(0), 10);
                hy = parseInt(winCombinations[i][7].charAt(2), 10);

                ix = parseInt(winCombinations[i][8].charAt(0), 10);
                iy = parseInt(winCombinations[i][8].charAt(2), 10);
                */
                a = winCombinations3x3[i][0];
                b = winCombinations3x3[i][1];
                c = winCombinations3x3[i][2];
                /*d = winCombinations[i][3];
                e = winCombinations[i][4];
                f = winCombinations[i][5];
                g = winCombinations[i][6];
                h = winCombinations[i][7];
                i = winCombinations[i][8];
                */
                // a,b,c
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
        }

        // a,b,c,d
        if(numOfCell == 4) {

        }

        // a,b,c,d,e
        if(numOfCell == 5) {

        }

        // a,b,c,d,e,f
        if(numOfCell == 6) {

        }

        // a,b,c,d,e,f,g
        if(numOfCell == 7) {

        }

        // a,b,c,d,e,f,g,h
        if(numOfCell == 8) {

        }

        // a,b,c,d,e,f,g,h,i
        if(numOfCell == 9) {

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
        if (numOfCell == 3) {
            for(var i = 0; i < winCombinations3x3.length; i++) {
                a = winCombinations3x3[i][0];
                b = winCombinations3x3[i][1];
                c = winCombinations3x3[i][2];
                
                if(xBoard.indexOf(a) != -1 && xBoard.indexOf(b) != -1 && xBoard.indexOf(c) != -1) {
                    alert("Player win!");
                    return true;
                } else if(oBoard.indexOf(a) != -1 && oBoard.indexOf(b) != -1 && oBoard.indexOf(c) != -1) {
                    alert("Computer win!");
                    return true;
                } else if ((xBoard.length == 5) || (oBoard.length == 5)) {
                    alert("Nobody win!");
                    return true;
                }
            }
        }

        if(numOfCell == 4) {
            for(var i = 0; i < winCombinations4x4.length; i++) {
                a = winCombinations4x4[i][0];
                b = winCombinations4x4[i][1];
                c = winCombinations4x4[i][2];
                d = winCombinations4x4[i][3];
    
                if(xBoard.indexOf(a) != -1 && xBoard.indexOf(b) != -1 && xBoard.indexOf(c) != -1 && xBoard.indexOf(d) != -1) {
                    alert("Player win!");
                    return true;
                } else if(oBoard.indexOf(a) != -1 && oBoard.indexOf(b) != -1 && oBoard.indexOf(c) != -1 && oBoard.indexOf(d) != -1) {
                    alert("Computer win!");
                    return true;
                } else if ((xBoard.length == 8) || (oBoard.length == 8)) {
                    alert("Nobody win!");
                    return true;
                }
            }
        }

        // a,b,c,d,e
        if(numOfCell == 5) {
            for(var i = 0; i < winCombinations5x5.length; i++) {
                a = winCombinations5x5[i][0];
                b = winCombinations5x5[i][1];
                c = winCombinations5x5[i][2];
                d = winCombinations5x5[i][3];
                e = winCombinations5x5[i][4];
        
                if(xBoard.indexOf(a) != -1 && xBoard.indexOf(b) != -1 && xBoard.indexOf(c) != -1 && xBoard.indexOf(d) != -1 && xBoard.indexOf(e) != -1) {
                    alert("Player win!");
                    return true;
                } else if(oBoard.indexOf(a) != -1 && oBoard.indexOf(b) != -1 && oBoard.indexOf(c) != -1 && oBoard.indexOf(d) != -1 && oBoard.indexOf(e) != -1) {
                    alert("Computer win!");
                    return true;
                } else if ((xBoard.length == 13) || (oBoard.length == 13)) {
                    alert("Nobody win!");
                    return true;
                }
            }
        }

        // a,b,c,d,e,f
        if(numOfCell == 6) {
            for(var i = 0; i < winCombinations6x6.length; i++) {
                a = winCombinations6x6[i][0];
                b = winCombinations6x6[i][1];
                c = winCombinations6x6[i][2];
                d = winCombinations6x6[i][3];
                e = winCombinations6x6[i][4];
                f = winCombinations6x6[i][5];
                
                if(xBoard.indexOf(a) != -1 && xBoard.indexOf(b) != -1 && xBoard.indexOf(c) != -1 && xBoard.indexOf(d) != -1 && xBoard.indexOf(e) != -1 && xBoard.indexOf(f) != -1) {
                    alert("Player win!");
                    return true;
                } else if(oBoard.indexOf(a) != -1 && oBoard.indexOf(b) != -1 && oBoard.indexOf(c) != -1 && oBoard.indexOf(d) != -1 && oBoard.indexOf(e) != -1 && oBoard.indexOf(f) != -1) {
                    alert("Computer win!");
                    return true;
                } else if ((xBoard.length == 18) || (oBoard.length == 18)) {
                    alert("Nobody win!");
                    return true;
                }
            }
        }

        // a,b,c,d,e,f,g
        if(numOfCell == 7) {
            for(var i = 0; i < winCombinations7x7.length; i++) {
                a = winCombinations7x7[i][0];
                b = winCombinations7x7[i][1];
                c = winCombinations7x7[i][2];
                d = winCombinations7x7[i][3];
                e = winCombinations7x7[i][4];
                f = winCombinations7x7[i][5];
                g = winCombinations7x7[i][6];
                
                if(xBoard.indexOf(a) != -1 && xBoard.indexOf(b) != -1 && xBoard.indexOf(c) != -1 && xBoard.indexOf(d) != -1 && xBoard.indexOf(e) != -1 && xBoard.indexOf(f) != -1 && xBoard.indexOf(g) != -1) {
                    alert("Player win!");
                    return true;
                } else if(oBoard.indexOf(a) != -1 && oBoard.indexOf(b) != -1 && oBoard.indexOf(c) != -1 && oBoard.indexOf(d) != -1 && oBoard.indexOf(e) != -1 && oBoard.indexOf(f) != -1 && oBoard.indexOf(g) != -1) {
                    alert("Computer win!");
                    return true;
                } else if ((xBoard.length == 25) || (oBoard.length == 25)) {
                    alert("Nobody win!");
                    return true;
                }
            }
        }

        // a,b,c,d,e,f,g,h
        if(numOfCell == 8) {
            for(var i = 0; i < winCombinations8x8.length; i++) {
                a = winCombinations8x8[i][0];
                b = winCombinations8x8[i][1];
                c = winCombinations8x8[i][2];
                d = winCombinations8x8[i][3];
                e = winCombinations8x8[i][4];
                f = winCombinations8x8[i][5];
                g = winCombinations8x8[i][6];
                h = winCombinations8x8[i][7];
                
                if(xBoard.indexOf(a) != -1 && xBoard.indexOf(b) != -1 && xBoard.indexOf(c) != -1 && xBoard.indexOf(d) != -1 && xBoard.indexOf(e) != -1 && xBoard.indexOf(f) != -1 && xBoard.indexOf(g) != -1 && xBoard.indexOf(h) != -1) {
                    alert("Player win!");
                    return true;
                } else if(oBoard.indexOf(a) != -1 && oBoard.indexOf(b) != -1 && oBoard.indexOf(c) != -1 && oBoard.indexOf(d) != -1 && oBoard.indexOf(e) != -1 && oBoard.indexOf(f) != -1 && oBoard.indexOf(g) != -1 && oBoard.indexOf(h) != -1) {
                    alert("Computer win!");
                    return true;
                } else if ((xBoard.length == 32) || (oBoard.length == 32)) {
                    alert("Nobody win!");
                    return true;
                }
            }
        }

        // a,b,c,d,e,f,g,h,i
        if(numOfCell == 9) {
            for(var i = 0; i < winCombinations9x9.length; i++) {
                a = winCombinations9x9[i][0];
                b = winCombinations9x9[i][1];
                c = winCombinations9x9[i][2];
                d = winCombinations9x9[i][3];
                e = winCombinations9x9[i][4];
                f = winCombinations9x9[i][5];
                g = winCombinations9x9[i][6];
                h = winCombinations9x9[i][7];
                i = winCombinations9x9[i][8];
                
                if(xBoard.indexOf(a) != -1 && xBoard.indexOf(b) != -1 && xBoard.indexOf(c) != -1 && xBoard.indexOf(d) != -1 && xBoard.indexOf(e) != -1 && xBoard.indexOf(f) != -1 && xBoard.indexOf(g) != -1 && xBoard.indexOf(h) != -1 && xBoard.indexOf(i) != -1) {
                    alert("Player win!");
                    return true;
                } else if(oBoard.indexOf(a) != -1 && oBoard.indexOf(b) != -1 && oBoard.indexOf(c) != -1 && oBoard.indexOf(d) != -1 && oBoard.indexOf(e) != -1 && oBoard.indexOf(f) != -1 && oBoard.indexOf(g) != -1 && oBoard.indexOf(h) != -1 && oBoard.indexOf(i) != -1) {
                    alert("Computer win!");
                    return true;
                } else if ((xBoard.length == 45) || (oBoard.length == 45)) {
                    alert("Nobody win!");
                    return true;
                }
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
/**
 * This is the javascript file, which draws the maze and search a path from the start to the target
 * @author neverchange95
 * @version 1.0
 */

// Getting the canvas from html
var can2 = document.getElementById("canvas2");
var ctx2 = can2.getContext("2d");

// Define the x,y coordinates for start and target node and a running variable so that the user can restart the alg.
var startNodeX2;
var startNodeY2;
var targetNodeX2;
var targetNodeY2;
var running2 = false;

// A array which contains the maze 
// s = start, e = end, 0 = wall, 1 = path
var maze2 = [
    "1111111111111111111111111111111111", //0
    "1000000000000000000000000000000001", //1
    "1010111111111111100111111111110101", //2
    "1010100001000000100001000000010101", //3
    "1011101111111110111001011111010101", //4
    "1000001000000010001001000100010101", //5
    "1011101111111011101001110111011101", //6
    "1011101111111011101001110111011101", //7
    "1010101000001010001001010001000101", //8
    "1010111011111010111001011101110101", //9
    "1010000010000010100000000101000101", //10
    "1010111110101110111111111101011101", //11
    "1010100000101000000000000001010001", //12
    "1010101011101111111111011111010101", //13
    "1010101010100000000001010001010101", //14
    "1010101010111110111111010111011101", //15
    "1010101010100010100000000100000101", //16
    "1010101010101110111111110111110101", //17
    "1000101010101000000000010000010101", //18
    "1011101110101111111001110111110101", //19
    "1010000000100000000001000100010101", //20
    "1010111110111011111101110101110101", //21
    "1010100010001010000100010101000101", //22
    "1011101110111010100111011101110101", //23
    "1010001000101010100001010000010101", //24
    "1010111011101010111101110111010101", //25
    "1010100010100010000100000101000101", //26
    "1010101110111011100111011101111101", //27
    "1000100000101000100101010000000001", //28
    "1000100000101000100101010000000001", //29
    "1011101110101111111101010111110101", //30
    "1010001010000000000000010100010101", //31
    "101111101111111111111101110111111e", //32
    "0000000000s00000000000000000000100", //33
    "0000000000000000000000000000000000"] //34

// Call both functions to draw the grid and after that draw the maze inside the grid.
drawGrid2();
drawMaze2();

/**
 * This function draws the grid into the canvas.
 */
function drawGrid2() {
    ctx2.strokeStyle = "black";

    for(var i = 0.5; i < 34; i++) {
        for(var j = 0.5; j < 35; j++) {
            var x = i * 15;
            var y = j * 15;
            ctx2.beginPath();
            ctx2.rect(x,y,15,15);
            ctx2.fillStyle = "white";
            ctx2.fill();
            ctx2.stroke();
        }
    }
}

/**
 * This function draws the maze into the grid
 */
function drawMaze2() {
    ctx2.strokeStyle = "black";

    for(var i = 0.5; i < 34; i++) {
        for(var j = 0.5; j < 35; j++) {
            if(maze2[j-0.5][i-0.5] === '0') {
                setWall2(i,j);
            } else if(maze2[j-0.5][i-0.5] === 's') {
                startNodeX2 = i;
                startNodeY2 = j;
                setStart2(i,j);
            } else if(maze2[j-0.5][i-0.5] === 'e') {
                targetNodeX2 = i;
                targetNodeY2 = j;
                setTarget2(i,j);
            }
        }
    }
}

/**
 * This function creates a array named visited. In this array will be true stored, if the node is visited.
 * After that the bfs-function is called and is searching for a path.
 */
function bfsHelper() {
    if(!running2) {
        running2 = true;
        ctx2.clearRect(0,0,can2.width,can2.height);
        drawGrid2();
        drawMaze2();
        var visited2 = [];
        for(var i = 0; i < 34; i++) {
            var lengthX2 = [];
            for(var j = 0; j < 35; j++) {
                lengthX2.push(false);
            }
            visited2.push(lengthX2);
        }
        bfsIter(visited2,startNodeX2,startNodeY2); // Start searching
    }
}

/**
 * This is the bfs-function which is searching a path to the target.
 * @param {Array} visited 
 * @param {Number} x 
 * @param {Number} y 
 * @returns nothing
 */
async function bfsIter(visited2,x,y) {
    var queue = []; // Create a queue, to push the successor nodes in it
    var node2 = [x,y];
    queue.push(node2);
    while(queue.length !== 0) {
        node2 = queue.shift(); // Get the first pushed element from the queue
        var x = node2[0]; // Get the x-coordinate
        var y = node2[1]; // Get the y-coordinate
        
        var helpX = node2[0] - 0.5;
        var helpY = node2[1] - 0.5;

        visited2[helpY][helpX] = true; // Set the actual node as visited

        if(x === targetNodeX2 && y === targetNodeY2) {
            // The target is found!
            drawPath2(x,y);
            console.log("Ziel gefunden!");
            running2 = false;
            break;
        }
        
        drawPath2(x,y);
        await sleep2(100); // Sleep 100 millis

        if(helpY-1 >= 0 && maze2[helpY-1][helpX] !== '0' && !visited2[helpY-1][helpX]) {
            // successor up
            var newNode = [x,y-1];
            let n = queue[queue.length-1];
            if(n !== undefined) {
                if(n[0] !== newNode[0] || n[1] !== newNode[1]) {
                    queue.push(newNode);
                }
            } else {
                queue.push(newNode);
            }
        } 
        if(helpX+1 < 34 && maze2[helpY][helpX+1] !== '0' && !visited2[helpY][helpX+1]) {
            // successor down
            var newNode = [x+1,y];
            let n = queue[queue.length-1];
            if(n !== undefined) {
                if(n[0] !== newNode[0] || n[1] !== newNode[1]) {
                    queue.push(newNode);
                }
            } else {
                queue.push(newNode);
            }
        } 
        if(helpX-1 >= 0 && maze2[helpY][helpX-1] !== '0' && !visited2[helpY][helpX-1]) {
            // successor left
            var newNode = [x-1,y];
            let n = queue[queue.length-1];
            if(n !== undefined) {
                if(n[0] !== newNode[0] || n[1] !== newNode[1]) {
                    queue.push(newNode);
                }
            } else {
                queue.push(newNode);
            }
        } 
        if(helpY+1 < 34 && maze2[helpY+1][helpX] !== '0' && !visited2[helpY+1][helpX]) {
            // successor right
            var newNode = [x,y+1];
            let n = queue[queue.length-1];
            if(n !== undefined) {
                if(n[0] !== newNode[0] || n[1] !== newNode[1]) {
                    queue.push(newNode);
                }
            } else {
                queue.push(newNode);
            }
        }
    }
    return;
}

/**
 * This function draws the actual visited node black
 * @param {Number} x 
 * @param {Number} y 
 */
function drawPath2(x,y) {
    ctx2.beginPath();
    ctx2.rect(x*15,y*15,15,15);
    ctx2.fillStyle = "black";
    ctx2.fill();
    ctx2.stroke();
}

/**
 * This function draws the wall
 * @param {Number} x 
 * @param {Number} y 
 */
function setWall2(x,y) {
    ctx2.beginPath();
    ctx2.rect(x*15,y*15,15,15);
    ctx2.fillStyle = "red";
    ctx2.fill();
    ctx2.stroke();
}

/**
 * This function draws the start node green
 * @param {Number} x 
 * @param {Number} y 
 */
function setStart2(x,y) {
    ctx2.beginPath();
    ctx2.rect(x*15,y*15,15,15);
    ctx2.fillStyle = "green";
    ctx2.fill();
    ctx2.stroke();
}

/**
 * This function draws the target node blue
 * @param {Number} x 
 * @param {Number} y 
 */
function setTarget2(x,y) {
    ctx2.beginPath();
    ctx2.rect(x*15,y*15,15,15);
    ctx2.fillStyle = "blue";
    ctx2.fill();
    ctx2.stroke();
}

/**
 * This function set the thread on sleep
 * @param {Number} millis 
 * @returns Promise 
 */
function sleep2(millis) {
    return new Promise(resolve => setTimeout(resolve,millis));
}
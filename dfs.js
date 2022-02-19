/**
 * This is the javascript file, which draws the maze and search a path from the start to the target
 * @author neverchange95
 * @version 1.0
 */

// Getting the canvas from html
var can = document.getElementById("canvas1"); 
var ctx = can.getContext("2d");

// Define the x,y coordinates for start and target node and a running variable so that the user can restart the alg.
var startNodeX;
var startNodeY;
var targetNodeX;
var targetNodeY;
var running = false;

// A array which contains the maze 
// s = start, e = end, 0 = wall, 1 = path
var maze = [
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
drawGrid();
drawMaze();

/**
 * This function draws the grid into the canvas.
 */
function drawGrid() {
    ctx.strokeStyle = "black";

    for(var i = 0.5; i < 34; i++) {
        for(var j = 0.5; j < 35; j++) {
            var x = i * 15;
            var y = j * 15;
            ctx.beginPath();
            ctx.rect(x,y,15,15);
            ctx.fillStyle = "white";
            ctx.fill();
            ctx.stroke();
        }
    }
}

/**
 * This function draws the maze into the grid
 */
function drawMaze() {
    ctx.strokeStyle = "black";

    for(var i = 0.5; i < 34; i++) {
        for(var j = 0.5; j < 35; j++) {
            if(maze[j-0.5][i-0.5] === '0') {
                setWall(i,j);
            } else if(maze[j-0.5][i-0.5] === 's') {
                startNodeX = i;
                startNodeY = j;
                setStart(i,j);
            } else if(maze[j-0.5][i-0.5] === 'e') {
                targetNodeX = i;
                targetNodeY = j;
                setTarget(i,j);
            }
        }
    }
}

/**
 * This function creates a array named visited. In this array will be true stored, if the node is visited.
 * After that the dfs-function is called and is searching for a path.
 */
function dfsHelper() {
    if(!running) {
        running = true;
        ctx.clearRect(0,0,can.width,can.height);
        drawGrid();
        drawMaze();
        var visited = [];
        for(var i = 0; i < 34; i++) {
            var lengthX = [];
            for(var j = 0; j < 35; j++) {
                lengthX.push(false);
            }
            visited.push(lengthX);
        }
        dfsIter(visited,startNodeX,startNodeY); // Start searching
    }
}

/**
 * This is the dfs-function which is searching a path to the target.
 * @param {Array} visited 
 * @param {Number} x 
 * @param {Number} y 
 * @returns nothing
 */
async function dfsIter(visited,x,y) {
    var stack = []; // Create a stack, to push the successor nodes in it
    var node = [x,y]; 
    stack.push(node);
    while(stack.length !== 0) {
        node = stack.pop(); // Get the last pushed element from the stack
        var x = node[0]; // Get the x-coordinate
        var y = node[1]; // Get the y-coordinate
        
        var helpX = node[0] - 0.5;
        var helpY = node[1] - 0.5;

        visited[helpY][helpX] = true; // Set the actual node as visited

        if(x === targetNodeX && y === targetNodeY) {
            // The target is found!
            drawPath(x,y);
            console.log("Ziel gefunden!");
            running = false;
            break;
        }
        
        drawPath(x,y);
        await sleep(100); // Sleep 100 millis

        if(helpY-1 >= 0 && maze[helpY-1][helpX] !== '0' && !visited[helpY-1][helpX]) {
            // successor up
            var newNode = [x,y-1];
            stack.push(newNode);
        } 
        if(helpX+1 < 34 && maze[helpY][helpX+1] !== '0' && !visited[helpY][helpX+1]) {
            // successor down
            var newNode = [x+1,y];
            stack.push(newNode);
        } 
        if(helpX-1 >= 0 && maze[helpY][helpX-1] !== '0' && !visited[helpY][helpX-1]) {
            // successor left
            var newNode = [x-1,y];
            stack.push(newNode);
        } 
        if(helpY+1 < 34 && maze[helpY+1][helpX] !== '0' && !visited[helpY+1][helpX]) {
            // successor right
            var newNode = [x,y+1];
            stack.push(newNode);
        }
    }
    return;
}

/**
 * This function draws the actual visited node black
 * @param {Number} x 
 * @param {Number} y 
 */
function drawPath(x,y) {
    ctx.beginPath();
    ctx.rect(x*15,y*15,15,15);
    ctx.fillStyle = "black";
    ctx.fill();
    ctx.stroke();
}

/**
 * This function draws the wall
 * @param {Number} x 
 * @param {Number} y 
 */
function setWall(x,y) {
    ctx.beginPath();
    ctx.rect(x*15,y*15,15,15);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.stroke();
}

/**
 * This function draws the start node green
 * @param {Number} x 
 * @param {Number} y 
 */
function setStart(x,y) {
    ctx.beginPath();
    ctx.rect(x*15,y*15,15,15);
    ctx.fillStyle = "green";
    ctx.fill();
    ctx.stroke();
}

/**
 * This function draws the target node blue
 * @param {Number} x 
 * @param {Number} y 
 */
function setTarget(x,y) {
    ctx.beginPath();
    ctx.rect(x*15,y*15,15,15);
    ctx.fillStyle = "blue";
    ctx.fill();
    ctx.stroke();
}

/**
 * This function set the thread on sleep
 * @param {Number} millis 
 * @returns Promise 
 */
function sleep(millis) {
    return new Promise(resolve => setTimeout(resolve,millis));
}
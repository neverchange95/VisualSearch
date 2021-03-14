var can2 = document.getElementById("canvas2");
var ctx2 = can2.getContext("2d");

var startNodeX2;
var startNodeY2;
var targetNodeX2;
var targetNodeY2;
var running2 = false;

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

drawGrid2();
drawMaze2();

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

async function drawMaze2() {
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
        bfsIter(visited2,startNodeX2,startNodeY2);
    }
}

async function bfsIter(visited2,x,y) {
    var stack2 = []; 
    var node2 = [x,y];
    var foundPath2 = [];
    var backtracking2 = false;
    var possibilitys = 0;
    var backtrackNode = [];
    var deadlockNode = [];
    var deadlockNumber = -1;
    stack2.push(node2);
    foundPath2.unshift(node2);
    while(stack2.length !== 0) {
        node2 = stack2.shift();
        var x = node2[0];
        var y = node2[1];

        if(backtracking2 === true) {
            backNode = backtrackNode[deadlockNumber];
            backtrack2(foundPath2,backNode,deadlockNode);
        }
        
        var helpX = node2[0] - 0.5;
        var helpY = node2[1] - 0.5;

        visited2[helpY][helpX] = true;

        if(x === targetNodeX2 && y === targetNodeY2) {
            drawPath2(x,y);
            console.log("Ziel gefunden!");
            drawFoundPath2(foundPath2);
            break;
        }
        
        drawPath2(x,y);
        await sleep2(100);

        backtracking2 = true;
        possibilitys = 0;
        if(helpY-1 >= 0 && maze2[helpY-1][helpX] !== '0' && !visited2[helpY-1][helpX]) {
            var newNode = [x,y-1];
            backtracking2 = false;
            let n = stack2[stack2.length-1];
            if(n !== undefined) {
                if(n[0] !== newNode[0] || n[1] !== newNode[1]) {
                    stack2.push(newNode);
                    foundPath2.unshift(newNode);
                    possibilitys++;
                }
            } else {
                stack2.push(newNode);
                foundPath2.unshift(newNode);
                possibilitys++;
            }
        } 
        if(helpX+1 < 34 && maze2[helpY][helpX+1] !== '0' && !visited2[helpY][helpX+1]) {
            var newNode = [x+1,y];
            backtracking2 = false;
            let n = stack2[stack2.length-1];
            if(n !== undefined) {
                if(n[0] !== newNode[0] || n[1] !== newNode[1]) {
                    stack2.push(newNode);
                    foundPath2.unshift(newNode);
                    possibilitys++;
                }
            } else {
                stack2.push(newNode);
                foundPath2.unshift(newNode);
                possibilitys++;
            }
        } 
        if(helpX-1 >= 0 && maze2[helpY][helpX-1] !== '0' && !visited2[helpY][helpX-1]) {
            var newNode = [x-1,y];
            backtracking2 = false;
            let n = stack2[stack2.length-1];
            if(n !== undefined) {
                if(n[0] !== newNode[0] || n[1] !== newNode[1]) {
                    stack2.push(newNode);
                    foundPath2.unshift(newNode);
                    possibilitys++;
                }
            } else {
                stack2.push(newNode);
                foundPath2.unshift(newNode);
                possibilitys++;
            }
        } 
        if(helpY+1 < 34 && maze2[helpY+1][helpX] !== '0' && !visited2[helpY+1][helpX]) {
            var newNode = [x,y+1];
            backtracking2 = false;
            let n = stack2[stack2.length-1];
            if(n !== undefined) {
                if(n[0] !== newNode[0] || n[1] !== newNode[1]) {
                    stack2.push(newNode);
                    foundPath2.unshift(newNode);
                    possibilitys++;
                }
            } else {
                stack2.push(newNode);
                foundPath2.unshift(newNode);
                possibilitys++;
            }
        }
        if(possibilitys > 1) {
            nb = [x,y];
            setTarget2(x,y);
            backtrackNode.push(nb);
            console.log(backtrackNode);
        }
        if(backtracking2 === true) {
            deadlockNode = [x,y];
            setStart2(x,y);
            deadlockNumber++;
            console.log(deadlockNumber);
        }
    }
    return;
}

function backtrack2(path2,backNode,deadlockNode) {
    var x = deadlockNode[0];
    var y = deadlockNode[1];
    var helpX = deadlockNode[0] - 0.5;
    var helpY = deadlockNode[1] - 0.5;
    var running = true;

    debugBacktracking(backNode[0],backNode[1]);

    while(running) {
        if(x !== backNode[0] && y !== backNode[1]) {
            if(helpY-1 >= 0 && maze2[helpY-1][helpX] !== '0') {
                y = y-1;
            } else if(helpX+1 < 34 && maze2[helpY][helpX+1] !== '0') {
                x = x+1;
            } else if(helpX-1 >= 0 && maze2[helpY][helpX-1] !== '0') {
                x = x-1;
            } else if(helpY+1 < 34 && maze2[helpY+1][helpX] !== '0') {
                y = y+1;
            }

            for(var i = 0; i < path2.length; i++) {
                var pathNode = path2[i];
                if(pathNode[0] === x && pathNode[1] === y) {
                    path2.splice(i,1); // remove one element at index i
                    break;
                }
            }
        } else {
            running = false;
        }
    }
    return path2;
}

async function drawFoundPath2(path2) {
    while(path2.length > 0) {
        var coordinates2 = path2[0];
        ctx2.beginPath();
        ctx2.rect(coordinates2[0]*15,coordinates2[1]*15,15,15);
        ctx2.fillStyle = "green";
        ctx2.fill();
        ctx2.stroke();
        path2.shift();
        await sleep2();
    }
    running2 = false;
}

function drawPath2(x,y) {
    ctx2.beginPath();
    ctx2.rect(x*15,y*15,15,15);
    ctx2.fillStyle = "black";
    ctx2.fill();
    ctx2.stroke();
}


function setWall2(x,y) {
    ctx2.beginPath();
    ctx2.rect(x*15,y*15,15,15);
    ctx2.fillStyle = "red";
    ctx2.fill();
    ctx2.stroke();
}

function setStart2(x,y) {
    ctx2.beginPath();
    ctx2.rect(x*15,y*15,15,15);
    ctx2.fillStyle = "green";
    ctx2.fill();
    ctx2.stroke();
}

function setTarget2(x,y) {
    ctx2.beginPath();
    ctx2.rect(x*15,y*15,15,15);
    ctx2.fillStyle = "blue";
    ctx2.fill();
    ctx2.stroke();
}

function debugBacktracking(x,y) {
    ctx2.beginPath();
    ctx2.rect(x*15,y*15,15,15);
    ctx2.fillStyle = "yellow";
    ctx2.fill();
    ctx2.stroke();
}

function sleep2(millis) {
    return new Promise(resolve => setTimeout(resolve,millis));
}
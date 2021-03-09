var can = document.getElementById("canvas");
var ctx = can.getContext("2d");

drawGrid();
test();
setStart();
setTarget();

class Node {
    constructor(x,y) {
        this.x = x;
        this.y = y;
        this.left = null;
        this.right = null;
    }
}

class BinarySearchTree {
    constructor() {
        this.root = null;
    }

    insert(x,y) {
        var newNode = new Node(x,y);
        if(this.root === null) {
            this.root = newNode;
        } else {
            this.insertNode(this.root, newNode);
        }
    }

    insertNode(node, newNode) {
        if(newNode.x === 0.5) {
            if(node.left === null) {
                node.left = newNode;
            } else {
                this.insertNode(node.left,newNode);
            }
        } else if(newNode.y === 0.5) {
            if(node.right === null) {
                node.right = newNode;
            } else {
                this.insertNode(node.right,newNode);
            }
        } else {
            var help = this.root;
            if(help.right === null) {
                help.right = newNode;
            } else {
                this.insertNode(help.left,newNode);
            }
        }
    }
}

function drawGrid() {
    ctx.strokeStyle = "black";

    for(var i = 0.5; i < 32; i++) {
        for(var j = 0.5; j < 32; j++) {
            var x = i * 15;
            var y = j * 15;
            ctx.beginPath();
            ctx.rect(x,y,15,15);
            ctx.stroke();
        }
    }
}

async function test() {
    ctx.strokeStyle = "black";

    for(var i = 0.5; i < 32; i++) {
        for(var j = 0.5; j < 32; j++) {
            var x = i * 15;
            var y = j * 15;
            ctx.beginPath();
            ctx.rect(x,y,15,15);
            ctx.fillStyle = "red";
            ctx.fill();
            await sleep(5);
            ctx.stroke();
        }
    }
}

function setStart() {
    ctx.beginPath();
    ctx.rect(0.5*15,0.5*15,15,15);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.stroke();
}

function setTarget() {
    ctx.beginPath();
    ctx.rect(31.5*15,31.5*15,15,15);
    ctx.fillStyle = "blue";
    ctx.fill();
    ctx.stroke();
}

function sleep(millis) {
    return new Promise(resolve => setTimeout(resolve,millis));
}
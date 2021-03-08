var can = document.getElementById("canvas");
var ctx = can.getContext("2d");

drawGrid();
search();

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


async function search() {
    ctx.strokeStyle = "black";

    for(var i = 0.5; i < 32; i++) {
        for(var j = 0.5; j < 32; j++) {
            var x = i * 15;
            var y = j * 15;
            ctx.beginPath();
            ctx.rect(x,y,15,15);
            ctx.stroke();

            if(i == 0.5 || j == 0.5) {
                ctx.fillStyle = "grey";
                ctx.fill();
                await sleep(50);
            }
        }
    }
}

function sleep(millis) {
    return new Promise(resolve => setTimeout(resolve,millis));
}
var socket = io()
side = 30

function setup() {
   createCanvas(60 * side, 60 * side)
   stroke(180, 180, 180)
   
}
function drawing(matrix){
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {

            if (matrix[y][x] == 0) {
                fill("#acacac");
            }
            else if (matrix[y][x] == 1) {
                fill("green");
            } else if (matrix[y][x] == 2) {
                fill("yellow");
            } else if (matrix[y][x] == 3) {
                fill("red");
            } else if (matrix[y][x] == 4) {
                fill('orange')
            } else if (matrix[y][x] == 5) {
                fill('pink')
            }

            rect(side * x, side * y, side, side)

        }
    }

}
setInterval(function(){
    socket.on('send matrix', drawing)
    }
),1000

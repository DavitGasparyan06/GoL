var socket = io()
side = 12

function setup() {
   createCanvas(60 * side, 60 * side)
   stroke(180, 180, 180)
   
}
socket.on("weather", function (data) {
    weath = data;
})

function drawing(matrix){
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {

            if (matrix[y][x] == 0) {
                fill("#acacac");
            }
            else if (matrix[y][x] == 1) {
                if(weath == "summer") {
                    fill("green");
                }else if (weath == "autumn") {
                    fill("#333300");
                }else if (weath == "winter") {
                    fill("white");
                }else if (weath == "spring") {
                    fill("#4dffa6");
                }
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
    socket.on('send matrix', drawing)


function kill() {
    socket.emit("kill")
}
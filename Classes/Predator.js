let LivingCreature = require('./LivingCreature')
module.exports = class Predator extends LivingCreature {
    constructor(x, y) {
        super(x, y)
        this.energy = 60
    }

    updateDirection() {
        this.direction = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ]
    }

    chooseCell(ch) {
        this.updateDirection()
        return super.chooseCell(ch)
    }

    move() {
            let emptyCells = this.chooseCell(0)
            let emptyCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]
            if (emptyCell && this.energy >0) {
                this.energy-=3
                let x = emptyCell[0]
                let y = emptyCell[1]

                matrix[y][x] = 3
                matrix[this.y][this.x] = 0



                this.x = x
                this.y = y
            }else if(this.energy <= 0 ){
                this.die()
            }
        
    }
    eat() {
        this.mul()
        let newCells = this.chooseCell(2)
        var newCell = newCells[Math.floor(Math.random() * newCells.length)];
        if (newCell && this.energy > 0) {
            if (weath == "winter") {
                this.energy += 3.5
            } else if (weath == "spring") {
                this.energy += 5
            } else if (weath == "summer") {
                this.energy += 4
            } else if (weath == "autumn") {
                this.energy += 3
            }
            var newX = newCell[0];
            var newY = newCell[1];

            matrix[this.y][this.x] = 0;
            matrix[newY][newX] = 3;

            for (var i in eaterArr) {
                if (newX == eaterArr[i].x && newY == eaterArr[i].y) {
                    eaterArr.splice(i, 1);
                    break;
                }
            }

            this.y = newY;
            this.x = newX;
        }else{
            this.move()
        }
    }

    die() {
        matrix[this.y][this.x] = 0
        for (var i in predatorArr) {
            if (this.x == predatorArr[i].x && this.y == predatorArr[i].y) {
                predatorArr.splice(i, 1)
                break;
            }
        }
    }

    mul() {
        ///////changed
        let newCells = this.chooseCell(0)
        var newCell = newCells[Math.floor(Math.random() * newCells.length)];
        /////////////////
        if (this.energy > 70 && newCell) {
            var newPredator = new Predator(newCell[0], newCell[1]);
            predatorArr.push(newPredator);
            matrix[newCell[1]][newCell[0]] = 3;
            this.energy = 60;
        }
    }

}
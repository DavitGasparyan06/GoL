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
        this.energy--
        let arr = this.chooseCell(2)
        if (arr.length > 0) {
            this.eat()
            if (this.energy >= 65) {
                this.mul()
            }
        }
        else {
            let emptyCell = arr[Math.floor(Math.random() * arr.length)]

            if (emptyCell) {
                let x = emptyCell[0]
                let y = emptyCell[1]

                matrix[y][x] = 3
                matrix[this.y][this.x] = 0



                this.x = x
                this.y = y
            } else {
                this.energy += 0.5
            }
            if (this.energy <= 0) {
                this.die()
            }
        }
    }
    eat() {
        ////////Changed
        var newCell = Math.floor(Math.random((this.chooseCell(2))));
        ///////////////////
        if (newCell) {
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
            this.energy += 5;
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
        var newCell = Math.floor(Math.random((this.chooseCell(0))));
        /////////////////
        if (newCell) {
            var newPredator = new Predator(newCell[0], newCell[1]);
            predatorArr.push(newPredator);
            matrix[newCell[1]][newCell[0]] = 3;
            this.energy = 60;
        }
    }

}
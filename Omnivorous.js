let LivingCreature = require('./LivingCreature')
module.exports = class Omnivorous extends LivingCreature {
    constructor(x, y) {
        super(x, y)
        this.energy = 35
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
        let Grassarr = this.chooseCell(1)
        let Eaterarr = this.chooseCell(2)
        let Predatorarr = this.chooseCell(3)
        let Flowerarr = this.chooseCell(5)
        if (arr.length > 0 || Grassarr.length > 0 || Eaterarr > 0 || Predatorarr > 0 || Flowerarr > 0) {
            this.eat()
            if (this.energy >= 70) {
                this.mul()
            }
        } else {
            arr = this.chooseCell(0)

            let emptyCell = arr[Math.floor(Math.random() * arr.length)]

            if (emptyCell) {
                let x = emptyCell[0]
                let y = emptyCell[1]

                matrix[y][x] = 4
                matrix[this.y][this.x] = 0



                this.x = x
                this.y = y
            }
            if (this.energy <= 0) {
                this.die()
            }
        }




    }
    eat() {
        let PredatorCell = Math.floor(Math.random((this.chooseCell(3))));
        let GrassCell = Math.floor(Math.random((this.chooseCell(1))));
        let EaterCell = Math.floor(Math.random((this.chooseCell(2))));
        let FlowerCell = Math.floor(Math.random((this.chooseCell(5))));

        if (PredatorCell) {
            let newX = PredatorCell[0];
            let newY = PredatorCell[1];

            matrix[this.y][this.x] = 0;
            matrix[newY][newX] = 4;

            for (var i in predatorArr) {
                if (newX == predatorArr[i].x && newY == predatorArr[i].y) {
                    predatorArr.splice(i, 1);
                    break;
                }
            }
            this.y = newY;
            this.x = newX;
            this.energy += 10;
        } else if (EaterCell) {
            let newX = EaterCell[0];
            let newY = EaterCell[1];

            matrix[this.y][this.x] = 0;
            matrix[newY][newX] = 4;

            for (var i in eaterArr) {
                if (newX == eaterArr[i].x && newY == eaterArr[i].y) {
                    eaterArr.splice(i, 1);
                    break;
                }
            }

            this.y = newY;
            this.x = newX;
            this.energy += 8;
        } else if (FlowerCell) {
            let newX = FlowerCell[0];
            let newY = FlowerCell[1];

            matrix[this.y][this.x] = 0;
            matrix[newY][newX] = 4;

            for (var i in flowerArr) {
                if (newX == flowerArr[i].x && newY == flowerArr[i].y) {
                    flowerArr.splice(i, 1);
                    break;
                }
            }

            this.y = newY;
            this.x = newX;
            this.energy += 5;
        } else if (GrassCell) {
            let newX = GrassCell[0];
            let newY = GrassCell[1];

            matrix[this.y][this.x] = 0;
            matrix[newY][newX] = 4;

            for (var i in grassArr) {
                if (newX == grassArr[i].x && newY == grassArr[i].y) {
                    grassArr.splice(i, 1);
                    break;
                }
            }

            this.y = newY;
            this.x = newX;
            this.energy += 2;
        }
    }

    die() {
        matrix[this.y][this.x] = 0
        for (var i in omnivorousArr) {
            if (this.x == omnivorousArr[i].x && this.y == omnivorousArr[i].y) {
                omnivorousArr.splice(i, 1)
                break;
            }
        }
    }

    mul() {
        ///////////changed
        var newCell = Math.floor(Math.random((this.chooseCell(0))));
        ///////////////
        if (newCell) {
            var newOmnivorous = new Omnivorous(newCell[0], newCell[1]);
            omnivorousArr.push(newOmnivorous);
            matrix[newCell[1]][newCell[0]] = 4;
            this.energy = 35;
        }
    }
}
let LivingCreature = require('./LivingCreature')
module.exports = class Eater extends LivingCreature {
    constructor(x, y) {
        super(x, y)
        this.energy = 13
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

        if (this.energy >= 15) {
            this.mul()
        }

        let arr = this.chooseCell(1)

        if (arr.length > 0) {
            this.eat()
        }
        else {
            arr = this.chooseCell(0)
            let emptyCell = arr[Math.floor(Math.random() * arr.length)]
            if (emptyCell) {
                let x = emptyCell[0]
                let y = emptyCell[1]

                matrix[y][x] = 2
                matrix[this.y][this.x] = 0

                this.x = x
                this.y = y
            }
        }

        if (this.energy <= 0) {
            this.die()
        }
    }
    eat() {
        //////////////////////Changed
        let newCell = Math.floor(Math.random((this.chooseCell(1))));
        let flowerCell = Math.floor(Math.random((this.chooseCell(5))));
///////////
        if (flowerCell) {
            let newX = flowerCell[0];
            let newY = flowerCell[1];

            matrix[this.y][this.x] = 0;
            matrix[newY][newX] = 2;

            for (let i in flowerArr) {
                if (newX == flowerArr[i].x && newY == flowerArr[i].y) {
                    flowerArr.splice(i, 1);
                    break;
                }
            }

            this.y = newY;
            this.x = newX;
            this.energy += 2;
        }
        else if (newCell) {
            let newX = newCell[0];
            let newY = newCell[1];

            matrix[this.y][this.x] = 0;
            matrix[newY][newX] = 2;

            for (let i in grassArr) {
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
        for (let i in eaterArr) {
            if (this.x == eaterArr[i].x && this.y == eaterArr[i].y) {
                eaterArr.splice(i, 1)
                break;
            }
        }
    }

    mul() {
        let newCell = random(this.chooseCell(0));

        if (this.energy >= 15 && newCell) {
            let newGrassEater = new Eater(newCell[0], newCell[1]);
            eaterArr.push(newGrassEater);
            matrix[newCell[1]][newCell[0]] = 2;
            this.energy = 8;
        }
    }
}
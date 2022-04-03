let LivingCreature = require('./LivingCreature')
module.exports = class Grass extends LivingCreature {
    mul() {

        this.multiply++
        let arr = this.chooseCell(0)
        let emptyCell = arr[Math.floor(Math.random() * arr.length)]

        if (this.multiply >= 5 && emptyCell) {

            let x = emptyCell[0]
            let y = emptyCell[1]
            matrix[y][x] = 1

            let gr = new Grass(x, y)
            grassArr.push(gr)
            this.multiply = 0
        }
        if (weath == "winter") {
            this.energy -= 2;
            this.multiply -= 2;
        }
        if (weath == "spring") {
            this.energy += 5;
            this.multiply += 5;
        }
        if (weath == "summer") {
            this.energy += 3;
            this.multiply += 3;
        }
        if (weath == "autumn") {
            this.energy--;
            this.multiply--;
        }

    }

}

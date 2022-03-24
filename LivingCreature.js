module.exports = class LivingCreature {
    constructor(x, y) {
        this.x = x
        this.y = y
        this.multiply = 0
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
    chooseCell(character) {
        let found = [];
        for (let i in this.direction) {
            let x = this.direction[i][0];
            let y = this.direction[i][1];

            if (x >= 0 && y >= 0 && x < matrix.length && y < matrix.length && matrix[y][x] == character) {
                if (matrix[y][x] == character) {
                    found.push(this.direction[i])
                }
            }
        }

        return found;
    }
}
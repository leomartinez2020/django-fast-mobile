class Square {
    constructor(x, y, width, height, bgcolor, ctx) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.bgcolor = bgcolor;
        this.ctx = ctx;
    }
    draw() {
        this.ctx.fillStyle = this.bgcolor;
        this.ctx.strokeStyle = '#333333';
        this.ctx.lineWidth = 1;
        this.ctx.fillRect(this.x, this.y, this.width, this.height);
        this.ctx.strokeRect(this.x, this.y, this.width, this.height);
    }
}

function getArray(arraySize, useIndex=true, val=0) {
    let arr = [];
    for (let j = 0; j < arraySize; j++) {
        if (useIndex) {
            arr.push(j);
        } else {
            arr.push(val); // default is zero
        }
    }
    return arr;
}

// Uses Fisher-Yates shuffle
function getRandomArray(size) {
    let arr = getArray(size);
    for (let i = arr.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

function drawGrid(x, y, side, offset, cellWidth, cellHeight, cellBackground, ctx) {
    let grid = [];
    for (let i = 0; i < side; i++) {
        for (let j = 0; j < side; j++) {
            grid.push(new Square(x, y, cellWidth, cellHeight, cellBackground, ctx));
            x += cellWidth;
        }
        y += cellHeight;
        x = offset;
    }
    for (cell of grid) {
        cell.draw();
    }
    return grid;
}

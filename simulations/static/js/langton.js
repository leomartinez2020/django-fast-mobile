class LangtonAnt {
    constructor(side) {
        this.grid = [];
        this.size = side * side;
        this.side = side; // side of square
        this.array = getArray(this.size);
        this.arrColors = getArray(this.size, false, 1);
        this.randomArr = getRandomArray(this.size);
        this.initDir = 90;
        this.initIndex = 4050;
        this.black = 'black';
        this.white = 'white';
    }
    createGrid() {
        //this.arrColors[525] = 2;
        var canvas = document.getElementById("langton");
        var xval = document.getElementById("xval");
        var ctx = canvas.getContext("2d");
        ctx.strokeStyle = '#ff0000';
        let backgroundColor = this.white;
        let lado = 500 / this.side;
        this.grid = drawGrid(50, 50, this.side, 50, lado, lado, backgroundColor, ctx);
        let startCell = this.grid[this.initIndex];
        startCell.bgcolor = 'red';
        startCell.draw();
    }
    changeColor(indx, color) {
        //console.log(color);
        let square = this.grid[indx];
        square.bgcolor = color;
        square.draw();
    }
    moveForward(direction) {
        switch (direction) {
            case 90:
                this.initIndex -= this.side;
                break;
            case 0:
                this.initIndex += 1;
                break;
            case 270:
                this.initIndex += this.side;
                break;
            case 180:
                this.initIndex -= 1;
                break;
        }
    }
    moveDir() {
        // initDir is 0, 90, 180, 270
        if (this.initIndex < this.size) {
            let dir;
            if (this.grid[this.initIndex].bgcolor === this.white) {
                dir = this.initDir - 90;
                if (dir < 0) dir = 270;
                this.changeColor(this.initIndex, this.black);
                //squareColor = 'black';
            }
            else {
                dir = this.initDir + 90;
                if (dir >= 360) dir = 0;
                this.changeColor(this.initIndex, this.white);
                //squareColor = 'white';
            }
            this.initDir = dir;
            this.moveForward(dir);
            //console.log(initDir);
        }
    }
    reset() {
        this.initDir = 90;
        this.initIndex = 4050;
        this.createGrid();
    }
}

let langtonGrid = new LangtonAnt(100);
langtonGrid.createGrid();

let animate2;
function runLangtonSim() {
    animate2 = setInterval(langtonStep, 20);
}

function langtonStep() {
    if (langtonGrid.initIndex > langtonGrid.size) {
        clearInterval(animate2);
    } else {
        for (let i = 0; i < 20; i++) {
            langtonGrid.moveDir();
        }
    }
}

function resetLangton() {
    langtonGrid.reset();
}

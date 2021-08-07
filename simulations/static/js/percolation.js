class Percolation {
    constructor(side) {
        this.grid = [];
        this.size = side * side;
        this.side = side; // side of square
        this.array = getArray(this.size + 2); // to apply connectivity ops
        this.tree = getArray(this.size + 2, false, 1);
        this.arrColors = getArray(this.size + 2, false, 1);
        this.randomArr = getRandomArray(this.size);
        this.virtualTopIndex = this.size;
        this.virtualBottomIndex = this.size + 1;
        this.fillColor = '#03a9fc';
    }
    createGrid() {
        this.arrColors[this.virtualTopIndex] = 2;
        this.arrColors[this.virtualBottomIndex] = 0;
        var canvas = document.getElementById("percolation");
        var xval = document.getElementById("xval");
        var ctx = canvas.getContext("2d");
        ctx.strokeStyle = '#ff0000';
        let backgroundColor = 'black';
        let lado = 500 / this.side;
        this.grid = drawGrid(50, 50, this.side, 50, lado, lado, backgroundColor, ctx);
        let virtualTop = new Square(300, 20, 10, 10, this.fillColor, ctx);
        let virtualBottom = new Square(300, 570, 10, 10, 'white', ctx);
        this.grid.push(virtualTop, virtualBottom);
        virtualTop.draw();
        virtualBottom.draw();
    }
    getRoot(indx) {
        while (indx !== this.array[indx]) {
            this.array[indx] = this.array[this.array[indx]];
            indx = this.array[indx];
        }
        return indx
    }
    changeColor(indx, colorCode) {
        let bgcolor = colorCode === 0 ? 'white' : this.fillColor;
        let square;
        square = this.grid[indx];
        try {
            square.bgcolor = bgcolor;
            square.draw();
        } catch (error) {
            console.log(indx);
            console.error(error);
        }
    }
    connected(p, q) {
        return this.getRoot(p) === this.getRoot(q);
    }
    union(p, q) {
        let ip = this.getRoot(p);
        let iq = this.getRoot(q);
        if (ip === iq) return;
        if (this.tree[ip] < this.tree[iq]) {
            this.array[ip] = iq;
            this.tree[iq] += this.tree[ip];
        } else {
            this.array[iq] = ip;
            this.tree[ip] += this.tree[iq];
        }
    }
    openSite() {
        let indx = this.randomArr.pop();
        // if there is blue around, change color to blue
        // otherwise to white
        // if color turned to blue, do floodfill
        if (this.arrColors[this.getLeft(indx)] === 2) {
            this.arrColors[indx] = 2;
            this.changeColor(indx, 2);
        }
        else if (this.arrColors[this.getRight(indx)] === 2) {
            this.arrColors[indx] = 2;
            this.changeColor(indx, 2);
        }
        else if (this.arrColors[this.getUp(indx)] === 2) {
            this.arrColors[indx] = 2;
            this.changeColor(indx, 2);
        }
        else if (this.arrColors[this.getDown(indx)] === 2) {
            this.arrColors[indx] = 2;
            this.changeColor(indx, 2);
        }
        else {
            this.arrColors[indx] = 0; // white color
            this.changeColor(indx, 0);
        }
        // if change color to blue, do floodfill
        if (this.arrColors[indx] === 2) {
            this.floodFill(indx);
        }
    }
    floodFill(indx) {
        // 0 = white, 1 = black, 2 = lightblue
        // here we modify array with union ops
        // TODO
        let stack = [];
        stack.push(indx);
        while (stack.length > 0) {
            let val = stack.pop();
            // check arrColors for white
            let left = this.getLeft(val);
            if (this.arrColors[left] === 0) {
                this.arrColors[left] = 2; // change color to lightblue
                this.union(indx, left);
                this.changeColor(left, 2);
                stack.push(left); // need to check flood for next node
            }
            if (this.arrColors[left] === 2) { // if blue, just apply union
                this.union(indx, left);
            }
            let right = this.getRight(val);
            if (this.arrColors[right] === 0) {
                this.arrColors[right] = 2; // change color to lightblue
                this.union(indx, right);
                this.changeColor(right, 2);
                stack.push(right); // need to check flood for next node
            }
            if (this.arrColors[right] === 2) { // if blue, just apply union
                this.union(indx, right);
            }
            let up = this.getUp(val);
            //if (up === virtualUp) union(indx, up)
            if (this.arrColors[up] === 0) {
                this.arrColors[up] = 2; // change color to lightblue
                this.union(indx, up);
                this.changeColor(up, 2);
                stack.push(up); // need to check flood for next node
            }
            if (this.arrColors[up] === 2) { // if blue, just apply union
                this.union(indx, up);
            }
            let down = this.getDown(val);
            if (this.arrColors[down] === 0) {
                this.arrColors[down] = 2; // change color to lightblue
                this.union(indx, down);
                this.changeColor(down, 2);
                stack.push(down); // need to check flood for next node
            }
            if (this.arrColors[down] === 2) { // if blue, just apply union
                this.union(indx, down);
            }
        }
    }
    // get the left index
    getLeft(indx) {
        let SIDE = this.side;
        let limit = Math.floor(indx / SIDE) * SIDE;
        if (indx - 1 >= limit) {
            return indx - 1;
        } else {
            return undefined;
        }
    }
    
    getRight(indx) {
        let SIDE = this.side;
        let limit = Math.floor(indx / SIDE) * SIDE + SIDE - 1;
        //right = right < limit ? indx + 1 : undefined;
        if (indx + 1 <= limit) {
            return indx + 1;
        } else {
            return undefined;
        }
    }
    getUp(indx) {
        let SIDE = this.side;
        let limit = SIDE - 1;
        if (indx - SIDE >= 0) {
            return indx - SIDE;
        } else {
            return this.virtualTopIndex;
        }
    }
    getDown(indx) {
        let SIDE = this.side;
        //let limit = Math.floor(indx / SIDE) * SIDE;
        let limit = SIDE * SIDE;
        //down = down < limit ? indx + SIDE : virtualDown;
        if (indx + SIDE < limit) {
            return indx + SIDE;
        } else {
            return this.virtualBottomIndex;
        }
    }
    percolates() {
        return this.getRoot(this.virtualTopIndex) === this.getRoot(this.virtualBottomIndex);
    }
    reset() {
        this.array = getArray(this.size + 2); // to apply connectivity ops
        this.tree = getArray(this.size + 2, false, 1);
        this.arrColors = getArray(this.size + 2, false, 1);
        this.randomArr = getRandomArray(this.size);
        this.createGrid();
    }
}

percolationInstance = new Percolation(50);
percolationInstance.createGrid();

let animate;
function runSimulation() {
    animate = setInterval(runStep, 20);
}

function runStep() {
    if (percolationInstance.percolates()) {
        clearInterval(animate);
    } else {
        for (let i = 0; i < 10; i++) {
            percolationInstance.openSite();
        }
    }
}

function resetPercolation() {
    percolationInstance.reset();
}

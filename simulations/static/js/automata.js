class CellularAutomaton {
    constructor(side) {
        this.grid = [];
        this.size = side * side;
        this.side = side; // side of square
        this.array = getArray(this.side, false, 0);
        this.arrColors = getArray(this.size, false, 1);
        this.randomArr = getRandomArray(this.size);
        this.initIndex = Math.floor(side / 2) - 1;
        this.linea = 1;
        this.numCode = 30;
        this.vals = ['111', '110', '101', '100', '011', '010', '001', '000'];
        //this.noventa = {'111': 0, '110': 1, '101': 0, '100': 1, '011': 1, '010': 0, '001': 1, '000': 0};
        this.noventa = this.getRuleset(this.numCode);
        // colors
        this.white = 'yellow';
        this.black = 'red';
    }
    createGrid() {
        var canvas = document.getElementById("automata");
        var xval = document.getElementById("xval");
        var ctx = canvas.getContext("2d");
        ctx.strokeStyle = '#ff0000';
        let backgroundColor = this.white;
        let lado = 500 / this.side;
        this.grid = drawGrid(50, 50, this.side, 50, lado, lado, backgroundColor, ctx);
        this.array[this.initIndex] = 1;
        let startCell = this.grid[this.initIndex];
        startCell.bgcolor = this.black;
        startCell.draw();
    }
    changeRuleset(num) {
        //console.log(color);
        this.noventa = this.getRuleset(num);
    }
    resetGrid() {
        this.linea = 1;
        this.array = getArray(this.side, false, 0);
        this.createGrid();
    }
    mutateState() {
        if (this.linea < this.side) {
            let copia = this.array.slice();
            for (let i = 0; i < this.array.length; i++) {
                let newVal = this.ruleset(i);
                // if (newVal !== this.array[i]) {
                //     let indice = this.side * this.linea + i;
                //     //console.log(indice)
                //     let previousColor = this.grid[indice - this.side].bgcolor;
                //     //console.log(previousColor)
                //     this.grid[indice].bgcolor = previousColor === 'black' ? 'white' : 'black';
                //     this.grid[indice].draw();
                // }
                copia[i] = newVal;
                let indice = this.side * this.linea + i;
                this.grid[indice].bgcolor = newVal === 0 ? this.white : this.black;
                this.grid[indice].draw();
            }
            this.array = copia;
            this.linea++;
        }
    }
    ruleset(indx) {
        // returns 0 or 1
        // default rule is 90
        let left;
        let right;
        //let left = this.array[((indx - 1) + this.side) % this.side];
        if (indx === 0) {
            //left = 0;
            left = this.array[this.side - 1];
        } else {
            left = this.array[indx - 1];
        }
        if (indx === this.side - 1) {
            right = 0;
        } else {
            right = this.array[indx + 1];
        }
        //let right = this.array[((indx + 1) + this.side) % this.side];
        let middle = this.array[indx];
        let val = `${left}${middle}${right}`
        //let diccio = this.getRuleset(this.numCode);
        return this.noventa[val];
    }
    getRuleset(num) {
        let obj = {};
        let s = (num >>> 0).toString(2);
        let diff = 8 - s.length;
        let pad = '';
        for (let i = 0; i < diff; i++) {
          pad += '0';
        }
        s = pad + s;
        for (let j = 0; j < s.length; j++) {
          obj[this.vals[j]] = parseInt(s[j]);
        }
        return obj;
    }
    
}

let automaton = new CellularAutomaton(100);
automaton.createGrid();

let animate3;
function runAutomataSim(val) {
    automaton.resetGrid();
    automaton.changeRuleset(val);
    animate3 = setInterval(automataStep, 20);
}

function automataStep() {
    if (automaton.linea >= 100) {
        clearInterval(animate3);
    } else {
        automaton.mutateState();
    }
}

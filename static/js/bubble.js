let canvas = document.getElementById('bubbleSort');
let ctx = canvas.getContext('2d');
const canvasHeight = canvas.height;

class Rectangle {
    constructor(width, height) {
        this.width = width;
        this.height = height;
    }
    draw(indx, fillColor='black') {
        let x = (indx + 1) * 20 + 20;
        ctx.beginPath();
        ctx.rect(x, canvasHeight - this.height, this.width, this.height);
        ctx.fillStyle = fillColor;
        ctx.fill();
        ctx.stroke();
    }
}


function rectCollection() {
    let rectSeq = [];
    for (let i = 0; i < 16; i++) {
        let height = Math.floor(Math.random() * 360);
        rectSeq.push(new Rectangle(10, height));
    }
    return rectSeq;
}

let ik = 0;
let jk = 0;
let array = rectCollection();
for (let j = 0; j < array.length; j++) {
    array[j].draw(j);
}

// Animation logic
function sortLoop() {
    if (ik < array.length) {
        for (jk = 0; jk < array.length - ik - 1; jk++) {
            if (array[jk].height > array[jk + 1].height) {
                swap(array, jk, jk + 1);
                redraw();
                array[jk].draw(jk, 'red');
                array[jk + 1].draw(jk + 1, 'red');
            }
        }
    } else {
        while (jk >= 0) {
            redraw();
            array[jk].draw(jk, 'red');
            jk -= 1;
        }
        redraw();
        clearInterval(animVar);
    }
    ik++;

}

function redraw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let j = 0; j < array.length; j++) {
        array[j].draw(j);
    }
}

let animVar;
function animateBubble() {
    animVar = setInterval(sortLoop, 200);
}

function resetBubble() {
    jk = 0;
    ik = 0;
    array = rectCollection();
    redraw();
}

function swap(lista, a, b) {
    let temp = lista[a];
    lista[a] = lista[b];
    lista[b] = temp;
}

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
    let a = array[jk];
    let b = array[jk + 1];
    if (a.height > b.height) {
        swap(array, jk, jk + 1);
            redraw();
            array[jk + 1].draw(jk + 1, 'red');
    }
    if (ik < array.length) {
        jk++;
        if (jk >= array.length - ik - 1) {
            jk = 0;
            ik++;
        }
    } else {
        redraw();
        clearInterval(animVar);
    }
}

function redraw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let j = 0; j < array.length; j++) {
        array[j].draw(j);
    }
}

let animVar;
function animateBubble() {
    animVar = setInterval(sortLoop, 50);
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

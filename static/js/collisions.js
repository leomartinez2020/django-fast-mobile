const canvasCol = document.getElementById('collisions');
let contexto = canvasCol.getContext('2d');
contexto.fillStyle = "#FF0000";
const canHeight = canvasCol.height;
contexto.font = "30px Arial";

class Box {
    constructor(x, width, vel, mass, color) {
        this.x = x;
        this.y = canHeight - width;
        this.width = width;
        this.vel = vel;
        this.color = color;
        this.mass = mass;
    }
    draw() {
        contexto.beginPath();
        contexto.rect(this.x, this.y, this.width, this.width);
        contexto.fillStyle = this.color;
        contexto.fill();
    }
    move() {
        this.x += this.vel;
    }
    collide(other) {
        return !(this.x + this.width < other.x || this.x > other.x + other.width)
    }
    bounce(other) {
        let suma = this.mass + other.mass;
        let newVel = (this.mass - other.mass) / suma * this.vel;
        newVel += (2 * other.mass / suma) * other.vel;
        return newVel;
    }
    hitWall() {
        return this.x <= 0;
    }
    reverse() {
        this.vel *= -1;
    }
}

const timeSteps = 1000;

let counter = 0;
contexto.fillText(`${counter} collisions`, 100, 50);
contexto.fillText('π = 3.1415', 100, 100);

let big = new Box(200, 50, -5 / timeSteps, 1000000, 'blue');
let small = new Box(100, 10, 0, 1, 'red');
big.draw();
small.draw();

function animateStep() {
    if (small.x > 280) {
        clearInterval(animateCol);
    }
    contexto.clearRect(0, 0, canvasCol.width, canvasCol.height);
    for (let i = 0; i < timeSteps; i++) {
        if (big.collide(small)) {
            const v1 = big.bounce(small);
            const v2 = small.bounce(big);
            big.vel = v1;
            small.vel = v2;
            counter++;
        }
        if (small.hitWall()) {
            small.reverse();
            counter++;
        }
        small.move();
        big.move();
    }
    small.draw();
    big.draw();
    contexto.fillText(`${counter} collisions`, 100, 50);
    contexto.fillText('π = 3.1415', 100, 100);
}

let animateCol;
function animateCollisions() {
    animateCol = setInterval(animateStep, 60);
}

function resetCollisions() {
    contexto.clearRect(0, 0, canvasCol.width, canvasCol.height);
    clearInterval(animateCol);
    counter = 0;
    contexto.fillText(`${counter} collisions`, 100, 50);
    contexto.fillText('π = 3.1415', 100, 100);

    big = new Box(200, 50, -5 / timeSteps, 1000000, 'blue');
    small = new Box(100, 10, 0, 1, 'red');
    big.draw();
    small.draw();
}

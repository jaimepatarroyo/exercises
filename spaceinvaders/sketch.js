let prueba;
let me;

function setup() {
  createCanvas(400, 400);
  background(50, 0, 100);
  textAlign(CENTER);

  prueba = new Invader(20, 30);
  me = new Player(20, height);
}

function draw() {
  background(25, 0, 75);

  prueba.show();
  if (frameCount % 15 == 0) {
    prueba.step();
  }

  me.show();
}

function keyPressed() {
  if (keyCode === RIGHT_ARROW) me.moveR();
  else if (keyCode === LEFT_ARROW) me.moveL();
}

class Player {
  constructor(_x, _y) {
    this.x = _x;
    this.y = _y;
    this.size = 40;
  }

  show() {
    textSize(this.size);
    text("🎄", this.x, this.y);
  }

  moveR() {
    this.x += this.size;
  }

  moveL() {
    this.x -= this.size;
  }
}

class Invader {
  constructor(_x, _y) {
    this.x = _x;
    this.y = _y;
    this.dir = 1;
    this.size = 40;
  }

  show() {
    textSize(this.size);
    text("⛄️", this.x, this.y);
  }

  step() {
    this.x += this.size/2 * this.dir;
    if (this.x >= width || this.x <= 0) {
      this.y += this.size;
      this.dir = -this.dir;
      this.x += this.size/2 * this.dir;
    }
  }
}

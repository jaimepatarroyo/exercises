let me;

let lineTest;
let numInv;

function setup() {
  createCanvas(400, 400);
  background(50, 0, 100);
  textAlign(CENTER);

  me = new Player(20, height);

  numInv = 5;
  lineTest = [];
  for (i = 0; i < numInv; i++) lineTest[i] = new Invader(i * 40 + 20, 30);
}

function draw() {
  background(25, 0, 75);


  for (i = 0; i < numInv; i++) lineTest[i].show();
  if (frameCount % 15 === 0) {
    for (i = 0; i < numInv; i++) lineTest[i].step();
    if (lineTest[numInv-1].x >= width || lineTest[0].x <= 0) {
      for (i = 0; i < numInv; i++) lineTest[i].stepDown();
    }
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
    this.x += (this.size / 2) * this.dir;
  }

  stepDown() {
    this.y += this.size;
    this.dir = -this.dir;
    this.step();
  }
}


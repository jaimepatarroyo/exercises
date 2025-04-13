let me;
let enemies;

let m; // margin

function setup() {
  m = 20;
  createCanvas(400 + m * 2, 400 + m * 2);
  background(15, 20, 65);
  textAlign(CENTER);

  me = new Player(20 + m, height - 10 - m);
  enemies = new Fleet(6);
}

function draw() {
  background(15, 20, 65);

  enemies.show();
  if (frameCount % 15 === 0) {
    enemies.move();
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

class Fleet {
  constructor(_n) {
    this.num = _n;
    this.arr = [];
    for (let i = 0; i < this.num; i++)
      this.arr[i] = new Invader(i * 40 + 20 + m, 30 + m);
  }

  show() {
    for (let i = 0; i < this.num; i++) this.arr[i].show();
  }

  move() {
    for (let i = 0; i < this.num; i++) this.arr[i].step();
    if (this.arr[this.num - 1].x >= width - m || this.arr[0].x <= 0 + m)
      for (let i = 0; i < this.num; i++) this.arr[i].stepDown();
  }
}

/**
 * A simple Space Invaders-style game using p5.js
 * Player controls a Christmas tree (🎄) to defend against snowman invaders (⛄️)
 * Created for the Recurse Center pairing interview
 * By Jaime Patarroyo
 */

let me;       // Player object
let enemies;  // Fleet of enemy invaders

let m;        // Margin around the game area

function setup() {
  m = 20; // 20px margin on all sides
  createCanvas(400 + m * 2, 400 + m * 2);
  background(15, 20, 65);
  textAlign(CENTER, CENTER);

  // Initialize player at the bottom with margin
  me = new Player(20 + m, height - 20 - m);
  // Create fleet of 6 enemies
  enemies = new Fleet(6);
}

function draw() {
  background(15, 20, 65);

  enemies.show();
  // Move enemies every 15 frames (~4 moves per second)
  if (frameCount % 15 === 0) {
    enemies.move();
  }

  me.show();
}

function keyPressed() {
  // Moves player left or right based on arrow keys
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
    // Create invaders spaced evenly at the top
    for (let i = 0; i < this.num; i++)
      this.arr[i] = new Invader(i * 40 + 20 + m, 20 + m);
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

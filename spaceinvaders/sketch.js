/**
 * A simple Space Invaders-style game using p5.js
 * Player controls a Christmas tree (🎄) to defend
 * against snowman invaders (⛄️).
 * Created for the Recurse Center pairing interview.
 * By Jaime Patarroyo
 */

let me; // Player object
let enemies; // Fleet of enemy invaders

let oneBullet;
let bullets; // Array of bullets

let m; // Margin around the game area

function setup() {
  m = 20; // 20px margin on all sides
  createCanvas(400 + m * 2, 400 + m * 2);
  background(15, 20, 65);
  textAlign(CENTER, CENTER);

  start();

  /*
  // Initialize player at the bottom with margin
  me = new Player(20 + m, height - 20 - m);
  // Create fleet of 6 enemies
  enemies = new Fleet(6);

  bullets = [];
  */
}

function draw() {
  background(15, 20, 65);

  enemies.show();
  // Move enemies every 15 frames (~4 moves per second)
  if (frameCount % 15 === 0) {
    enemies.move();
  }

  let rem;
  for (let i = 0; i < bullets.length; i++) {
    bullets[i].show();
    bullets[i].move();

    if (enemies.checkCollision(bullets[i].x, bullets[i].y) || bullets[i].y < 0)
      rem = i;
  }
  if (rem != undefined) bullets.splice(rem, 1);

  me.show();

  if (enemies.checkCollision(me.x, me.y) || enemies.arr.length <= 0) {
    start();
  }
}

function keyPressed() {
  // Moves player left or right based on arrow keys
  if (keyCode === RIGHT_ARROW) me.moveR();
  else if (keyCode === LEFT_ARROW) me.moveL();
  else if (key === ' ') bullets[bullets.length] = new Bullet(me.x, me.y);
  else if (key === 'r') start();
}

function start() {
  // Initialize player at the bottom with margin
  me = new Player(20 + m, height - 20 - m);
  // Create fleet of 6 enemies
  enemies = new Fleet(6);

  bullets = [];
}

class Bullet {
  constructor(_x, _y) {
    this.x = _x;
    this.y = _y;
  }

  show() {
    textSize(10);
    text("⭐️", this.x, this.y);
  }

  move() {
    this.y -= 1;
  }
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
    this.x += this.size / 2;
  }

  moveL() {
    this.x -= this.size / 2;
  }
}

class Invader {
  constructor(_x, _y) {
    this.x = _x;
    this.y = _y;
    this.dir = 1;
    this.size = 40;

    this.isAlive = true;
  }

  show() {
    if (this.isAlive === true) {
      textSize(this.size);
      text("⛄️", this.x, this.y);
    }
  }

  step() {
    this.x += (this.size / 2) * this.dir;
  }

  stepDown() {
    this.y += this.size;
    this.dir = -this.dir;
    this.step();
  }

  die() {
    this.isAlive = false;
  }
}

class Fleet {
  constructor(_n) {
    this.arr = [];
    // Create invaders spaced evenly at the top
    for (let i = 0; i < _n; i++)
      this.arr[i] = new Invader(i * 40 + 20 + m, 20 + m);
  }

  show() {
    if (this.arr.length > 0) {
      for (let i = 0; i < this.arr.length; i++) this.arr[i].show();
    }
  }

  move() {
    if (this.arr.length > 0) {
      for (let i = 0; i < this.arr.length; i++) this.arr[i].step();
      if (
        this.arr[this.arr.length - 1].x >= width - m ||
        this.arr[0].x <= 0 + m
      )
        for (let i = 0; i < this.arr.length; i++) this.arr[i].stepDown();
    }
  }

  checkCollision(_x, _y) {
    let collision = false;
    let rem;
    for (let i = 0; i < this.arr.length; i++) {
      let dis = dist(_x, _y, this.arr[i].x, this.arr[i].y);

      if (dis < 25) {
        this.arr[i].die();
        rem = i;
        collision = true;
      }
    }
    if (rem != undefined) this.arr.splice(rem, 1);
    return collision;
  }
}

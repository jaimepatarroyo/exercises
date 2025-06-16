let initS;
let initM;
let initH;

let modifiedMillis;

let t = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  strokeCap(PROJECT);

  initS = second();
  initM = minute();
  initH = hour();

  modifiedMillis = millis();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  let n = noise(t);
  t += 0.001;

  modifiedMillis = millis() * map(n, 0, 1, 0.5, 1.5);

  let sMillis = (modifiedMillis % 60000) + initS * 1000;
  let sDegreesCont = map(sMillis, 0, 60000, 0, 360);

  let mMillis = (millis() % 3600000) + initM * 1000 * 60 + initS * 1000;
  let mDegreesCont = map(mMillis, 0, 3600000, 0, 360);

  let hMillis = millis() % 43200000 + initH * 1000 * 60 * 60 + initM * 1000 * 60 + initS * 1000;
  let hDegreesCont = map(hMillis, 0, 43200000, 0, 360);

  background(0);

  translate(width / 2, height / 2);

  push();
  rotate(hDegreesCont);
  strokeWeight(5);
  stroke(255);
  line(0, 0, 0, -(min(width, height)  / 5));
  pop();

  push();
  rotate(mDegreesCont);
  strokeWeight(3);
  stroke(255);
  line(0, 0, 0, -(min(width, height)  / 4));
  pop();

  push();
  rotate(sDegreesCont);
  strokeWeight(1);
  stroke(255);
  line(0, 0, 0, -(min(width, height)  / 3));
  pop();
  
  push();
  strokeWeight(2);
  stroke(255);
  for (let ticks = 0; ticks < 60; ticks += 1) {
    point(0, -min(width, height)/2*0.80);
    rotate(6);
  }
  pop();
}

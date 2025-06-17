let initH;
let initM;
let initS;

let sPos = 0;
let sVel = 0;
let sAce = 0.50;

let lastSDegreesCont;

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  strokeCap(PROJECT);

  initH = hour();
  initM = minute();
  initS = second();

  lastSDegreesCont = map(millis() % 60000 + initS * 1000, 0, 60000, 0, 360);;
  sPos = lastSDegreesCont;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  background(0);
  
  let hDegreesCont = map(millis() % 43200000 + initH * 1000 * 60 * 60 + initM * 1000 * 60 + initS * 1000, 0, 43200000, 0, 360);
  let mDegreesCont = map(millis() % 3600000 + initM * 1000 * 60 + initS * 1000, 0, 3600000, 0, 360);
  let sDegreesCont = map(millis() % 60000 + initS * 1000, 0, 60000, 0, 360);

  sVel = sDegreesCont - lastSDegreesCont;
  lastSDegreesCont = sDegreesCont;
  
  sAce = random(-0.50, 0.50);
  sVel = sVel + sAce;
  sPos = sPos + sVel;
  
  
  translate(width / 2, height / 2);

  push();
  rotate(hDegreesCont);
  strokeWeight(5);
  stroke(255);
  line(0, 0, 0, -(min(width, height) / 5));
  pop();

  push();
  rotate(mDegreesCont);
  strokeWeight(3);
  stroke(255);
  line(0, 0, 0, -(min(width, height) / 4));
  pop();
  
  push();
  rotate(sPos);
  strokeWeight(1);
  stroke(255);
  line(0, 0, 0, -(min(width, height) / 3));
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

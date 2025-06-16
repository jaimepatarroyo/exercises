
function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  let h = hour();
  let m = minute();
  let s = second();

  let hDegrees = map(h, 0, 12, 0, 360);
  let mDegrees = map(m, 0, 60, 0, 360);
  let sDegrees = map(s, 0, 60, 0, 360);

  background(0);
  
  translate(width / 2, height / 2);
  
  push();
  rotate(hDegrees);
  strokeWeight(5);
  stroke(255);
  line(0, 0, 0, -(min(width, height)/5));
  pop();
  
  push();
  rotate(mDegrees);
  strokeWeight(3);
  stroke(255);
  line(0, 0, 0, -(min(width, height)/4));
  pop();

  push();
  rotate(sDegrees);
  strokeWeight(1);
  stroke(255);
  line(0, 0, 0, -(min(width, height)/3));
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

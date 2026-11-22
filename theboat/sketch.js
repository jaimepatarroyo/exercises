let images = [];
let totalImages = 33;
let currentImage = 0;
let lastSwitch;
let displayTime;

function preload() {
  for (let i = 0; i < totalImages; i++) {
    let filename = "images/IMG_" + nf(i + 1, 5) + ".png";
    images[i] = loadImage(filename);
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  imageMode(CENTER);
  noCursor();

  lastSwitch = millis();
  displayTime = floor(random(100, 501));
}

function draw() {
  background(0);

  if (millis() - lastSwitch >= displayTime) {
    currentImage = (currentImage + 1) % totalImages;
    lastSwitch = millis();
    displayTime = floor(random(100, 501));
  }

  let img = images[currentImage];
  let imgScale = min(width / img.width, height / img.height);
  image(img, width / 2, height / 2, img.width * imgScale, img.height * imgScale);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

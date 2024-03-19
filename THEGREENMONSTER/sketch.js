// let canvas;

// function setup (){
//     canvas = createCanvas(windowWidth, windowHeight);
//     canvas.position(0, 0);
//     canvas.style("z-index", -10);

//     canvas.parent('sketch-holder');

//     background(225);
// }

// function windowResized(){
//     resizeCanvas(windowWidth, windowHeight);
// }

// function draw(){
//     // strokeWeight(0);
//     // fill(random(200, 255), random(200, 255), random(200, 255));
//     // ellipse((mouseX, mouseY), 30, 30);
// }

// function mouseMoved(){
//    drawBubbles(mouseX, mouseY);
//    drawBubbles(mouseX -50, mouseY + 75);

// }


// function drawBubbles(_x, _y){
//     strokeWeight(0);
//     fill(random(200, 255), random(200, 255), random(200, 255));
//     ellipse((_x, _y), 30, 30);


// }





///////YELLOW BUBBLES CODE

let canvas;
let bubbles = [];
let numBubbles = 10; // Change this to adjust the number of bubbles

let minSize = 100;
let maxSize = 500;

function setup() {
    canvas = createCanvas(windowWidth, windowHeight);
        canvas.position(0, 0);
        canvas.style("z-index", -10);

  for (let i = 0; i < numBubbles; i++) {
    let size = random(minSize, maxSize);
    let bubble = new Bubble(random(width), random(height), size);
    bubble.setColor(color(252, 241, 7)); // YELLLLLLOW
    bubbles.push(bubble);
  }
}

function draw() {
  background(0);

  for (let i = 0; i < bubbles.length; i++) {
    bubbles[i].update();
    bubbles[i].display();

    // Check if the bubble has reached its maximum size, then start shrinking it
    if (bubbles[i].getSize() >= maxSize || bubbles[i].getSize() <= minSize) {
      bubbles[i].changeSizeIncrement();
    }
  }
}

class Bubble {
  constructor(x, y, size) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.color = color(255, 102, 156); // Default green color
    this.sizeIncrement = random(1, 10);
  }

  setColor(c) {
    this.color = c;
  }

  getSize() {
    return this.size;
  }

  changeSizeIncrement() {
    this.sizeIncrement *= -1;
  }

  update() {
    // Move the bubble randomly
    this.x += random(-5, 5);
    this.y += random(-5, 5);

    // Adjust the size continuously
    this.size += this.sizeIncrement;

    // Ensure the bubble stays within the canvas
    this.x = constrain(this.x, 0, width);
    this.y = constrain(this.y, 0, height);
  }

  display() {
    fill(this.color);
    noStroke();
    ellipse(this.x, this.y, this.size);
  }
}

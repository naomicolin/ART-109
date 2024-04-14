let bubbles = [];
let numBubbles = 12;
let bubbleColors; // Declare the bubbleColors array

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  // Initialize the bubbleColors array with color objects
  bubbleColors = [
    color(28, 160, 39),   // RGB: 28, 160, 39 (Green)
    color(155, 207, 54),  // RGB: 155, 207, 54 (Greenish Yellow)
    color(255, 102, 156),   // RGB: 30, 181, 69 (Green)
    color(244, 144, 175),     // Red
    // color(0, 255, 0),     // Green
    // color(0, 0, 255),     // Blue
    // color(255, 255, 0)    // Yellow
  ];

  for (let i = 0; i < numBubbles; i++) {
    let x = random(width);
    let y = random(height);
    let radius = random(50, 200); // Random size for each bubble
    let speedX = random(-1, 1);  // Random initial horizontal velocity
    let speedY = random(-1, 1);  // Random initial vertical velocity
    let bubbleColor = bubbleColors[i % bubbleColors.length]; // Select a color from the array

    let bubble = new Bubble(x, y, radius, speedX, speedY, bubbleColor);
    bubbles.push(bubble);
  }
}

function draw() {
  background(0);

  for (let i = 0; i < bubbles.length; i++) {
    let bubble = bubbles[i];
    bubble.update();
    bubble.display();
    bubble.checkCollision(bubbles); // Check for collisions with other bubbles
    bubble.checkEdges(); // Bounce off canvas edges
  }
}

class Bubble {
  constructor(x, y, radius, speedX, speedY, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.speedX = speedX;
    this.speedY = speedY;
    this.color = color;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;
  }

  display() {
    fill(this.color);
    noStroke();
    ellipse(this.x, this.y, this.radius * 2);
  }

  checkCollision(otherBubbles) {
    for (let i = 0; i < otherBubbles.length; i++) {
      let other = otherBubbles[i];
      if (this !== other) {
        let dx = other.x - this.x;
        let dy = other.y - this.y;
        let distance = dist(this.x, this.y, other.x, other.y);
        let minDist = this.radius + other.radius;

        if (distance <= minDist) {
          // Calculate relative velocity
          let relativeVelocityX = other.speedX - this.speedX;
          let relativeVelocityY = other.speedY - this.speedY;
          let dotProduct = (dx * relativeVelocityX) + (dy * relativeVelocityY);

          // Apply collision response
          if (dotProduct > 0) {
            let impulseX = (2 * dotProduct) / (distance * (this.radius + other.radius));
            let impulseY = (2 * dotProduct) / (distance * (this.radius + other.radius));
            this.speedX += impulseX;
            this.speedY += impulseY;
            other.speedX -= impulseX;
            other.speedY -= impulseY;
          }
        }
      }
    }
  }

  checkEdges() {
    if (this.x - this.radius < 0 || this.x + this.radius > width) {
      this.speedX *= -1;
    }
    if (this.y - this.radius < 0 || this.y + this.radius > height) {
      this.speedY *= -1;
    }
  }
}

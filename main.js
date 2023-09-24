let requestAnimationFrame =
  window.requestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.msRequestAnimationFrame;

let cancelAnimationFrame =
  window.cancelAnimationFrame || window.mozCancelAnimationFrame;

let animationFrame;
let canvas = document.getElementById("canvas");
let c = canvas.getContext("2d");

let CIRCLES_SIZE = 100;

canvas.width = 600;
canvas.height = 400;
c.strokeStyle = "#000";

let radius = 25;
let velocity = 1.5;

class Circle {
  constructor(x, y, dx, dy, radius) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
  }

  draw() {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    c.stroke();
    c.fill();
  }

  update() {
    if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
      this.dx = -this.dx;
    }

    if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
      this.dy = -this.dy;
    }

    this.x += this.dx;
    this.y += this.dy;

    this.draw();
  }
}

const circles = [];

for (let i = 0; i < CIRCLES_SIZE; i++) {
  let velocity = Math.max(2, Math.round(Math.random() * 5));
  console.log(velocity);
  let dx = Math.random() > 0.5 ? velocity : -velocity;
  let dy = Math.random() > 0.5 ? velocity : -velocity;
  let x = clamp(Math.random() * canvas.width, radius, canvas.width - radius);
  let y = clamp(Math.random() * canvas.height, radius, canvas.height - radius);

  circles.push(new Circle(x, y, dx, dy, radius));
}

function animate() {
  c.clearRect(0, 0, 600, 400);

  circles.forEach((circle) => {
    circle.update();
  });

  animationFrame = requestAnimationFrame(animate);
}

function clamp(number, min, max) {
  return Math.max(min, Math.min(number, max));
}

animate();

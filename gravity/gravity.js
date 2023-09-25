let requestAnimationFrame =
  window.requestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.msRequestAnimationFrame;

let canvas = document.getElementById("canvas");
let c = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let gravity = 0.5;
let friction = 0.8;
let ball;
const BALLS_SIZE = 350;

const colors = [
  "#E56399",
  "#E3B505",
  "#DE6E4B",
  "#7FD1B9",
  "#7A6563",
  "#3A3042",
  "#DB504A",
];

window.addEventListener("mousedown", () => {
  init();
});

class Ball {
  constructor(x, y, dx, dy, radius) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.minRadius = radius;
    this.color = getRandomColor();
  }

  draw() {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    c.fillStyle = this.color;
    c.fill();
  }

  update() {
    if (this.y + this.radius >= canvas.height) {
      this.dy = -this.dy * friction;
    } else {
      this.dy += gravity;
    }

    if (this.x + this.radius >= canvas.width || this.x - this.radius < 0) {
      this.dx = -this.dx * friction;
    }

    this.y += this.dy;
    this.x += this.dx;
    this.draw();
  }
}

let balls = [];

function animate() {
  c.clearRect(0, 0, window.innerWidth, window.innerHeight);

  balls.forEach((ball) => {
    ball.update();
  });

  requestAnimationFrame(animate);
}

function init() {
  balls = [];
  for (let i = 0; i < BALLS_SIZE; i++) {
    let velocity = Math.max(0.4, Math.random()) + 0.1;
    let radius = Math.random() * 20 + 8;
    let dx = Math.random() > 0.5 ? velocity : -velocity;
    let dy = Math.random() > 0.5 ? velocity : -velocity;
    let x = clamp(Math.random() * canvas.width, radius, canvas.width - radius);
    let y = clamp(
      Math.random() * canvas.height,
      radius,
      canvas.height - radius * 4
    );

    balls.push(new Ball(x, y, dx, dy, radius));
  }
}

function getRandomColor() {
  return colors[Math.floor(Math.random() * colors.length)];
}

function clamp(number, min, max) {
  return Math.max(min, Math.min(number, max));
}

init();
animate();

let requestAnimationFrame =
  window.requestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.msRequestAnimationFrame;

let canvas = document.getElementById("canvas");
let c = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let mouse = {
  x: null,
  y: null,
};
let gravity = 0.5;
let friction = 0.8;
let ball;

window.addEventListener("mousemove", (event) => {
  mouse = {
    x: event.x,
    y: event.y,
  };
});

class Ball {
  constructor(x, y, dx, dy, radius) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.minRadius = radius;
    this.color = "#f00";
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

function animate() {
  c.clearRect(0, 0, window.innerWidth, window.innerHeight);
  ball.update();
  requestAnimationFrame(animate);
}

function init() {
  ball = new Ball(90, canvas.height / 4, 9, 1, 25);
  ball.update();
}

function getRandomColor() {
  return colors[Math.floor(Math.random() * colors.length)];
}

function clamp(number, min, max) {
  return Math.max(min, Math.min(number, max));
}

init();
animate();

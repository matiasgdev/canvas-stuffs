let requestAnimationFrame =
  window.requestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.msRequestAnimationFrame;

let cancelAnimationFrame =
  window.cancelAnimationFrame || window.mozCancelAnimationFrame;

let canvas = document.getElementById("canvas");
let c = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

console.log(canvas.width);

const radius = 30;
const BALLS_SPAWN_SIZE = 70;

let animation;
let balls = [];

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
    this.mass = 1;
  }

  draw() {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    c.strokeStyle = "red";
    c.stroke();
    c.closePath();
  }

  update(balls) {
    balls.forEach((ball) => {
      if (this === ball) return;

      if (isColliding(this, ball)) {
        collide(this, ball);
      }
    });

    if (this.y + this.radius >= canvas.height || this.y - this.radius < 0) {
      this.dy = -this.dy;
    }

    if (this.x + this.radius >= canvas.width || this.x - this.radius < 0) {
      this.dx = -this.dx;
    }

    this.x += this.dx;
    this.y += this.dy;

    this.draw();
  }
}

function animate() {
  animation = requestAnimationFrame(animate);
  c.clearRect(0, 0, window.innerWidth, window.innerHeight);

  balls.forEach((ball) => {
    ball.update(balls);
  });
}

function init() {
  cancelAnimationFrame(animation);
  balls = [];

  for (let i = 0; i < BALLS_SPAWN_SIZE; i++) {
    let velocity = Math.random() * 4 + 1;
    let dx = Math.random() > 0.5 ? velocity : -velocity;
    let dy = Math.random() > 0.5 ? velocity : -velocity;
    let x = clamp(Math.random() * canvas.width, radius, canvas.width - radius);
    let y = clamp(
      Math.random() * canvas.height,
      radius,
      canvas.height - radius * 2
    );

    const ball = new Ball(x, y, dx, dy, radius);

    for (let j = 0; j < balls.length; j++) {
      let currentBall = balls[j];
      if (isColliding(currentBall, ball)) {
        // generates new coordinates position
        ball.x = clamp(
          Math.random() * canvas.width,
          radius,
          canvas.width - radius
        );
        ball.y = clamp(
          Math.random() * canvas.height,
          radius,
          canvas.height - radius * 2
        );
        j = -1;
      }
    }

    balls.push(ball);
  }

  animate();
}

function isColliding(a, b) {
  const xDist = a.x - b.x;
  const yDist = a.y - b.y;
  const distance = Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));

  return distance < a.radius + b.radius;
}

function collide(a, b) {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const distance = Math.sqrt(dx * dx + dy * dy);

  // Normalized collision vector
  const nx = dx / distance;
  const ny = dy / distance;

  // Relative velocity
  const rvx = b.dx - a.dx;
  const rvy = b.dy - a.dy;

  // Impulse along the collision vector
  const impulse =
    ((2 * (a.mass * b.mass)) / (a.mass + b.mass)) * (rvx * nx + rvy * ny);

  // Update velocities
  a.dx += (impulse / a.mass) * nx;
  a.dy += (impulse / a.mass) * ny;
  b.dx -= (impulse / b.mass) * nx;
  b.dy -= (impulse / b.mass) * ny;

  const overlap = a.radius + b.radius - distance;
  const pushX = (overlap / 2) * nx;
  const pushY = (overlap / 2) * ny;
  a.x -= pushX;
  a.y -= pushY;
  b.x += pushX;
  b.y += pushY;
}

function clamp(num, min, max) {
  return Math.max(min, Math.min(num, max));
}

init();

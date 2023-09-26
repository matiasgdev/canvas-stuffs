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

const radius = 30;
const BALLS_SPAWN_SIZE = 70;
const colors = [
  "#E56399",
  "#E3B505",
  "#DE6E4B",
  "#7FD1B9",
  "#7A6563",
  "#3A3042",
  "#DB504A",
];

let animation;
let balls = [];
let cursor = {
  x: null,
  y: null,
};

window.addEventListener("mousedown", () => {
  init();
});

window.addEventListener("mousemove", (event) => {
  cursor = {
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
    this.mass = 1;
    this.color = getRandomColor();
    this.opacity = 0;
  }

  draw() {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    c.save();
    c.globalAlpha = this.opacity;
    c.fillStyle = this.color;
    c.fill();
    c.restore();
    c.strokeStyle = this.color;
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

    if (getDistance(cursor, this) <= 150 && this.opacity <= 0.2) {
      this.opacity += 0.02;
    } else {
      this.opacity -= 0.02;
      this.opacity = Math.max(0, this.opacity);
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
  const distance = getDistance(a, b);
  return distance < a.radius + b.radius;
}

function getDistance(a, b) {
  const xDist = a.x - b.x;
  const yDist = a.y - b.y;
  return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));
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

function getRandomColor() {
  return colors[Math.floor(Math.random() * colors.length)];
}

init();

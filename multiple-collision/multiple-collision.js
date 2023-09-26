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
  }

  draw() {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    c.strokeStyle = "red";
    c.stroke();
    c.closePath();
  }

  update() {
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
    ball.update();
  });
}

function init() {
  cancelAnimationFrame(animation);
  balls = [];

  for (let i = 0; i < 4; i++) {
    let velocity = 2;
    let radius = 150;
    let dx = Math.random() > 0.5 ? velocity : -velocity;
    let dy = Math.random() > 0.5 ? velocity : -velocity;
    let x = clamp(Math.random() * canvas.width, radius, canvas.width - radius);
    let y = clamp(
      Math.random() * canvas.height,
      radius,
      canvas.height - radius
    );
    const ball = new Ball(x, y, dx, dy, radius);

    for (let j = 0; j < balls.length; j++) {
      let currentBall = balls[j];
      if (isColliding(currentBall, ball)) {
        // generates new position
        ball.x = clamp(
          Math.random() * canvas.width,
          radius,
          canvas.width - radius
        );
        ball.y = clamp(
          Math.random() * canvas.height,
          radius,
          canvas.height - radius
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

function clamp(num, min, max) {
  return Math.max(min, Math.min(num, max));
}

init();

let requestAnimationFrame =
  window.requestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.msRequestAnimationFrame;

let cancelAnimationFrame =
  window.cancelAnimationFrame || window.mozCancelAnimationFrame;

let canvas = document.getElementById("canvas");
let c = canvas.getContext("2d");
canvas.width = 600;
canvas.height = 400;

let animation;
let ball1;
let ball2;

window.addEventListener("mousedown", () => {
  init();
});

function isColliding(a, b) {
  const xDist = a.x - b.x;
  const yDist = a.y - b.y;
  const distance = Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));

  return distance < a.radius + b.radius;
}

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

  ball1.update();
  ball2.update();

  if (isColliding(ball1, ball2)) {
    cancelAnimationFrame(animation);
    return;
  }
}

function init() {
  cancelAnimationFrame(animation);
  ball1 = new Ball(300, 30, 0, 4, 30);
  ball2 = new Ball(350, 300, 0, 0, 50);

  animate();
}

init();

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
let ball;
let radius = 15;

let centerX = canvas.width / 2;
let centerY = canvas.height / 2;

class GameObject {
  constructor(x, y, vx, vy) {
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
  }
}

class Circle extends GameObject {
  constructor(x, y, vx, vy, radius, color) {
    super(x, y, vx, vy);
    this.radius = radius;
    this.color = color;
  }

  draw() {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    c.strokeStyle = this.color;
    c.fillStyle = this.color;
    c.fill();
    c.stroke();
  }
}

class Particle extends Circle {
  constructor(x, y, vx, vy, radius, color, distance) {
    super(x, y, vx, vy, radius, color, distance);
    this.distance = distance;
    this.angularVelocity = 0.2;
    this.radians = Math.random() * Math.PI * 2;
  }

  update() {
    this.x = centerX + Math.cos(this.radians) * this.distance;
    this.y = centerY + Math.sin(this.radians) * this.distance;
    this.radians += this.angularVelocity;

    this.draw();
  }
}

function animate() {
  animation = requestAnimationFrame(animate);
  c.clearRect(0, 0, window.innerWidth, window.innerHeight);

  ball.update();
}

function init() {
  cancelAnimationFrame(animation);
  ball = new Particle(centerX, centerY, 0, 4, radius, "pink", 50);

  animate();
}

init();

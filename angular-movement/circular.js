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
let particles;
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
    this.angularVelocity = 0.05;
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
  c.fillStyle = "rgba(255, 255, 255, 0.5)";
  c.clearRect(0, 0, window.innerWidth, window.innerHeight);

  particles.forEach((particle) => {
    particle.update();
  });
}

function init() {
  particles = [];

  for (let i = 0; i < 50; i++) {
    particles.push(
      new Particle(
        centerX,
        centerY,
        0,
        4,
        5,
        "blue",
        randomIntFromInterval(50, 120)
      )
    );
  }

  animate();
}

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

init();

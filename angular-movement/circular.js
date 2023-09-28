let requestAnimationFrame =
  window.requestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.msRequestAnimationFrame;

let canvas = document.getElementById("canvas");
let c = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles;
let radius = 15;

let centerX = canvas.width / 2;
let centerY = canvas.height / 2;

const colors = ["#E3B505", "#DE6E4B", "#DB504A"];

class GameObject {
  constructor(x, y, vx, vy) {
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.lastPoint = {
      x,
      y,
    };
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
    c.fillStyle = this.color;
    c.strokeStyle = this.color;
    c.stroke();
    c.fill();
    c.closePath();
  }
}

class Line extends GameObject {
  constructor(x, y, vx, vy, width, color) {
    super(x, y, vx, vy);
    this.strokeColor = color;
    this.lineWidth = width;
  }

  draw() {
    c.beginPath();
    c.strokeStyle = this.strokeColor;
    c.lineWidth = this.lineWidth;
    c.moveTo(this.lastPoint.x, this.lastPoint.y);
    c.lineTo(this.x, this.y);
    c.stroke();
    c.closePath();
  }
}

class Particle extends Line {
  constructor(x, y, vx, vy, width, color, distance, angularVelocity) {
    super(x, y, vx, vy, width, color, distance);
    this.distance = distance;
    this.angularVelocity = angularVelocity;
    this.radians = Math.random() * Math.PI * 2;
  }

  update() {
    this.lastPoint = {
      x: this.x,
      y: this.y,
    };
    this.x = centerX + Math.cos(this.radians) * this.distance;
    this.y = centerY + Math.sin(this.radians) * this.distance;
    this.radians += this.angularVelocity;

    this.draw();
  }
}

let secondsPassed = 0;
let oldTimeStamp = 0;

function animate(timeStamp) {
  secondsPassed = (timeStamp - oldTimeStamp) / 1000;
  requestAnimationFrame(animate);

  c.fillStyle = "rgba(255, 255, 255, 0.05)";
  c.fillRect(0, 0, window.innerWidth, window.innerHeight);

  particles.forEach((particle) => {
    particle.update(secondsPassed);
  });
}

function init() {
  particles = [];

  for (let i = 0; i < 100; i++) {
    particles.push(
      new Particle(
        centerX,
        centerY,
        0,
        2,
        randomIntFromInterval(1, 3),
        getRandomColor(colors),
        randomIntFromInterval(40, 120),
        0.04
      )
    );
  }

  animate();
}

function getRandomColor(colors) {
  return colors[Math.floor(Math.random() * colors.length)];
}

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

init();

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

canvas.width = 600;
canvas.height = 400;
c.strokeStyle = "#000";

let velocity = 4;
let radius = 40;
let dx = Math.random() > 0.5 ? velocity : -velocity;
let dy = Math.random() > 0.5 ? velocity : -velocity;

let x = clamp(Math.random() * canvas.width, radius, canvas.width - radius);
let y = clamp(Math.random() * canvas.height, radius, canvas.height - radius);

function moveCircle() {
  c.clearRect(0, 0, 600, 400);
  c.beginPath();
  c.arc(x, y, radius, 0, Math.PI * 2);
  c.stroke();

  if (x + radius > canvas.width || x - radius < 0) {
    dx = -dx;
  }

  if (y + radius > canvas.height || y - radius < 0) {
    dy = -dy;
  }

  x += dx;
  y += dy;

  animationFrame = requestAnimationFrame(moveCircle);
}

function clamp(number, min, max) {
  return Math.max(min, Math.min(number, max));
}

moveCircle();

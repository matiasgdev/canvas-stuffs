let canvas = document.getElementById("canvas");
let c = canvas.getContext("2d");

canvas.width = 600;
canvas.height = 400;

c.fillStyle = "rgba(255, 0, 0, 0.5)";

// rectangles
c.fillRect(100, 100, 200, 100);
c.fillRect(400, 140, 200, 100);

// lines
c.strokeStyle = "#f94";
c.beginPath();
c.moveTo(50, 20);
c.lineTo(50, 95);
c.lineTo(100, 20);
c.stroke();

// arcs / circles

// c.strokeStyle = "#000";
// c.beginPath();
// c.arc(200, 350, 40, Math.PI / 2, Math.PI * 2, true);
// c.stroke();

c.strokeStyle = "#000";

for (let i = 0; i < 12; i++) {
  let x = 100 + 100 * i;
  let y = 200;
  c.beginPath();
  c.arc(x, y, 45, 0, Math.PI * 2);
  c.stroke();
}

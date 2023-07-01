const canvas = document.getElementById("gameCanvas");

canvas.style.background = "#ff8";
var window_height = window.innerHeight;
var window_width = window.innerWidth;
canvas.width = window_width;
canvas.height = window_height;

const ctx = canvas.getContext("2d");

class Circle {
  constructor(xpos, ypos, radius, color, text, speed) {
    this.xpos = xpos;
    this.ypos = ypos;
    this.radius = radius;
    this.color = color;
    this.text = text;
    this.speed = speed;

    this.dx = 1 * this.speed;
    this.dy = 1 * this.speed;
  }

  draw(ctx) {
    ctx.beginPath();

    ctx.strokeStyle = this.color;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = "20px Arial";
    ctx.fillText(this.text, this.xpos, this.ypos);

    ctx.lineWidth = 5;
    ctx.arc(this.xpos, this.ypos, this.radius, 0, Math.PI * 2, false);
    ctx.stroke();
    ctx.closePath();
  }

  update() {
    ctx.clearRect(0, 0, window_width, window_height);
    this.draw(ctx);

    if (this.xpos + this.radius > window_width) {
      this.dx = -this.dx;
    }

    if (this.xpos - this.radius < 0) {
      this.dx = -this.dx;
    }

    if (this.ypos + this.radius > window_height) {
      this.dy = -this.dy;
    }
    if (this.ypos - this.radius < 0) {
      this.dy = -this.dy;
    }

    this.xpos += this.dx;
    this.ypos += this.dy;
  }
}

let circle_counter = 1;

let all_circles = [];

let random_x = Math.random() * window_width;
let random_y = Math.random() * window_height;

// let createCircle = function (circle) {
//   circle.draw(ctx);
// };

let my_circle = new Circle(random_x, random_y, 50, "black", circle_counter, 1);
my_circle.draw(ctx);
let updateCircle = function () {
  requestAnimationFrame(updateCircle);
  my_circle.update();
};

updateCircle();
// for (var numbers = 0; numbers < 1; numbers++) {
//   let random_x = Math.random() * window_width;
//   let random_y = Math.random() * window_height;

//   let my_circle = new Circle(
//     random_x,
//     random_y,
//     50,
//     "black",
//     circle_counter,
//     1
//   );
//   all_circles.push(my_circle);
//   createCircle(all_circles[numbers]);
//   circle_counter++;
// }

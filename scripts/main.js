const canvas = document.getElementById("gameCanvas");

var window_height = window.innerHeight;
var window_width = window.innerWidth;
canvas.width = window_width;
canvas.height = window_height;

const ctx = canvas.getContext("2d");

let circle_counter = 1;

let all_circles = [];

let createCircle = function (circle) {
  circle.draw(ctx);
};

let player_circle = new Player(
  window_width / 2,
  window_height / 2,
  50,
  "red",
  "Player",
  0
);

player_circle.draw(ctx);
let vx = 0;
let vy = 0;

let update = function () {
  requestAnimationFrame(update);
  ctx.clearRect(0, 0, window_width, window_height);
  for (circle of all_circles) {
    circle.update();
  }
  player_circle.update(vx, vy);
};

update();
for (var numbers = 0; numbers < 10; numbers++) {
  let random_x = Math.random() * window_width;
  let random_y = Math.random() * window_height;

  let my_circle = new Circle(
    random_x,
    random_y,
    50,
    "black",
    circle_counter,
    1
  );
  all_circles.push(my_circle);
  createCircle(all_circles[numbers]);
  circle_counter++;
}

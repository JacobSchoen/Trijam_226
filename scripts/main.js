const canvas = document.getElementById("gameCanvas");
canvas.style.background = "#bfadaa";
var window_height = document.getElementById("game").clientHeight;
var window_width = document.getElementById("game").clientWidth;
const ctx = canvas.getContext("2d");
canvas.height = window_height;
canvas.width = window_width;
//create input variables
setupInputs();
var upKey;
var rightKey;
var downKey;
var leftKey;

//create sceneId
let sceneID;

//create time score
let score = 1;
let timerId;

//create title screen
scene_intro();
document.addEventListener("click", mouseClickHandler);

function mouseClickHandler() {
  if (sceneID == "intro") {
    Game();
  }
}

//create circles
let all_circles = [];
let vx = 0;
let vy = 0;
let createCircle = function (circle) {
  circle.draw(ctx);
};

//create player
let player_circle = new Player(
  window_width / 2,
  window_height / 2,
  35,
  "blue",
  "Player",
  0
);

var Game = function () {
  scoreTimer();
  sceneID = "game";
  player_circle.draw(ctx);

  //game loop
  let update = function () {
    reqAnim = requestAnimationFrame(update);
    ctx.clearRect(0, 0, window_width, window_height);
    for (circle of all_circles) {
      circle.update();
    }
    player_circle.update();
    if (all_circles.length < 10) {
      populateCircles();
    }
    if (player_circle.health <= 0) {
      cancelAnimationFrame(reqAnim);
      scene_lose();
    }
  };

  update();
};

function populateCircles() {
  for (var numbers = 0; numbers < 15; numbers++) {
    //randomize the random number lol
    let random_x = Math.random() * window_width;
    let random_y = Math.random() * window_height;
    let my_circle = new Circle(random_x, random_y, 30, 1);
    all_circles.push(my_circle);
    createCircle(all_circles[numbers]);
  }
}

function checkIntersection(r1, r2) {
  if (r1.x > r2.x + r2.width) {
    return false;
  } else if (r1.x + r1.width <= r2.x) {
    return false;
  } else if (r1.y >= r2.y + r2.height) {
    return false;
  } else if (r1.y + r1.height <= r2.y) {
    return false;
  } else {
    return true;
  }
}

function destroyCircle(power, sign, index) {
  if (sign === 1) {
    player_circle.health += power;
  } else {
    player_circle.health -= power;
  }
  all_circles.splice(index, 1);
}

function addPower(power, sign) {
  if (sign === 1) {
    player_circle.radius += power;
  } else {
    player_circle.radius -= power;
  }
}

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function scoreTimer() {
  if (score > 0) {
    timerId = setTimeout(scoreTimer, 500);
    score++;
    document.querySelector("#timer").innerHTML = score;
  }
}

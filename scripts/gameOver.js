let highScore = 1;

var scene_lose = function () {
  sceneID = "gameOver";
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "black";
  ctx.font = "35px Grandstander";
  ctx.textAlign = "center";
  ctx.fillText(
    `Better luck next time! Score:${score}`,
    canvas.width / 2,
    canvas.height / 2
  );
  //set HighScore
  if (score > localStorage.getItem("highscore")) {
    localStorage.setItem("highscore", score);
    document.querySelector("#highScore").innerHTML =
      localStorage.getItem("highscore");
  }

  setTimeout(() => {
    document.location.reload();
  }, 2000);
};

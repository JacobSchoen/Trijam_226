var scene_intro = function () {
  sceneID = "intro";

  ctx.fillStyle = "black";
  ctx.font = "35px Grandstander";
  ctx.textAlign = "center";
  ctx.fillText("Math Attack!!!!", window_width / 2, window_height / 2 - 170);
  ctx.fillText(
    "Use W,A,S,D or Arrow keys to move",
    window_width / 2,
    window_height / 2 - 135
  );
  ctx.fillText("Click to start!", window_width / 2, window_height / 2);

  document.querySelector("#highScore").innerHTML =
    localStorage.getItem("highscore");
};

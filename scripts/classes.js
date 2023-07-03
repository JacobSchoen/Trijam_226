class Circle {
  constructor(xpos, ypos, radius, speed) {
    this.xpos = xpos;
    this.ypos = ypos;
    this.radius = radius;
    this.power = randomIntFromInterval(1, 20);
    this.sign = randomIntFromInterval(0, 1);
    this.speed = speed + this.power / 10;
    this.dx = 1 * this.speed;
    this.dy = 1 * this.speed;
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.font = "20px Grandstander";
    if (this.sign === 1) {
      ctx.strokeStyle = "green";
      ctx.fillText("+", this.xpos - 15, this.ypos);
    } else {
      ctx.strokeStyle = "red";
      ctx.fillText("-", this.xpos - 15, this.ypos);
    }
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    ctx.fillText(this.power, this.xpos, this.ypos);

    ctx.lineWidth = 5;
    ctx.arc(this.xpos, this.ypos, this.radius, 0, Math.PI * 2, false);
    ctx.stroke();
    ctx.closePath();
  }

  update() {
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

class Player extends Circle {
  constructor(xpos, ypos, radius, color, text, speed, movement) {
    super(xpos, ypos, radius, speed);
    this.color = color;
    this.text = text;
    this.movement = movement;
    this.active = true;
    this.xspeed = 0;
    this.yspeed = 0;
    this.friction = 0.6;
    this.maxSpeed = 10;
    this.health = 1;
  }

  draw(ctx) {
    ctx.beginPath();

    ctx.strokeStyle = this.color;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = "20px Grandstander";
    ctx.fillText(this.text, this.xpos, this.ypos);
    ctx.fillText(this.health, this.xpos, this.ypos + 20);

    ctx.lineWidth = 5;
    ctx.arc(this.xpos, this.ypos, this.radius, 0, Math.PI * 2, false);
    ctx.stroke();
    ctx.closePath();
  }

  update() {
    this.draw(ctx);

    if ((this.active = true)) {
      //hprizontal Movement
      if ((!leftKey && !rightKey) || (leftKey && rightKey)) {
        //slow down
        this.xspeed *= this.friction;
      } else if (rightKey) {
        //move right
        this.xspeed++;
      } else if (leftKey) {
        //move left
        this.xspeed--;
      }

      //Vertical movement
      if ((!upKey && !downKey) || (upKey && downKey)) {
        //slow down
        this.yspeed *= this.friction;
      } else if (downKey) {
        //move right
        this.yspeed++;
      } else if (upKey) {
        //move left
        this.yspeed--;
      }

      //Correct Speed
      if (this.xspeed > this.maxSpeed) {
        this.xspeed = this.maxSpeed;
      } else if (this.xspeed < -this.maxSpeed) {
        this.xspeed = -this.maxSpeed;
      }
      if (this.yspeed > this.maxSpeed) {
        this.yspeed = this.maxSpeed;
      } else if (this.yspeed < -this.maxSpeed) {
        this.yspeed = -this.maxSpeed;
      }
      if (this.xspeed > 0) {
        this.xspeed = Math.floor(this.xspeed);
      } else {
        this.xspeed = Math.ceil(this.xspeed);
      }
      if (this.yspeed > 0) {
        this.yspeed = Math.floor(this.yspeed);
      } else {
        this.yspeed = Math.ceil(this.yspeed);
      }

      //horizontal collision rect
      let horizontalRect = {
        x: this.xpos + this.xspeed,
        y: this.ypos,
        width: this.radius,
        height: this.radius,
      };

      //check for intersections
      for (let i = 0; i < all_circles.length; i++) {
        let circleRect = {
          x: all_circles[i].xpos,
          y: all_circles[i].ypos,
          width: all_circles[i].radius,
          height: all_circles[i].radius,
        };
        if (checkIntersection(horizontalRect, circleRect)) {
          addPower(all_circles[i].power, all_circles[i].sign);
          destroyCircle(all_circles[i].power, all_circles[i].sign, i);
        }
      }

      this.xpos += this.xspeed;
      this.ypos += this.yspeed;
    }
  }
}

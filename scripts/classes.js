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
        if (this.xpos + this.radius < window_width) {
          //move right
          this.xspeed++;
        } else {
          this.xspeed = 0;
        }
      } else if (leftKey) {
        if (this.xpos - this.radius > 0) {
          //move left
          this.xspeed--;
        } else {
          this.xspeed = 0;
        }
      }

      //Vertical movement
      if ((!upKey && !downKey) || (upKey && downKey)) {
        //slow down
        this.yspeed *= this.friction;
      } else if (downKey) {
        if (this.ypos + this.radius < window_height) {
          //move right
          this.yspeed++;
        } else {
          this.yspeed = 0;
        }
      } else if (upKey) {
        if (this.ypos - this.radius > 0) {
          //move left
          this.yspeed--;
        } else {
          this.yspeed = 0;
        }
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
        if (this.collision(all_circles[i], player_circle)) {
          addPower(all_circles[i].power, all_circles[i].sign);
          destroyCircle(all_circles[i].power, all_circles[i].sign, i);
        }
      }

      this.xpos += this.xspeed;
      this.ypos += this.yspeed;
    }
  }
  collision(circle1, circle2) {
    let radii = circle1.radius + circle2.radius;
    let distance = this.getDistance(circle1, circle2);
    return distance < radii;
  }
  getDistance(circle1, circle2) {
    let a = circle2.ypos - circle1.ypos;
    let b = circle2.xpos - circle1.xpos;
    return Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));
  }
}

class Sprite {
  constructor({ position, imgSrc, scale, speed }) {
    this.position = position;
    this.image = new Image();
    this.image.src = imgSrc;
    this.scale = scale;
    this.speed = speed;
    this.direction = { x: 1 * this.speed, y: 1 * this.speed };
  }

  draw() {
    ctx.drawImage(
      this.image,
      this.position.x,
      this.position.y,
      this.scale,
      this.scale
    );
  }

  update() {
    this.draw();
    if (this.position.x > window_width) {
      this.direction.x = -this.direction.x;
    }

    if (this.position.x < 0) {
      this.direction.x = -this.direction.x;
    }

    if (this.position.y > window_height) {
      this.direction.y = -this.direction.y;
    }
    if (this.position.y < 0) {
      this.direction.y = -this.direction.y;
    }

    this.position.x += this.direction.x;
    this.position.y += this.direction.y;
  }
}

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
    ctx.font = "20px Grandstander";
    ctx.fillText(this.text, this.xpos, this.ypos);

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
    super(xpos, ypos, radius, color, text, speed);
    this.movement = movement;
  }

  update(vx, vy) {
    this.draw(ctx);

    this.xpos += vx;
    this.ypos += vy;
  }
}

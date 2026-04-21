class Player {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.w = CONFIG.spriteSize;
    this.h = CONFIG.spriteSize;
    this.vx = 0;
    this.vy = -5;
    this.sprite = new Image();
    this.sprite.src = "assets/sprites/kangaroo.png";
    this.frame = 0;
  }

  update() {
    this.vy += CONFIG.gravity;
    this.x += this.vx;
    this.y += this.vy;

    if (this.x < 0) this.x = canvas.width;
    if (this.x > canvas.width) this.x = 0;

    this.frame = (this.frame + 1) % 4; // cycle frames
  }

  jump() {
    this.vy = CONFIG.jumpForce;
    playSound("assets/sounds/jump.wav");
  }

  draw() {
    ctx.drawImage(
      this.sprite,
      this.frame * CONFIG.spriteSize, 0,
      CONFIG.spriteSize, CONFIG.spriteSize,
      this.x, this.y, this.w, this.h
    );
  }
}

class Monster {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.w = CONFIG.spriteSize;
    this.h = CONFIG.spriteSize;
    this.vx = Math.random() > 0.5 ? 2 : -2;
    this.sprite = new Image();
    this.sprite.src = "assets/sprites/monster.png";
  }

  update() {
    this.x += this.vx;
    if (this.x < 0 || this.x > canvas.width - this.w) {
      this.vx *= -1;
    }
  }

  draw() {
    ctx.drawImage(this.sprite, this.x, this.y, this.w, this.h);
  }
}

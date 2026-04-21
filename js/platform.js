class Platform {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.w = 80;
    this.h = 10;
  }

  draw() {
    ctx.fillStyle = "#38bdf8";
    ctx.fillRect(this.x, this.y, this.w, this.h);
  }
}

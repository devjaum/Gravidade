class Gravity {
  constructor() {
    this.inputWeight = document.getElementById("inputWeight");
    this.inputGravity = document.getElementById("inputGravity");
    this.body = {
      gravity: 0,
      x: 250,
      y: 250,
      vx: 1,
      vy: 0,
      ax: 0,
      ay: 0,
      weight: 0,
      radius: 10,
      stop: 0,
    };
    this.canvas = document.getElementById("canvas");
    this.ctx = this.canvas.getContext("2d");
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.animation = "";
    this.clicked = "";
    this.holding = false;
    this.click = {
      x: 0,
      y: 0,
    };
    this.inputGravity.addEventListener("keydown", this.inputClick.bind(this));
    this.inputWeight.addEventListener("click", this.inputClick.bind(this));
    this.canvas.addEventListener("mousedown", this.mouseDown.bind(this));
    this.canvas.addEventListener("mousemove", this.mouseMove.bind(this));
    this.canvas.addEventListener("mouseup", this.mouseUp.bind(this));
  }
  mouseMove(e) {
    if (!this.holding) return;
    if (
      e.clientX < this.canvas.offsetLeft + this.body.radius ||
      e.clientX >=
        this.canvas.offsetLeft + this.canvas.width - this.body.radius ||
      e.clientY < this.canvas.offsetTop + this.body.radius ||
      e.clientY >= this.canvas.offsetTop + this.canvas.height - this.body.radius
    ) {
      this.holding = false;
      this.mouseUp(e);
    }
    this.click.x = e.clientX - this.canvas.offsetLeft;
    this.click.y = e.clientY - this.canvas.offsetTop;
  }
  mouseDown(e) {
    this.holding = true;
    this.click.x = e.clientX - this.canvas.offsetLeft;
    this.click.y = e.clientY - this.canvas.offsetTop;
    clearInterval(this.animation);
    this.clicked = setInterval(() => {
      this.updateCanvas(this.click.x, this.click.y);
      this.drawBody(this.click.x, this.click.y);
    }, 1);
  }
  mouseUp(e) {
    this.holding = false;
    this.click.x = e.clientX - this.canvas.offsetLeft;
    this.click.y = e.clientY - this.canvas.offsetTop;
    clearInterval(this.clicked);
    this.canvasClick();
  }
  canvasClick() {
    let inputWeight = document.getElementById("inputWeight").value;
    let inputGravity = document.getElementById("inputGravity").value;
    this.body = {
      gravity: inputGravity,
      x: this.click.x,
      y: this.click.y,
      vx: 1,
      vy: 0,
      ax: 0,
      ay: 0,
      weight: inputWeight,
      radius: 10,
      stop: 0,
    };
    clearInterval(this.animation);
    this.animation = setInterval(() => {
      this.updateAcceleration();
      this.updateBody();
      this.updateCanvas(this.body.x, this.body.y);
    }, 30);
  }
  inputClick() {
    let inputWeight = document.getElementById("inputWeight").value;
    let inputGravity = document.getElementById("inputGravity").value;
    this.body.gravity = inputGravity;
    this.body.vx = 1;
    this.body.vy = 0;
    this.body.ax = 0;
    this.body.ay = 0;
    this.body.weight = inputWeight;
    this.body.radius = 10;
    this.body.stop = 0;
    clearInterval(this.animation);
    this.animation = setInterval(() => {
      this.updateAcceleration();
      this.updateBody();
      this.updateCanvas();
    }, 30);
  }

  drawBody(x, y) {
    this.ctx.beginPath();
    this.ctx.arc(x, y, 10, 0, Math.PI * 2);
    this.ctx.fillStyle = "white";
    this.ctx.fill();
    this.ctx.closePath();
  }
  updateBody() {    
    this.body.vy = this.body.vy + (this.body.weight / this.body.gravity + Number(this.body.ay));
    this.body.y = this.body.y + this.body.vy;
    if (this.body.y + this.body.radius > 500) {
      this.body.y = 500 - this.body.radius;
      this.body.vy =
        (Number(this.body.weight) / Number(this.body.gravity) ) -
        (Number(this.body.vy) - Number(this.body.vy) / Number(this.body.gravity)) - Number(this.body.ay);
      if (this.body.stop > 100) return this.stop();
      this.body.stop += 1;
    }
  }
  updateAcceleration() {
    this.body.ax = 0;
    this.body.ay = this.body.gravity;
  }
  updateCanvas(x, y) {
    this.ctx.clearRect(0, 0, 500, 500);
    this.drawBody(x, y);
  }
  stop() {
    clearInterval(this.animation);
  }
}
const gravity = new Gravity();

class Gravity{
    constructor(){
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
            stop: 0
        }
        this.canvas = document.getElementById("canvas");
        this.ctx = this.canvas.getContext("2d");
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.animation;
        
        this.inputGravity.addEventListener("keydown", this.inputClick.bind(this))
        this.inputWeight.addEventListener("click", this.inputClick.bind(this))
        this.canvas.addEventListener("click", this.canvasClick.bind(this));
    }
    canvasClick(e){
        let inputWeight = document.getElementById("inputWeight").value;
        let inputGravity = document.getElementById("inputGravity").value;
        this.body = {
            gravity: inputGravity,
            x: e.offsetX,
            y: e.offsetY,
            vx: 1,
            vy: 0,
            ax: 0,
            ay: 0,
            weight: inputWeight,
            radius: 10,
            stop: 0
        }
        clearInterval(this.animation)
        this.animation = setInterval(()=>{
            this.updateAcceleration()
            this.updateBody()
            this.updateCanvas()
        },30)
    }
    inputClick(){
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
        clearInterval(this.animation)
        this.animation = setInterval(()=>{
            this.updateAcceleration()
            this.updateBody()
            this.updateCanvas()
        },30)
    }

    drawBody(){
         
        this.ctx.beginPath();
        this.ctx.arc(this.body.x, this.body.y, 10, 0, Math.PI * 2);
        this.ctx.fillStyle = "white";
        this.ctx.fill();
        this.ctx.closePath();

    }
    updateBody(){
        this.body.ay = this.body.ay - this.body.gravity;
        this.body.vy = ((this.body.vy) + (this.body.weight/this.body.gravity));
        this.body.y = this.body.y + this.body.vy;
        
        
        if((this.body.y + this.body.radius) > 500){
            this.body.y = 500 - this.body.radius;
            this.body.vy = (this.body.weight/this.body.gravity) - (this.body.vy - this.body.vy/this.body.gravity);
            if(this.body.stop > 10) return this.stop();
            this.body.stop += 1;
        }
    }
    updateAcceleration(){
        this.body.ax = 0;
        this.body.ay = this.body.gravity;
    }
    updateCanvas(){
        this.ctx.clearRect(0,0,500,500);
        this.drawBody();
    }
    stop(){
        clearInterval(this.animation)
    }
}
const gravity = new Gravity(); 
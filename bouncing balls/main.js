// setup canvas

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;

const  mouseCoords = {
  x:0,
  y:0,
}
// function to generate random number

function random(min, max) {
  const num = Math.floor(Math.random() * (max - min + 1)) + min;
  return num;
}

// function to generate random color

function randomRGB() {
  return `rgb(${random(0, 255)},${random(0, 255)},${random(0, 255)})`;
}

class Ball {
    constructor ({x, y}, {velX, velY}, color, size) {
        this.x=x;
        this.y=y;
        this.velX=velX;
        this.velY=velY;
        this.color=color;
        this.size=size;
    }
    draw () {
        ctx.beginPath();
        ctx.fillStyle=this.color;
        ctx.arc(this.x,this.y,this.size,0,2*Math.PI)
        ctx.fill();

        ctx.beginPath()
        ctx.save()
        ctx.translate(this.x,this.y)
        ctx.rotate(90 * Math.PI/180)
        ctx.strokeRect(0,0,this.size,this.size)
        ctx.stroke()
        ctx.restore()
    }
    update (){
      if (this.x >= width || this.x<=0) {
        this.velX=-(this.velX)
      }
      if(this.y >= height || this.y<=0) {
        this.velY=-(this.velY)
      }

      this.x=this.x + this.velX;
      this.y=this.y + this.velY;
    }
    collision (){
    for (const ball of balls) {
      if (this!== ball) {
        let dx= ball.x- this.x
        let dy=ball.y-this.y;
        let distance = Math.sqrt((dx*dx + dy*dy))
        if (distance <= this.size*2) {
          this.velX=(-this.velX)
          this.velY=(-this.velY)
        }
      }
    }  
    }
    hover (){
      if (mouseCoords.x>=this.x - this.size && mouseCoords.x<=this.x+this.size) {
        if (mouseCoords.y>=this.y - this.size && mouseCoords.y<=this.y+this.size){
          
          this.color='red';
        }
      }
    }
}

let balls=[];

function populate(){
  balls=[];
  while (balls.length <7) {
    const coords={} 
    coords.x= random(0,width)
    coords.y= random(0,height)
    
    const speed={};
    speed.velX=5;
    speed.velY=5;
    
    const ball = new Ball(coords,speed,randomRGB(), 50)
    balls.push(ball)
  }
}
  
let animationID;

function animate (){
//  ctx.clearRect(0,0,width,height)
  balls.forEach((ball)=>{
    ball.update()
    ball.collision()
    ball.hover()
    ball.draw()
  })
  animationID= requestAnimationFrame(animate)
}
populate()
animate()
// function animate2 () {
//   console.log('Im being animated too')
//   requestAnimationFrame(animate2)
// }
// animate2();

window.addEventListener('mousemove', (e)=> {
  mouseCoords.x=e.clientX,
  mouseCoords.y= e.clientY
})

window.addEventListener('resize', ()=>{
  cancelAnimationFrame(animationID)
  width=canvas.width=window.innerWidth;
  height=canvas.height=window.innerHeight
  populate()
  animate()
})
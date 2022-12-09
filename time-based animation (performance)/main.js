const canvas=document.querySelector('canvas')
canvas.width= window.innerWidth;
canvas.height=window.innerHeight;

const c=canvas.getContext('2d');
const size=150

c.beginPath();
c.fillStyle='red'
c.lineWidth=10
c.arc(size+10,size+10,size,0*Math.PI/180,360*Math.PI/180, false)
c.stroke()

c.beginPath();
c.translate(size+10,size+10)
c.rotate(-180*Math.PI/180)
c.fillRect(0,0,6,size-5);

const pointer = {
    degrees:0,
    speed:36,
    now:Date.now(),
    then:Date.now(),
    delta:0,
    time(){
        this.now=Date.now();
        this.delta= (this.now-this.then)/1000;
        this.then=this.now
    },
    update(){
        if (this.degrees===360) {
            this.degrees=0;
            this.degrees+=this.speed * this.delta
        } else {
            this.degrees+=this.speed * this.delta
        }
    },
    render(){
        c.save()
        c.beginPath();
        c.rotate(this.degrees*Math.PI/180)
        c.fillRect(0,0,6,size-5);
        c.restore()
    },
    clear(){
        c.save()
        c.rotate(this.degrees*Math.PI/180)
        c.clearRect(0,0,16,size-5);
        c.restore()
    }
}

setInterval(()=>{
    console.log('10 seconds have passed')
},10000)
function loop () {
    pointer.time()
    pointer.clear()
    pointer.update()
    pointer.render()
    requestAnimationFrame(loop)
}

loop();



const canvas=document.getElementById('canvas')
canvas.width=window.innerWidth;
canvas.height=window.innerHeight;
let c =canvas.getContext('2d');
let image=document.createElement('img');
let frame=document.createElement('img')
image.src="imgs/bruce lee.jpg";
image.addEventListener('load', ()=>{
    c.drawImage(image,74,76,328-74,421-72)
    
    frame.src="imgs/old-wooden-frame.png"
    //x,y,width and height are always the end args
    // slice starts at the second. sliceX start, sliceYstart, sliceXWIDTH <--, sliceYHEIGHT <---
})

frame.addEventListener('load',()=>{
    c.drawImage(frame,397,322,2667-397,3228-322,0,0,400,500)
})
window.onload=window.addEventListener('click', (e)=>{
    console.log(e.clientX,e.clientY)
})

//create a class that has this.x, this.y, checks and fits for width/height of canvas/frames, and create an array of those
//for each element of this array, draw a frame after load. Biggest problem is size variables...
const menu = document.querySelector('.menu');
let a = menu.querySelectorAll('a');

a.forEach((item) => { item.innerHTML= `<span>${item.innerHTML}</span>`; });

a.forEach((item,index) => {
    let num1 = Math.floor(Math.random() * 61 + 20);
    let num2 = Math.floor(Math.random() * 61 + 20);
    let num3 = Math.floor(Math.random() * 61 + 20);
    let num4 = Math.floor(Math.random() * 61 + 20);
    //67% 33% 69% 31% / 65% 44% 56% 35%

    
    item.style.backgroundImage = ["linear-gradient(60deg, #264653, #527685 )",
    "linear-gradient(60deg, #2a9d8f, #69d5c8 )",
    "linear-gradient(60deg, #e9c46a, #ffe4a1 )",
    "linear-gradient(60deg, #f4a261, #ffc89c )",
    "linear-gradient(60deg, #e76f51, #ffa58f )"][index+1];


    /*item.style.backgroundImage = ["linear-gradient(60deg, #264653, #527685 )","linear-gradient(60deg, #d34646, #ffa2a2 )",
    "linear-gradient(60deg, #e9d66a, #fff09c )",
    "linear-gradient(60deg, #3947c0, #626edf )",
    "linear-gradient(60deg, #46b95f, #7ce793 )"][index+1];*/

    item.style.setProperty('--br', `${num1}% ${100-num1}% ${num2}% ${100-num2}% / ${num3}% ${num4}% ${100-num4}% ${100-num3}%`);

    item.addEventListener('mousemove', (e)=>{
        
        console.log((e.currentTarget.offsetLeft+e.currentTarget.offsetWidth/2-e.clientX)/e.currentTarget.getBoundingClientRect().width);

        
    })

    item.addEventListener('mouseleave', (e) => {
    
        blobs.push(new Blob(e.clientX, e.clientY, 50, ["#527685",
        "#69d5c8",
        "#ffe4a1",
        "#ffc89c",
        "#ffa58f"][index+1], -(e.target.offsetLeft+e.target.offsetWidth/2.0-e.clientX)/20.0, -(e.target.offsetTop+e.target.offsetHeight/2.0-e.clientY)/10.0));
    
    });
}
);

document.querySelector('#canvas').width=window.innerWidth;
document.querySelector('#canvas').height=window.innerHeight;
const ctx = document.querySelector('#canvas').getContext('2d');

let blobs = [];

// random color function
function randomColor() {
    return `hsl(${Math.random() * 360}, 100%, 50%)`;
}





class Blob {
    constructor(x, y, r, color, vx=0, vy=0) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.color = color;
        this.vy = vy + 300/1000;
        this.vx = vx + 0;
        this.g = 3000/100;
        this.bouncy = 0.8;
        this.debounceX = true;
        this.debounceY = true;
    }
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
    simulate() {
        if(this.y<window.innerHeight-this.r/2.0) 
            this.vy += (this.g/1000) * deltaTime;
        else{
            this.vy=0;
            this.vx *= 0.98
        }

        this.x += this.vx;
        this.y += this.vy;

        if(this.y > window.innerHeight - this.r && this.debounceY) {
            this.vy *= -this.bouncy;  
            this.debounceY = false;
        }

        if((this.x > window.innerWidth || this.x < 0) && this.debounceX) {
            this.vx *= -this.bouncy;
            this.debounceX = false;
        }
    
        if(this.x > this.r && this.x < window.innerWidth - this.r) {
            this.debounceX=true;
        }
        if(this.y < window.innerHeight - this.r) {
            this.debounceY=true;
        }
        
        // if(Math.abs(this.vy) < 100/1000) {
        //     this.vy = 0;
        // }
    }
}

blobs.push(new Blob(100, 100, 50, randomColor()));


//canvas animation loop with deltatime
let lastTime = 0;
let deltaTime = 0;
function animate() {
    document.querySelector('#canvas').width=window.innerWidth;
document.querySelector('#canvas').height=window.innerHeight;
    time = performance.now();
    deltaTime = time - lastTime;
    lastTime = time;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    blobs.forEach((blob) => {
        blob.draw();
        blob.simulate();
    });
    requestAnimationFrame(animate);
}
animate();



// range input handler
const range = document.querySelector('#sliderblur');
    range.addEventListener('input', (e) => {
        document.querySelector('#fancy-goo').querySelector('feGaussianBlur').setAttribute('stdDeviation',e.target.value);
});

const range2 = document.querySelector('#slidercontrast');
const range3 = document.querySelector('#sliderbrightness');

    range2.addEventListener('input', (e) => {
        document.querySelector('#fancy-goo').querySelector('feColorMatrix').setAttribute('values',`1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 ${e.target.value} ${range3.value}`)
});

range3.addEventListener('input', (e) => {
    document.querySelector('#fancy-goo').querySelector('feColorMatrix').setAttribute('values',`1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 ${range2.value} ${e.target.value}`)
});

setInterval(() => {
    blobs.shift();
}, 10000);

const img2 = document.querySelector('#img2')

document.body.addEventListener('mousemove',(e)=>{
[img2.style.left,img2.style.top] = [(-((window.innerWidth/2.0)-e.clientX)/(window.innerWidth/28.0))+"px", (-((window.innerHeight/2.0)-e.clientY)/(window.innerHeight/18.0))+"px"];
console.log([img2.style.left,img2.style.top] = [(window.innerWidth/2.0)-e.clientX, (window.innerHeight/2.0)-e.clientY])
})
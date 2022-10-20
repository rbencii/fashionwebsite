const menu = document.querySelector('.menu');
let a = menu.querySelectorAll('a');

a.forEach((item) => { item.innerHTML= `<span>${item.innerHTML}</span>`; item.style.opacity="1" ; });

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
    item.style.setProperty('--br', `${num1}% ${100-num1}% ${num2}% ${100-num2}% / ${num3}% ${num4}% ${100-num4}% ${100-num3}%`);
    charming(item.querySelector('span'));
}
);


let t1 = anime.timeline({loop: false})
  .add({
    targets: '.menu',
    backgroundSize: '3% 96.5%',
    duration: 1000,
    easing: "easeOutExpo",
    delay: 500
  }).add({
    targets: '.menu a',
    opacity: 1,
    duration: 200,
  }).add({
    targets: '.menu a span span',
    translateY: ["3em", 0],
    translateX: ["0.55em", 0],
    translateZ: 0,
    opacity: 1,
    rotateZ: [180, 0],
    duration: 750,
    easing: "easeOutExpo",
    delay: (el, i) => 100 * i
  })

  anime.timeline({loop: false}).add({
    targets: '.menu a',
    backgroundSize: '50% 15%',//['0% 15%','50% 15%'],
    easing: 'easeInExpo',
    delay: anime.stagger(500, {start: 1500} )
  })
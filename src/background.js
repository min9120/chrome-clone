const body = document.querySelector('body');
const IMG_NUM = 6;

function paintBackground(num){
    const image = new Image();
    image.src = `../res/img/${num+1}.jpeg`;
    image.classList.add('backgroundImg');
    body.prepend(image);
}
function genRandom(){
    const number = Math.floor(Math.random()*IMG_NUM);
    //Math.floor 버림 Math.ceiling 올림

    
    return number;
}

function init(){
    const randomNumber = genRandom();
    paintBackground(randomNumber);
  
}
init();
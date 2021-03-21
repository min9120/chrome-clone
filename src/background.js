const body = document.querySelector('body');
const IMG_NUM = 7;


function paintBackground(num){
    const image = new Image();
    const pickedImg = `../res/img/${num+1}.jpeg`;
    image.src = pickedImg
    image.classList.add('backgroundImg');
   
    body.prepend(image);
}
function getRandom(){
    const number = Math.floor(Math.random()*IMG_NUM);
    //Math.floor 버림 Math.ceiling 올림

    
    return number;
}

function init(){
    const randomNumber = getRandom();
    paintBackground(randomNumber);
  
}
init();
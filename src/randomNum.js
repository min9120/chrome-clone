const randomDiv = document.querySelector('.js-random'),
rangeTitle = randomDiv.querySelector('h2'),
sliderForm = document.querySelector('.js-sliderContainer'),
slider = document.querySelector('.sliderInput'),
guessInput = document.querySelector('.guessInput'),
playBtn= sliderForm.querySelector('button'),
resultDiv = document.querySelector('.result'),
resultText =resultDiv.querySelector('p'),
resultTitle = resultDiv.querySelector('h3');

let MAX = slider.value;
let RANDOM = 0;
let GUESS;

function createRandom(max){
    RANDOM = Math.floor(Math.random()*max);
    console.log(RANDOM);
}
function sliderHandler(event){
    event.preventDefault();
    const currentValue = slider.value;

    console.log(`currentValue : ${currentValue}`)
    rangeTitle.innerText = `Generate a number between 0 and ${currentValue}`;
    MAX = currentValue;
  
}

function playHandler(event){
    createRandom(MAX);
    event.preventDefault();
    resultDiv.classList.remove('block');
    resultDiv.classList.add('showing');
    const currentGuess = guessInput.value;
    GUESS = parseInt(currentGuess);

    resultText.innerText= `you chose : ${GUESS}, the machine chose : ${RANDOM}`;
    resultTitle.innerText = `YOU ${GUESS===RANDOM? 'WON!! 👑':'LOST ☠️'}`;
    console.log(`guess : ${GUESS} random : ${RANDOM} `);

    
}

function init(){
    rangeTitle.innerText = `Generate a number between 0 and ${slider.value}`;
    slider.addEventListener('input',sliderHandler);
    playBtn.addEventListener('click', playHandler);
   

 
}

init();

//sliger value 바뀌면 rangeTitle 내용 입력 
//플레이 버튼 누르면 숫자랑 랜덤 숫자랑 비교해서 페인팅!  
//setInterval(function, 1000);-> realtime;
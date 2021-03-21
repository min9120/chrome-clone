 
 const clock = document.querySelector('.js-clock'),
 hour =clock.querySelector('.hour'),
 min = clock.querySelector('.min');

 
 
 
 
function getTime(){
    const today = new Date();

    const H = today.getHours();
    const M = today.getMinutes();
    const S = today.getSeconds();

    hour.innerHTML = `${H>9 ? H : `0${H}`}`;
    min.innerHTML = `${M>9 ? M : `0${M}`}`;
    

} 
 
 function init(){
    getTime()
    setInterval(getTime,1000)
 }
 init();
const form = document.querySelector(".js-form"),
  input = form.querySelector("input"),
  gretting = document.querySelector(".js-gretting");

const USER_LS = "currentUser";

function printText() {
  const day = new Date();
  const H = day.getHours();
  if (5 < H && H < 12) {
    return "Good Morning";
  } else if (H >= 12 && H < 18) {
    return "Good Afternoon";
  } else return "Good Night";
}
function paintGretting(text) {
  const grettingText = printText();
  form.classList.remove("showing");
  gretting.classList.add("showing");
  gretting.innerText = `${grettingText} ${text}`;
}
function saveName(text) {
  localStorage.setItem(USER_LS, text);
}
function submitHandler(event) {
  event.preventDefault();
  //defalut event를 막는 1단계
  const currentValue = input.value;
  console.log(currentValue);
  paintGretting(currentValue);
  saveName(currentValue);
}

function askForName() {
  form.classList.add("showing");
  form.addEventListener("submit", submitHandler);
}

function loadName() {
  const currentUser = localStorage.getItem(USER_LS);
  console.log(`${currentUser} is name`);
  if (currentUser === null) {
    askForName();
  } else {
    paintGretting(currentUser);
  }
}

function init() {
  loadName();
}
init();

const placeContainer = document.querySelector(".js-place");

const IC_PLACE = "res/img/ic-place.png";
API_KEY = "0ead1934c40da819bfd7ccac074a518c";
const COORDS = "coords";

function drawPlace(place, temperature) {
  const img = new Image();
  const location = document.createElement("span");
  const weather = document.createElement("span");
  img.src = IC_PLACE;
  img.classList.add("ic-place");
  weather.innerHTML = `${temperature}°C`;
  location.innerHTML = place;
  placeContainer.appendChild(img);
  placeContainer.appendChild(location);
  placeContainer.appendChild(weather);
}

function getWeather(lat, lng) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
  )
    .then(function (response) {
      return response.json();
    }) //데이터가 완전히 들어온 다음 호출하는 것
    .then(function (json) {
      const temperature = json.main.temp;
      const place = json.name;

      drawPlace(place, temperature);
    }); //데이터가 완전히 들어온 다음 호출하는 것
}
function saveCoords(coordsObj) {
  localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSucces(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const coordsObj = {
    latitude,
    longitude,
  };
  saveCoords(coordsObj);
  getWeather(latitude, longitude);
  // latitude : latitude ->같을 때는 하나로 쓸 수 있음
}
function handleGeoError() {
  console.log("error");
}
function askForCoords() {
  navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoError);
}

function loadCoords() {
  const loadCoords = localStorage.getItem(COORDS);
  if (loadCoords === null) {
    askForCoords();
  } else {
    const parseCoords = JSON.parse(loadCoords);
    getWeather(parseCoords.latitude, parseCoords.longitude);
  }
}
function init() {
  loadCoords();
}
init();

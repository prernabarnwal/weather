const api = {
  key: "fcc8de7015bbb202209bbf0261babf4c",
  base: "https://api.openweathermap.org/data/2.5/"
}
const search = document.querySelector('.search');
// let pic1 = document.querySelector(".pic1");
let wimg=document.querySelector(".img2");
const searchbtn = document.querySelector(".search-icon");

searchbtn.addEventListener("click", () => {
  checkWeather(search.value);
});
// search.addEventListener("keypress",checkWeather(search.value));
checkWeather();
async function checkWeather(query) {
  const p =await fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
    if(p.status==`404`){
      console.log("error!");
      document.querySelector(".error").style.display="inline";
      document.querySelector("main").style.display = "none";
    }
    else{
      var weather=await p.json();
      console.log(weather)
      document.querySelector(".error").style.display = "none";
  let city = document.querySelector('.location .city');
  city.innerText = `${weather.name}, ${weather.sys.country}`;
  let now = new Date();
  let date = document.querySelector('.location .date');
  date.innerText = date1(now);
  let temp = document.querySelector('.current .temp');
  temp.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`;
  let weather_el = document.querySelector('.current .weather');
  weather_el.innerText = weather.weather[0].main;
  let sp = document.querySelector('.speed');
  sp.innerHTML = `<b>Wind Speed: </b>${(weather.wind.speed)}`;
  let pr = document.querySelector('.pressure');
  pr.innerHTML = `<b>Pressure:</b> ${(weather.main.pressure)}`;
  let cont = document.querySelector('.country');
  cont.innerHTML = `<b>Country:</b> ${(weather.sys.country)}`;
  let sunr = document.querySelector('.sunrise');
  // main.humidity sys.country
  sunr.innerHTML =`<b>Sunrise:</b> ${(weather.sys.sunrise)}`;
  let sunt = document.querySelector('.sunset');
  sunt.innerHTML = `<b>Sunset:</b> ${(weather.sys.sunset)}`;
  let humidity = document.querySelector('.humid');
  humidity.innerHTML =`<b>Humidity:</b> ${(weather.main.humidity)}`;
  
  let hilow = document.querySelector('.hi-low');
  hilow.innerHTML = `<b>High:</b> ${Math.round(weather.main.temp_min)}°c <b>Low:</b> ${Math.round(weather.main.temp_max)}°c`;
  localStorage.setItem(query,weather);
  switch(weather.weather[0].main){
        case 'Clouds':
          document.body.style.backgroundImage="url('clouds.webp')";
        break;
        case 'Clear':
          document.body.style.backgroundImage="url('clear.jpg')";
        break;
        case 'Drizzle':
          document.body.style.backgroundImage="url('drizzle.jpg')";
          // wimg.src="drizzle.jpg";
          break;
        case 'Haze':
          document.body.style.backgroundImage="url('haze.jpg')";
        // wimg.src="haze.jpg";
        break;
        case 'Mist':
          document.body.style.backgroundImage="url('mist.jpg')";
        // wimg.src="mist.jpg";
        break;
        case 'Rain':
          document.body.style.backgroundImage="url('rain.jpg')";
        // wimg.src="rain.jpg";
        break;
        case 'Snow':
          document.body.style.backgroundImage="url('snow.jpg')";
        // wimg.src="snow.jpg";
        break;
  }
}
}

function date1(d) {
  let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();
  return `${day} ${date} ${month} ${year}`;
}
if(localStorage.length>5)
  localStorage.clear();
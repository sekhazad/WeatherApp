const api={
     Key :"ebb41766cc5f56960d7c4ec71d95dae5",
     baseurl :"http://api.openweathermap.org/data/2.5/"
}
const KELVIN=273;

const searchbox=document.querySelector('.search-box');
searchbox.addEventListener('keypress',setQuery);

function setQuery(evt){
    if(evt.keyCode==13){
        getResults(searchbox.value)
    }
}

function getResults(query){
fetch(`${api.baseurl}weather?q=${query}&units=metrics&APPID=${api.Key}`)
.then(weather=>{
    return weather.json();
}).then(displayResult)
}

function displayResult(weather){
    //console.log(weather)
    let city=document.querySelector('.location .city');
    city.innerHTML=`${weather.name},${weather.sys.country}`;

    let now=new Date();
    let date=document.querySelector(`.location .date`);
    date.innerHTML=dateBuilder(now);

    let temp=document.querySelector('.current .temp');
    temp.innerHTML=`${Math.floor(weather.main.temp-KELVIN)}<span>&#8451;</span>`;

    let weather_el=document.querySelector('.current .weather');
    weather_el.innerHTML=weather.weather[0].main;

    let hilow=document.querySelector('.hi-low');
    hilow.innerHTML=`${Math.floor(weather.main.temp_min-KELVIN)}<span>&#8451;</span>/
    ${Math.floor(weather.main.temp_max-KELVIN)}<span>&#8451;</span>`;
}

function dateBuilder(d){
    let months=["January" ,"February","March","April","May","June","July","August",
"September","October","November","December"];
let days=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

let day=days[d.getDay()];
let date=d.getDate();
let month=months[d.getMonth()];
let year=d.getFullYear();

return `${day} ${date} ${month} ${year}`;
}


const api = {
    key: "28559ee5619bcd19e9547a6283c2a4ec",
    baseurl: "https://api.openweathermap.org/data/2.5/"
}

const searchBox = document.querySelector(".search-box");
searchBox.addEventListener("keypress", setQuery);

function setQuery(evt){
    if(evt.keyCode == 13){
       getResults(searchBox.value);
        console.log(searchBox.value);
    }
}

function getResults(query){
    fetch(`${api.baseurl}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then(weather => {
        return weather.json();
    }).then(displayResults);
}

function displayResults (weather) {
 
    let city = document.querySelector(".location .city");
    city.innerText  = `${weather.name}, ${weather.sys.country}`;

    let now = new Date();
    let date = document.querySelector(".location .date");
    date.innerText = dateBuilder(now);

    let temp = document.querySelector(".current .temp");
    temp.innerHTML = `${Math.round(weather.main.temp)}<span> C</span>`;

    let weather_el = document.querySelector(".current .weather");
    weather_el.innerText = weather.weather[0].main;

    let hilo = document.querySelector(".current .hi-low");
    hilo.innerText = `${weather.main.temp_min} C  / ${weather.main.temp_max} C`;

    let newTemp = Math.round(weather.main.temp);
    if(newTemp <= 15){
        document.body.style.backgroundImage = "url('winter.jpg')";
    }
    else if(newTemp <= 40){
       document.body.style.backgroundImage = "url('summer.jpg')";
    }
    else if(newTemp <= 0){
        document.body.style.background = "linear-gradient(rgb(47, 150, 163), rgb(48, 62, 143))";
        document.body.style.backgroundImage = "none";
    }
    else {
        document.body.style.background = "linear-gradient(rgb(47, 150, 163), rgb(48, 62, 143))";
        document.body.style.backgroundImage = 'none';
    }
}

function dateBuilder (d) {
    let months = ["January", "Febuary", "March", "April", "May", "June", "July", "August", "September", "Octomber",
                    "November", "December"];
    let days  = ["Monday" , "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
}
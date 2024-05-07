
const container = document.querySelector(".container");
const search = document.querySelector(".search-box button");
 const weatherBox = document.querySelector(".weather-box");
 const weatherDetails = document.querySelector(".weather-details");
 const error404= document.querySelector(".not-found");
 const humidityInfo = document.querySelector(".humidity");
 
   
 search.addEventListener("click", () => {
     const APIKey = 'b114a049d8ebbf991068c4f0076370e7';
     const city= document.querySelector('.search-box input').value;

    if(city == '')
    return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
    .then(response => response.json())
    .then(data => {

    if (data.cod =='404') {
        container.style.height = "400px" ;
        weatherBox.classList.remove("active");
        weatherDetails.classList.remove("active");
        error404.classList.add("active");
        humidityInfo.style.display = "none"; // Hide humidity info
        windInfo.style.display = "none"; // Hide wind info

        return;
    }

    container.style.height = "555px";
    container.classList.add("active");
    weatherBox.classList.add("active");
    weatherDetails.classList.add("active");
    error404.classList.remove("active");
    
    const image =  document.querySelector(".weather-box img");
    const temperature =  document.querySelector(".weather-box .temperature");
    const description =  document.querySelector(".weather-box .description");
    const humidity =  document.querySelector(".weather-details .humidity span");
    const wind =  document.querySelector(".weather-details .wind span");

    
        

    switch(data.weather[0].main) {
        case "Clear":
            image.src="images/clear.png";
            break;

            case "Rain":
                image.src= "images/rain.png";
                break;

                case "Snow":
                    image.src= "images/snow.png";
                    break;
    

                case "Clouds":
                    image.src="images/cloud.png";
                    break;
                    
                case "Mist":
                    image.src="images/mist.png";
                    break;

                    case "Haze":
                        image.src="images/mist.png";
                        break;
    
                
                    
    }

    temperature.innerHTML = `${parseInt(data.main.temp)}<span>°C</span>`;
    description.innerHTML = `${data.weather[0].description}`;
    humidity.innerHTML = `${data.main.humidity}%`;
    humidityInfo.style.display = "block";
   

  
   const infoWeather=document.querySelector(".info-weather");
   const infoHumidity=document.querySelector(".info-humidity");
   
   const elCloneInfoWeather = infoWeather.cloneNode(true);
   const elCloneInfoHumidity = infoHumidity.cloneNode(true);
   

   elCloneInfoWeather.id = "clone-info-weather"(true);
    elCloneInfoWeather.classList.add("active-clone");

    elCloneInfoHumidity.id = "clone-info-humidity"(true);
    elCloneInfoHumidity.classList.add("active-clone");


   

    setTimeout(()  => {
        infoWeather.insertAdjacentElement("afterend", elCloneInfoWeather);
        infoHumidity.insertAdjacentElement("afterend", elCloneInfoHumidity);
        }, 2200);

    const cloneInfoWeather = document.querySelectorAll(".info-weather.active-clone");
    const totalCloneInfoWeather = cloneInfoWeather.length;
    const cloneInfoWeatherFirst = cloneInfoWeather[0];

    const cloneInfoHumidity = document.querySelectorAll(".info-humidity.active-clone");
    const cloneInfoHumidityFirst = cloneInfoHumidity[0];

    

   if(totalCloneInfoWeather > 0) {
    cloneInfoWeatherFirst.classList.remove("active-clone");
    cloneInfoHumidityFirst.classList.remove("active-clone");
     
     setTimeout(()  =>  {
        cloneInfoWeatherFirst.remove();
        cloneInfoHumidityFirst.remove();
     }, 2200);
        
    }
  })
   .catch(error => {
    console.error('Error fetching weather data:', error);

 });

});

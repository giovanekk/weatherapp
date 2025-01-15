async function fetchInfo(){
    let searchIn = document.getElementById("flocation").value;
    const weatherDataSection = document.getElementById("weather-data");
    const api_key = //place API key
    document.getElementById("weather-data").style = "display: block"
    if(searchIn == ''){
        weatherDataSection.innerHTML = "<div> <p>No Input</p> <p>Please select valid <b>city name</b>.</p> </div>";
        return;
    }
    async function getCoordinates(){
        const country_code = document.getElementById("fCC").value;
        const geocodeURL = `https://api.openweathermap.org/geo/1.0/direct?q=${searchIn.replace(" ", "%20")},${country_code}&limit=1&appid=${api_key}`
        const response = await fetch(geocodeURL)
        if(!response.ok){
            console.log("Bad response " + response.status)
        }
        
        const data = await response.json();
        
        if (data.length == 0) {
            console.log("Invalid.");
            weatherDataSection.innerHTML = `
            <div>
              <h2>Invalid Input: "${searchIn}"</h2>
              <p>Please try again with a valid <u>city name</u>.</p>
            </div>
            `;
            return;
          } else {
            return data[0];
          }
    }
    async function getData(lon,lat){
        const weatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}`;
        const response = await fetch(weatherURL);
        if (!response.ok) {
        console.log("Bad response! ", response.status);
        return;
        }

        const data = await response.json();

        weatherDataSection.innerHTML = `
        <div id="elements">
        <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}.png" alt="${data.weather[0].description}" width="100" />
      
        <h2>${data.name}</h2>
        <p><strong>Temperature:</strong> ${Math.round(data.main.temp - 273.15)}°C</p>
        <p><strong>Description:</strong> ${data.weather[0].description}</p>
        </div>
        `
        return;
    }
    // document.getElementById("submit").value = "";
    const geocodeData = await getCoordinates();
    getData(geocodeData.lon, geocodeData.lat);
    
}

import React, {useState} from 'react';
import './App.css';


const apiKey = 'aae8d3cfaa956a2bd87744bb70f6be70'
const apiUrl = 'https://api.openweathermap.org/data/2.5/'


function App() {

  const [city, setCity] = useState({});
  const [query, setQuery] = useState("");
  
  const findCity = evt => {
    if(evt.key === "Enter"){
    fetch(`${apiUrl}weather?q=${query}&units=metric&lang=fr&APPID=${apiKey}`)
    .then(res => res.json())
    .then(data => {
      setCity(data);
      setQuery("");
    });
  }
  };
  const dateBuilder = (d) => {
    let months = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Aout", "Septembre", "Octobre", "Novembre", "Décembre"];
    let days = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
  }


  return (
    <div className="App">
      <main>
        <div className="searchBox">
          <input className="searchBar"
                type="text"
                placeholder="Cherchez une cité"
                onChange={e => setQuery(e.target.value)}
                value={query}
                onKeyPress={findCity}
          />
        </div>
        {(typeof city.main != "undefined") ? (
        <div className="weather-wrap">          
          <div className="location-box">         
            <div className="location">
              {city ? `${city.name}, ${city.sys.country}` : "No City"}
            </div>
           
            <div className="date">
              {dateBuilder(new Date())}
            </div>
          </div>

          <div className="weather-box">
            
            <div className="temp">
            {city ? `${Math.round(city.main.temp)}°C` : "No City"}
            </div>

            <div className="weather">
            {city ? `${city.weather[0].main}` : "No City"}
            </div>
          </div>
        </div>
        ): "Cherchez une cité"}
      </main>
    </div>
  );
}

export default App;

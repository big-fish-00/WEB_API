import { useState } from "react";
import styled from "styled-components";
import Axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import CitiesComponent from "./modules/CitiesComponent";
import WeatherInformationComponent from "./modules/WeatherInformationComponent";
import 'react-toastify/dist/ReactToastify.css';

var lat, lon, location;

const API_KEY ="77172baff3193200b5918766d6e20dde";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 50px auto;
  align-items: center;
  box-shadow: 0 5px 6px 0 #000;
  padding: 30px 10px;
  border-radius: 6px;
  width: 400px;
  background: white;
  font-family: Roboto Condensed;
`;


function App() {
  const [city, updateCity] = useState();
  const [weather, updateWeather] = useState();
  const [pollution, updateAir] = useState();

  let email = localStorage.getItem('email');

  const fetchWeatherData = async (e) => {
    
    const message = city + " :D";
    toast.info("Fetching weather for " + message);
    e.preventDefault( );

    Axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`)
    .then((response) => {
      updateWeather(response.data)
      //console.log(response.data)
      toast.success(`Successfully fetched weather for ${city}.`);
      lon = response.data.coord.lon;
      lat = response.data.coord.lat;

      const query = `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`
      Axios.get(query).then((response) => {
        updateAir(response.data)
        console.log(response.data)
        console.log(response.data.list[0].main.aqi)
        location = response.data.list[0].main.aqi
        console.log(location)
        if (location == 1) {
          location = 'Good'
        }
        else if (location == 2) {
          location = 'Fair'
        }
        else if (location == 3) {
          location = 'Moderate'
        }
        else if (location == 4) {
          location = 'Poor'
        }
        else if (location == 5) {
          location = 'Very Poor'
        }
      })

      const responses = fetch('http://localhost:5000/api/home', {
      method: 'POST',  
      headers: {
        'Content-Type': 'application/json',
      }, 
      body: JSON.stringify({
        city,
        email
      }), 
    })

    const data = responses.json();
    if(data.status === 'success') {
      console.log(data)
    }

    })
    .catch((error) => {
      if(error.response) {
        toast.error(`Fail to get location`)
      }
      else {
        console.log('Error', error.message)
      }
    })

    
    
  };
  
  return (
    <Container>
      {city&&weather?(<WeatherInformationComponent weather={weather} city={city} location={location} />):(<CitiesComponent updateCity={updateCity} fetchWeatherData={fetchWeatherData}/>)}
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable
       pauseOnHover theme="light" />
    </Container>   
    
    
    
    
  );
}

export default App;

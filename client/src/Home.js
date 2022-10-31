import { useState } from "react";
import styled from "styled-components";
import Axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import CitiesComponent from "./modules/CitiesComponent";
import WeatherInformationComponent from "./modules/WeatherInformationComponent";
import 'react-toastify/dist/ReactToastify.css';

const API_KEY ="77172baff3193200b5918766d6e20dde";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 100px auto;
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

  const fetchWeatherData = async (e) => {
    
    const message = city + " :D";
    toast.info("Fetching weather for " + message);
    e.preventDefault( );
    Axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`)
    .then((response) => {
      updateWeather(response.data)
      console.log(response.data)
      toast.success(`Successfully fetched weather for ${city}.`);

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
      {city&&weather?(<WeatherInformationComponent weather={weather} city={city}/>):(<CitiesComponent updateCity={updateCity} fetchWeatherData={fetchWeatherData}/>)}
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable
       pauseOnHover theme="light" />
    </Container>   
    
    
    
    
  );
}

export default App;

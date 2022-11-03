import styled from 'styled-components'

const WeatherIcon = styled.img`
    width: 100px;
    height: 100px;
    margin: 20px auto;
`

const WebLabel = styled.span`
  color: Black;
  margin: 25px auto;
  font-size: 20px;
  font-weight: bold;
`;

const InputCity = styled.span`
    color: Black;
    margin: 10px auto;
    font-size: 20px;
    font-weight: bold;
`

const SearchContainer = styled.form`
    display:flex;
    flex-direction: row;
    border: black solid 1px;
    border-radius: 2px;
    color: black;
    font-weight: bold;
    margin: 25px auto;

    & input {
        padding: 10px;
        font-size: 15px;
        border: 2px solid black;
        outline: none;
        font-weight: bold;
        width: 142px;
        font-family: Roboto Condensed;
    }

    & button {
        padding: 10px;
        font-size: 15px;
        border: 2px solid black;
        background-color: black;
        color: white;
        outline: none;
        font-weight: bold;
        font-family: Roboto Condensed;
        cursor: pointer;
    }

`

const CitiesComponent =(props) => {
    const {updateCity, fetchWeatherData} = props; 
    
    return (
        
        <>
        <WebLabel>React Weather App</WebLabel>
        <WeatherIcon src="/icon/weather.gif"/>
        <InputCity>Search City Weather</InputCity>
        <SearchContainer onSubmit={fetchWeatherData}>
            <input placeholder='Enter City' 
            onChange={(e) => updateCity(e.target.value)}/>
            <button type="submit">Search</button>
        </SearchContainer>     
        </>
        
    );
};

export default CitiesComponent;
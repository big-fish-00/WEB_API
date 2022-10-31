import styled from 'styled-components';

const WeatherCondition = styled.div `
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
    justify-content: space-between;
    margin: 30px auto;
`
const Condition = styled.span`
    margin: 20px auto;
    font-size: 15px;
    & span {
        font-size: 25px;
    }
`

const WeatherIcon = styled.img `
    width: 100px;
    height: 100px;
    margin: 5px auto;
`

const Location = styled.span`
    font-size: 20px;
    font-weight: bold;
`

const InfoLabel = styled.span`
    display: flex;
    flex-direction: column;
    font-size: 14px;
    margin: 15px;
    & span {
        font-size: 12px;
        text-transform: capitalize;
    }
`;

const WeatherInformationLabel = styled.span`
    font-size: 15px;
    font-weight: bold;
    margin: 25px 25px 10px;
    text-align: start;
    width: 90%;
`

const WeatherInfoContainer = styled.div`
    display: flex;
    width: 90%;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
    flex-wrap: wrap;
`;

const InfoContainer = styled.div`
    display: flex;
    margin: 15px 20px;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
`;

export const WeatherInfoIcon = {
    Sunset: "icon/sunset.png",
    Sunrise: "icon/sunrise.png",
    Humidity: "icon/humidity.png",
    Wind: "icon/wind.png",
    Pressure: "icon/pressure.png",
};

export const WeatherIcons = { 
    "01d": "icon/sunny.png",
    "01n": "icon/darksunny.png",
    "02d": "icon/fewclouds.png",
    "02n": "icon/darkfewclouds.png",
    "03d": "icon/scattered.png",
    "03n": "icon/scattered.png",
    "04d": "icon/broken.png",
    "04n": "icon/broken.png",
    "09d": "icon/shower.gif",
    "09n": "icon/shower.gif",
    "10d": "icon/rain.gif",
    "10n": "icon/darkrain.gif",
    "11d": "icon/thunderstorm.png",
    "11n": "icon/thunderstorm.png",
    "13d": "icon/snow.gif",
    "13n": "icon/snow.gif",
    "50d": "icon/mist.png",
    "50n": "icon/mist.png"
}; 

const InfoIcon = styled.img`
    width: 36px;
    height: 36px;
`;


const WebLabel = styled.span`
  color: Black;
  margin: 25px auto;
  font-size: 20px;
  font-weight: bold;
`;

const WeatherInfoComponent = (props) => {
    const {name,value} = props;
    return(
        <InfoContainer>
            <InfoIcon src={WeatherInfoIcon[name]}/>
            <InfoLabel>
                {value}
                <span>{name}</span>
            </InfoLabel>
        </InfoContainer>
    )
}

const WeatherInformationComponent =(props) => {
    const {weather} = props;
    const isDay = weather?.weather[0].icon?.includes('d')
    const getTime = (timeStamp) => {
        return `${new Date(timeStamp * 1000).getHours()} : ${new Date(timeStamp * 10000).getMinutes()}`
    }
    
    return (
        <>
        <WeatherCondition>
            <Condition><span>30 C </span> | Cloudy</Condition>
            <WeatherIcon src={WeatherIcons[weather?.weather[0].icon]} />
        </WeatherCondition>
        <Location>{`${weather?.name}, ${weather?.sys?.country}`}</Location>
        <WeatherInformationLabel>Weathear Information</WeatherInformationLabel>
        <WeatherInfoContainer>
            <WeatherInfoComponent name={isDay ? "Sunset" :"Sunrise"}
                              value={`${getTime(weather?.sys[isDay ? "sunset":"sunrise"])}`}/>
            <WeatherInfoComponent name="Pressure" value={weather?.main?.pressure}/> 
            <WeatherInfoComponent name="Wind" value={weather?.wind?.speed}/>
            <WeatherInfoComponent name="Humidity" value={weather?.main?.humidity}/>
        </WeatherInfoContainer>
    </>
    );
}

export default WeatherInformationComponent;
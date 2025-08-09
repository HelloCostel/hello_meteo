//Weather images
import dayDepositingRimeFog from '../assets/day_depositing_rime_fog.svg'
import dayFog from '../assets/day_fog.svg'
import dayMainlyClear from '../assets/day_mainly_clear.svg'
import dayPartyCloudy from '../assets/day_party_cloudy.svg'
import denseDrizzle from '../assets/dense_drizzle.svg'
import drizzle from '../assets/drizzle.svg'
import freezingDenseDrizzle from '../assets/freezing_dense_drizzle.svg'
import freezingDrizzle from '../assets/freezing_drizzle.svg'
import freezingHeavyRain from '../assets/freezing_heavy_rain.svg'
import freezingRain from '../assets/freezing_rain.svg'
import heavyRain from '../assets/heavy_rain.svg'
import heavySnowFall from '../assets/heavy_snow_fall.svg'
import moderateRain from '../assets/moderate_rain.svg'
import moon from '../assets/moon.svg'
import nightDepositingRimeFog from '../assets/night_depositing_rime_fog.svg'
import nightFog from '../assets/night_fog.svg'
import nightMainlyClear from '../assets/night_mainly_clear.svg'
import nightPartyCloudy from '../assets/night_party_cloudy.svg'
import overcast from '../assets/overcast.svg'
import rain from '../assets/rain.svg'
import sligthlySnow from '../assets/sligthly_snow.svg'
import snowFall from '../assets/snow_fall.svg'
import sun from '../assets/sun.svg'
import thunderstormHail from '../assets/thunderstorm_hail.svg'
import thunderstorm from '../assets/thunderstorm.svg'
import uvAlert from '../assets/uv_alert.svg'

//Weather codes interpretation from open-meteo.com
const WEATHER_CODES = {
    0: "Clear sky",
    1: "Mainly clear",
    2: "Partly cloudy",
    3: "Overcast",
    45: "Fog",
    48: "Depositing rime fog",
    51: "Light drizzle",
    53: "Moderate drizzle",
    55: "Dense drizzle",
    56: "Light freezing drizzle",
    57: "Dense freezing drizzle",
    61: "Slight rain",
    63: "Moderate rain",
    65: "Heavy rain",
    66: "Light freezing rain",
    67: "Heavy freezing rain",
    71: "Slight snow fall",
    73: "Moderate snow fall",
    75: "Heavy snow fall",
    77: "Snow grains",
    80: "Slight rain showers",
    81: "Moderate rain showers",
    82: "Heavy rain showers",
    85: "Slight snow showers",
    86: "Heavy snow showers",
    95: "Thunderstorm",
    96: "Thunderstorm with slight hail",
    99: "Thunderstorm with heavy hail",
};

export default function Weather({ weather, activeTime }) {
    const temperature = weather.hourly.temperature_2m[activeTime];
    const code = weather.hourly.weather_code[activeTime];
    const weatherDescription = WEATHER_CODES[code] || "Unknown";

    return (
        <>
            <p className='text-3xl'>{weatherDescription}</p>
            <p className='text-8xl'>{Math.round(temperature)}°C</p>
        </>
    );
}

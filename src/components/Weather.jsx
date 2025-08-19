import { useRef } from 'react'
//Animation imports
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { SwitchTransition, Transition } from 'react-transition-group'


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
//Array indices represent: description, day image, night image
const WEATHER_CODES = {
    0: ["Clear sky", sun, moon], // Sereno
    1: ["Mainly clear", dayMainlyClear, nightMainlyClear], // Prevalentemente sereno
    2: ["Partly cloudy", dayPartyCloudy, nightPartyCloudy], // Parzialmente nuvoloso
    3: ["Overcast", overcast, overcast], // Coperto
    45: ["Fog", dayFog, nightFog], // Nebbia
    48: ["Depositing rime fog", dayDepositingRimeFog, nightDepositingRimeFog], // Nebbia con brina
    51: ["Light drizzle", drizzle, drizzle], // Pioggerella leggera
    53: ["Moderate drizzle", drizzle, drizzle], // Pioggerella moderata
    55: ["Dense drizzle", denseDrizzle, denseDrizzle], // Pioggerella fitta
    56: ["Light freezing drizzle", freezingDrizzle, freezingDrizzle], // Pioggerella gelata leggera
    57: ["Dense freezing drizzle", freezingDenseDrizzle, freezingDenseDrizzle], // Pioggerella gelata fitta
    61: ["Slight rain", rain, rain], // Pioggia debole
    63: ["Moderate rain", moderateRain, moderateRain], // Pioggia moderata
    65: ["Heavy rain", heavyRain, heavyRain], // Pioggia forte
    66: ["Light freezing rain", freezingRain, freezingRain], // Pioggia gelata leggera
    67: ["Heavy freezing rain", freezingHeavyRain, freezingHeavyRain], // Pioggia gelata forte
    71: ["Slight snow fall", sligthlySnow, sligthlySnow], // Nevicata debole
    73: ["Moderate snow fall", snowFall, snowFall], // Nevicata moderata
    75: ["Heavy snow fall", heavySnowFall, heavySnowFall], // Nevicata forte
    77: ["Snow grains", snowFall, snowFall], // Granelli di neve
    80: ["Slight rain showers", rain, rain], // Rovescio di pioggia debole
    81: ["Moderate rain showers", moderateRain, moderateRain], // Rovescio di pioggia moderato
    82: ["Heavy rain showers", heavyRain, heavyRain], // Rovescio di pioggia forte
    85: ["Slight snow showers", sligthlySnow, sligthlySnow], // Rovescio di neve debole
    86: ["Heavy snow showers", heavySnowFall, heavySnowFall], // Rovescio di neve forte
    95: ["Thunderstorm", thunderstorm, thunderstorm], // Temporale
    96: ["Thunderstorm with slight hail", thunderstormHail, thunderstormHail], // Temporale con grandine leggera
    99: ["Thunderstorm with heavy hail", thunderstormHail, thunderstormHail], // Temporale con grandine forte
};

export default function Weather({ weatherCodes, temperatures, activeTime }) {
    const scope = useRef(null);
    const imgRef = useRef(null)

    const { contextSafe } = useGSAP({ scope: scope });

    const code = weatherCodes && weatherCodes[activeTime] !== undefined ? weatherCodes[activeTime] : 0;
    const weatherInfo = WEATHER_CODES[code];
    const weatherDescription = weatherInfo ? weatherInfo[0] : "Unknown";
    const weatherImage = weatherInfo ? weatherInfo[1] : sun;

    // Animation on mounting and first render
    const onEnter = contextSafe(() => {
        gsap.fromTo(imgRef.current,
            {
            scale: 0.3, 
            opacity: 0,
            },
            {
            scale: 1,
            opacity: 1,
            duration: 0.2,
            });
    });

    // Animation on unmounting
    const onExit = contextSafe(() => {
        gsap.to(imgRef.current, {
            opacity: 0,
            scale: 0.3,
            duration: 0.5,
            ease: 'power2.in',
        });
    });

    return (
        <div ref={scope}>
            <p className='w-full text-center text-xl text-gray-500 font-bold'>{weatherDescription}</p>
            <div className='w-full flex justify-center items-center'>
                <SwitchTransition mode="out-in">
                    <Transition
                        key={activeTime}
                        nodeRef={imgRef}
                        timeout={500}
                        onEnter={onEnter}
                        onExit={onExit}
                        unmountOnExit>
                        <img ref={imgRef}
                            className='relative left-8 w-[200px] h-[200px]'
                            src={weatherImage}
                            alt={weatherDescription} />
                    </Transition>
                </SwitchTransition>
                <div className='relative right-8 bottom-3 text-6xl text-gray-600'>{Math.floor(temperatures[activeTime])}°</div>
            </div>
        </div>
    );
}

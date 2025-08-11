export default function SunPosition({ activeTime, sunrise, sunset }) {
    activeTime = Number(activeTime);
    sunrise = sunrise.getHours();
    sunset = sunset.getHours();

    const calcOffset = () => {
        //Calc offset for sun
        if (activeTime >= sunrise && activeTime <= sunset) {
            if (sunrise < sunset) {
                const dayHours = sunset - sunrise
                const offset = (activeTime - sunrise) / dayHours * 100
                return offset;
            }
        }
    }
    const offset = {
        left: `${calcOffset()}%`
    }

    const calcTimeTo = () => {
        if (activeTime >= sunrise && activeTime <= sunset) {
            return `${sunset - activeTime} hours to sunset`
        }
        else if (activeTime < sunrise) {
            return `${sunrise - activeTime} hours to sunrise`
        }
        else if (activeTime > sunset) {
            return `${(24 - activeTime) + sunrise} hours to sunrise`
        }
    }

    return (
        <>
            <div className='w-[90vw] h-[50px] relative left-[50%] flex justify-center items-center transform -translate-x-1/2'>
                <div className='w-full h-[2px] rounded-full bg-gray-400'></div>
                <div className='absolute h-[45px] w-[45px] rounded-full sun-gradient transform -translate-x-1/2' style={offset}></div>
            </div>
            <div className='w-[90vw] relative flex justify-between items-center left-[50%] transform -translate-x-1/2'>
                    <div className='font-bold text-l text-gray-400 '>{sunrise}</div>
                    <div className='font-bold text-l text-gray-400 '>{calcTimeTo()}</div>
                    <div className='font-bold text-l text-gray-400 '>{sunset}</div>
            </div>
        </>
    )
}
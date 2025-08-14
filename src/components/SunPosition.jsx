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
        //Sunrise of next day is aproximately the same as sunrise of current day. Until we don't count minutes, we can use data from current day avoiding another API request.
        else if (activeTime < sunrise) {
            return `${sunrise - activeTime} hours to sunrise`
        }
        else if (activeTime > sunset) {
            return `${(24 - activeTime) + sunrise} hours to sunrise`
        }
    }

    return (
        <>
            <div className='relative w-11/12 max-w-[600px] flex justify-center items-center mt-12 transform -translate-x-1/2 left-1/2'>
                <div className='w-full h-0.5 bg-gray-400'></div>
                <div className='absolute w-8 h-8 rounded-full sun-gradient transform -translate-x-1/2' style={offset}></div>
            </div>
            <div className='relative w-11/12 max-w-[600px] flex justify-between items-center left-1/2 mt-4 transform -translate-x-1/2'>
                    <div className='text-gray-400 font-bold'>{sunrise}</div>
                    <div className='text-gray-400 font-bold'>{calcTimeTo()}</div>
                    <div className='text-gray-400 font-bold'>{sunset}</div>
            </div>
        </>
    )
}
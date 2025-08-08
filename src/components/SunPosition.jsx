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

    return (
        <>
            <div className='w-[90vw] h-[50px] relative left-[50%] flex justify-center items-center transform -translate-x-1/2'>
                <div className='w-full h-[2px] rounded-full bg-sky-200'></div>
                <div className='absolute h-[45px] w-[45px] rounded-full sun-gradient transform -translate-x-1/2' style={offset}></div>
            </div>
        </>
    )
}

// .container {
//     position: relative;
//     transform: translateX(-50%);
//     left: 50%;
//     width: 90vw;
//     height: 50px;
//     display: flex;
//     justify-content: center;
//     align-items: center;
// }
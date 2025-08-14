import compassDirection from '../assets/compass_direction.svg'
import compass from '../assets/compass.svg'


export default function Wind({ speed, direction}) {

    //direction value represent where wind is coming from. To represent wind-direction sum 180deg to value.
    const compassRotation = {
        transform: `rotate(${direction + 180}deg)`,
    }

    return (
        <div className='w-full h-full flex flex-col items-center justify-center'>
            <img className='absolute h-11/12 w-11/12 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2' src={compass} />
            <div className='text-sm font-bold'>Wind<br /><span>{speed} Km/h</span></div>
            <img className='absolute' src={compassDirection} style={compassRotation}/>
        </div>
    )
}
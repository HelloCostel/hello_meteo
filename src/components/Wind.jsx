import compassDirection from '../assets/compass_direction.svg'


export default function Wind({ speed, direction}) {

    const compassRotation = {
        transform: `rotate(${direction}deg)`,
    }

    return (
        <div className='w-full h-full flex flex-col items-center justify-center'>
            <div>Wind<br /><span>{speed} Km/h</span></div>
            <img className='absolute' src={compassDirection} style={compassRotation}/>
        </div>
    )
}
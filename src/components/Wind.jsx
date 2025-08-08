import compassDirection from '../assets/compass_direction.svg'


export default function Wind({ speed, direction}) {

    const compassRotation = {
        transform: `rotate(${direction}deg)`,
    }

    return (
        <div className='relative w-full h-full flex items-center justify-center'>
            <div className='text-center'>Wind<br /><span>{speed} Km/h</span></div>
            <img className='absolute top-0 left-0 w-full h-full' src={compassDirection} style={compassRotation}/>
        </div>
    )
}
import { useRef } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { Transition, SwitchTransition } from 'react-transition-group'
import compassDirection from '../assets/compass_direction.svg'
import compass from '../assets/compass.svg'


export default function Wind({ speed, direction }) {
    const scope = useRef(null)
    const nodeRef = useRef(null)
    const directionRef = useRef(null)
    const { contextSafe } = useGSAP({ scope: scope })

    //Animate the compass pointer after it's re-render
    useGSAP(() => {
        gsap.to(directionRef.current, {
            rotation: direction + 180,
            duration: 0.8,
            ease: 'power2.out'
        })
    }, [direction])

    // Animation on mounting and first render
    const onEnter = contextSafe(() => {
        gsap.fromTo(nodeRef.current,
            {
            scale: 0.8, 
            opacity: 0,
            },
            {
            scale: 1,
            opacity: 1,
            duration: 0.2,
            ease: 'power2.in',
            })
    })

    // Animation on unmounting
    const onExit = contextSafe(() => {
        gsap.to(nodeRef.current, {
            opacity: 0,
            scale: 0.8,
            duration: 0.5,
            ease: 'power2.in',
        })
    })

    return (
        <div ref={scope} className='w-full h-full flex flex-col items-center justify-center'>
            <img className='absolute h-11/12 w-11/12 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2' src={compass} alt="Bussola" />
                <SwitchTransition mode='out-in'>
                    <Transition
                        key={speed}
                        nodeRef={nodeRef}
                        timeout={500}
                        onEnter={onEnter}
                        onExit={onExit}
                        unmountOnExit>
                        <div ref={nodeRef} className='text-sm font-bold text-center'>Wind<br /><span>{speed} Km/h</span></div>
                    </Transition>
                </SwitchTransition>
            <img ref={directionRef} className='absolute' src={compassDirection} alt="Direzione del vento" />
        </div>
    )
}
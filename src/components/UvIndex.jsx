import { useRef } from 'react'
import { gsap } from 'gsap'
import {useGSAP } from '@gsap/react'
import { Transition, SwitchTransition } from 'react-transition-group'

//Import images
import uvAlert from '../assets/uv_alert.svg'
import uvOk from '../assets/uv_ok.svg'


export default function UvIndex({ level }) {
    const scope = useRef(null)
    const ref = useRef(null)

    const { contextSafe } = useGSAP({ scope: scope })

    const isHighUv = level >= 3;

    const onEnter = contextSafe(() => {
        gsap.fromTo(ref.current,
            {
            scale: 0.3,
            opacity: 0,
        },
        {
            scale: 1,
            opacity: 1,
            duration: 0.2,
        })
    })

    const onExit = contextSafe(() => {
        gsap.to(ref.current, {
            opacity: 0,
            scale: 0.3,
            duration: 0.5,
            ease: 'power2.in',
        })
    })

    return (
        <div ref={scope}>
            <SwitchTransition mode='out-in'>
                <Transition
                    key={isHighUv}
                    nodeRef={ref}
                    timeout={500}
                    onEnter={onEnter}
                    onExit={onExit}
                    unmountOnExit>
                    <div ref={ref} className='flex flex-col items-center justify-center'>
                        <img className='h-1/2 w-1/2 ' src={isHighUv ? uvAlert : uvOk}/>
                        <div className='text-sm text-center font-bold'>{isHighUv ? 'Use sun protection' : 'Low risk of sun exposure'}</div>
                    </div>
                </Transition>
            </SwitchTransition>
        </div>
    )
}
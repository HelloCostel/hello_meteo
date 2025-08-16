import { forwardRef } from 'react'

const TimeButton = forwardRef(({ time, active, setActiveTime }, ref) => {

    return (
        <button onClick={() => setActiveTime(time)} className={`w-1/5 h-full flex-none snap-start rounded-xl ${active ? 'font-bold text-2xl' : ''}`} ref={ref}>
            {time}
        </button>
    )
})

export default TimeButton
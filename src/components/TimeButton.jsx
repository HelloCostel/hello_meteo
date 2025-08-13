import { forwardRef } from 'react'

const TimeButton = forwardRef(({ time, active }, ref) => {

    return (
        <button className={`w-1/5 h-full flex-none snap-start rounded-xl ${active ? 'glass' : ''}`} ref={ref}>
            {time}
        </button>
    )
})

export default TimeButton
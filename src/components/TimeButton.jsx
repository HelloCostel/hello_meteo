import { forwardRef } from 'react'

const TimeButton = forwardRef(({ time, active }, ref) => {

    return (
        <button className={`w-[100px] h-[90%] flex-none snap-start rounded-2xl scale-75 ${active ? 'scale-110 glass' : ''}`} ref={ref}>
            {time}
        </button>
    )
})

export default TimeButton
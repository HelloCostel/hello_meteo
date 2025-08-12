const DAYS = {
    0: 'Sunday',
    1: 'Monday',
    2: 'Tuesday',
    3: 'Wednesday',
    4: 'Thursday',
    5: 'Friday',
    6: 'Saturday',
}
const MONTHS = {
    0: 'January',
    1: 'February',
    2: 'March',
    3: 'April',
    4: 'May',
    5: 'June',
    6: 'July',
    7: 'August',
    8: 'September',
    9: 'October',
    10: 'November',
    11: 'December',
}

export default function CurrentDate({ date }) {
    const day = DAYS[date.getDay()]
    const month = MONTHS[date.getMonth()]

    return (
        <div className='m-4 box-border font-bold text-xl text-gray-500'>{day + ', ' + date.getDate() + ' ' + month + ' ' + date.getFullYear()}</div>
    )
}
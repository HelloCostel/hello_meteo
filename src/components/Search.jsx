import { useState, useRef } from 'react';

export default function Search({ getCoordinates }) {
    const [city, setCity] = useState('Roma');
    const [visible, setVisible] = useState(false);
    const inputRef = useRef(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (city) {
            getCoordinates(city);
            inputRef.current?.blur();
        }
    };

    const handleFocus = () => {
        setVisible(true);
    };

    const handleBlur = () => {
        // Use a timeout to allow click on submit button before it disappears
        setTimeout(() => {
            setVisible(false);
        }, 200);
    };

    return (
        <>
            <form className='w-full p-4 flex justify-center' onSubmit={handleSubmit}>
                <input
                    ref={inputRef}
                    className='m-1 p-1 box-border max-w-[80%] text-3xl text-center font-bold text-gray-600 border-none shadow rounded-full focus:outline-none focus:shadow-sky-300'
                    type="text"
                    placeholder='Search city'
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                />
                {visible && (
                    <input className='m-1 p-1 box-border text-lg text-center font-bold text-white bg-sky-300 rounded-full' type="submit" value="Search" />
                )}
            </form>
        </>
    );
}
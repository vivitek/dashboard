const PaginationLink = ({ first = false, last = false, previous = false, next = false }) => {
    if (first) {
        return (
            <svg height="24" width="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="stroke-current fill-current">
                <title>first</title>
                <g>
                    <path d="M16.447,2.105C16.108,1.937,15.704,1.972,15.4,2.2l-12,9C3.148,11.389,3,11.686,3,12s0.148,0.611,0.4,0.8 l12,9c0.177,0.133,0.388,0.2,0.6,0.2c0.152,0,0.306-0.035,0.447-0.105C16.786,21.725,17,21.379,17,21V3 C17,2.621,16.786,2.275,16.447,2.105z" />
                    <path d="M20,2c-0.552,0-1,0.447-1,1v18c0,0.553,0.448,1,1,1s1-0.447,1-1V3C21,2.447,20.552,2,20,2z" />
                </g>
            </svg>
        )
    }

    if (last) {
        return (
            <svg height="24" width="24" viewBox="0 0 24 24" className="stroke-current fill-current" xmlns="http://www.w3.org/2000/svg">
                <title>last</title>
                <g>
                    <path d="M8.6,2.2C8.296,1.972,7.891,1.937,7.553,2.105C7.214,2.275,7,2.621,7,3v18c0,0.379,0.214,0.725,0.553,0.895 C7.694,21.965,7.848,22,8,22c0.212,0,0.423-0.067,0.6-0.2l12-9c0.252-0.188,0.4-0.485,0.4-0.8s-0.148-0.611-0.4-0.8L8.6,2.2z" />
                    <path d="M4,2C3.448,2,3,2.447,3,3v18c0,0.553,0.448,1,1,1s1-0.447,1-1V3C5,2.447,4.552,2,4,2z" />
                </g>
            </svg>
        )
    }

    if (previous) {
        return (
            <svg height="24" width="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="stroke-current fill-current">
                <title>previous</title>
                <g>
                    <path d="M17.447,2.105a1.006,1.006,0,0,0-1.047.1l-12,9a1,1,0,0,0,0,1.6l12,9A1,1,0,0,0,18,21V3A1,1,0,0,0,17.447,2.105Z" />
                </g>
            </svg>
        );
    }

    if (next) {
        return (
            <svg height="24" width="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="stroke-current fill-current">
                <title>next</title>
                <g>
                    <path d="M7.6,2.2A1,1,0,0,0,6,3V21a1,1,0,0,0,1.6.8l12-9a1,1,0,0,0,0-1.6Z" />
                </g>
            </svg>
        );
    }
    return null;
}
export default PaginationLink
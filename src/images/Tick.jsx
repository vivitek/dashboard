import React from 'react';

function Tick({ className }) {
    const title = "i check";

    return (
        <svg height="48" width="48" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" className={className}>
            <title>{title}</title>
            <g>
                <path d="M45,47H3c-1.10457,0-2-0.89543-2-2V3c0-1.10457,0.89543-2,2-2h42c1.10457,0,2,0.89543,2,2v42 C47,46.10457,46.10457,47,45,47z" fill="#72C472" />
                <polygon fill="#FFFFFF" points="20,34.82861 9.17188,24 12,21.17139 20,29.17139 36,13.17139 38.82812,16 " />
            </g>
        </svg>
    );
};

export default Tick;
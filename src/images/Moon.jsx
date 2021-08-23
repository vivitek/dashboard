import React from 'react';

function Moon({ title = "moon", className }) {

    return (
        <svg height="24" width="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className={className}>
            <title>{title}</title>
            <g strokeLinecap="square" strokeWidth="2">
                <path d="M19,15C13.5,15,9,10.5,9,5 c0-0.9,0.1-1.8,0.4-2.6C5.1,3.5,2,7.4,2,12c0,5.5,4.5,10,10,10c4.6,0,8.5-3.1,9.6-7.4C20.8,14.9,19.9,15,19,15z" />
            </g>
        </svg>
    );
};

export default Moon;
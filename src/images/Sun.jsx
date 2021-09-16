import React from 'react';

function Sun({ title = "sun", className }) {

    return (
        <svg height="24" width="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className={className}>
            <title>{title}</title>
            <g strokeLinecap="square" strokeWidth="2">
                <line fill="none" x1="1" x2="2" y1="12" y2="12" />
                <line fill="none" x1="4.2" x2="4.9" y1="4.2" y2="4.9" />
                <line fill="none" x1="12" x2="12" y1="1" y2="2" />
                <line fill="none" x1="19.8" x2="19.1" y1="4.2" y2="4.9" />
                <line fill="none" x1="23" x2="22" y1="12" y2="12" />
                <line fill="none" x1="19.8" x2="19.1" y1="19.8" y2="19.1" />
                <line fill="none" x1="12" x2="12" y1="23" y2="22" />
                <line fill="none" x1="4.2" x2="4.9" y1="19.8" y2="19.1" />
                <circle cx="12" cy="12" fill="none" r="6" />
            </g>
        </svg>
    );
};

export default Sun;
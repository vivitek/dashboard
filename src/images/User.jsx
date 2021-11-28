import React from 'react';

function Account({ title = "account", className }) {

    return (
        <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" className={className}>
            <title>{title}</title>
            <g strokeLinecap="square" strokeWidth="5">
                <path d="M4,62L4,62 c0-15.464,12.536-28,28-28h0c15.464,0,28,12.536,28,28v0" fill="none" />
                <circle cx="32" cy="18" fill="none" r="16" />
            </g>
        </svg>
    );
};

export default Account;
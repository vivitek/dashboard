import React from 'react';

function Menu({ title = "menu", className, isOpen = false }) {

    if (isOpen) {
        return (
            <svg height="64" width="64" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" className={className}>
                <title>{title}</title>
                <g strokeLinecap="square" strokeWidth="2">
                    <line fill="none" x1="51.092" x2="12.908" y1="12.908" y2="51.092" />
                    <line fill="none" x1="51.092" x2="12.908" y1="51.092" y2="12.908" />
                </g>
            </svg>
        )
    }
    return (
        <svg height="64" width="64" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" className={className}>
            <title>{title}</title>
            <g strokeLinecap="square" strokeWidth="2">
                <line fill="none" x1="4" x2="60" y1="32" y2="32" />
                <line fill="none" x1="4" x2="60" y1="14" y2="14" />
                <line fill="none" x1="4" x2="60" y1="50" y2="50" />
            </g>
        </svg>
    );
};

export default Menu;


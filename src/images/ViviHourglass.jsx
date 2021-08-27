const ViviHourglass = ({ className, dark = true }) => {
    if (dark) {
        return (
            <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100.27 112">
                <defs>
                </defs><g id="Calque_2" data-name="Calque 2">
                    <g id="Calque_1-2" data-name="Calque 1">
                        <path fill="#fff" d="M93.29,0H7a7,7,0,0,0-5.1,11.71L45,58.05a7,7,0,0,0,10.19,0L98.39,11.71A7,7,0,0,0,93.29,0Z" />
                        <path fill="#fff" d="M55.27,74.74a7,7,0,0,0-10.58,0L22.63,100.51A7,7,0,0,0,27.92,112H72.05a7,7,0,0,0,5.28-11.49Z" /></g></g></svg>

        )
    }
    return (
        <svg className={className} xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 100.27 112">
            <defs>
                <style>{".cls-1{ fill: url(#Dégradé_sans_nom_81);}.cls-2{ fill: url(#Dégradé_sans_nom_81-2);}"}</style>
                <linearGradient id="Dégradé_sans_nom_81" x1="73.68" y1="47.76" x2="35.85" y2="-17.77" gradientUnits="userSpaceOnUse">
                    <stop offset="0" stop-color="#65bfff" /><stop offset="0.12" stop-color="#56a4fb" />
                    <stop offset="0.42" stop-color="#3164f3" /><stop offset="0.68" stop-color="#1736ec" />
                    <stop offset="0.88" stop-color="#0619e8" /><stop offset="0.99" stop-color="#000ee7" />
                </linearGradient>
                <linearGradient id="Dégradé_sans_nom_81-2" x1="58.99" y1="120.63" x2="35.35" y2="79.68" xlinkHref="#Dégradé_sans_nom_81" />
            </defs><g id="Calque_2" data-name="Calque 2"><g id="Calque_1-2" data-name="Calque 1">
                <path class="cls-1" d="M93.29,0H7a7,7,0,0,0-5.1,11.71L45,58.05a7,7,0,0,0,10.19,0L98.39,11.71A7,7,0,0,0,93.29,0Z" />
                <path class="cls-2" d="M55.27,74.74a7,7,0,0,0-10.58,0L22.63,100.51A7,7,0,0,0,27.92,112H72.05a7,7,0,0,0,5.28-11.49Z" /></g>
            </g>
        </svg>
    )
}

export default ViviHourglass
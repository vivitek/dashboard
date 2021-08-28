/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react"
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import Settings from "../images/Settings";
import ViviHourglass from "../images/ViviHourglass"
const BoxCard = ({ data }) => {
    const [color, setColor] = useState("#1A1F32");
    const [status, setStatus] = useState(false)
    const { t } = useTranslation();


    return (
        <div className="flex flex-col justify-evenly p-4 mx-4 mb-8 md:mb-3 lg:mx-0 md:h-80 md:w-80 w-full h-auto rounded-xl transform transition-all duration-150 hover:scale-105 group" style={{ backgroundColor: color }}>
            <div className="flex justify-between mb-2">
                <ViviHourglass dark={true} className="h-8 md:h-16 w-auto" />
                <Settings className="fill-current stroke-current z-0 h-6 w-auto transition-opacity duration-125 lg:opacity-0 group-hover:opacity-100 cursor-pointer" />
            </div>
            <div className="mt-5 flex justify-between">
                <h4 className="capitalize">{t("boxCard.name")}:</h4>
                <p>{data.name}</p>
            </div>
            <div className="flex justify-between">
                <h4 className="capitalize">{t("boxCard.status")}:</h4>
                <p>{status ? t("boxCard.online") : t("boxCard.offline")}</p>
            </div>
            <div className="self-end mt-5">
                <Link to={`/box/${data._id}`}
                    className="dark:bg-[#313E68] bg-[#1473E6] capitalize  text-white px-6 py-2 rounded-3xl font-medium  hover:bg-blue-600 transition duration-200 each-in-out font-sans"
                >
                    {t("boxCard.details")}
                </Link>
            </div>
        </div>
    )
}

export default BoxCard
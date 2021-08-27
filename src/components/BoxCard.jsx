import { useState, useEffect } from "react"
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import Settings from "../images/Settings";
const BoxCard = ({ data }) => {
    const [color, setColor] = useState("#292E40");
    const [status, setStatus] = useState(false)
    const { t } = useTranslation();


    return (
        <div className="flex flex-col" style={{ backgroundColor: color }}>
            <div className="relative">
                <img src="https://via.placeholder.com/50" alt="" />
                <Settings className="fill-current stroke-current right-2 top-2 absolute h-6 w-auto" />
            </div>
            <div className="md:mt-3">
                <h4><span className="capitalize">{t("boxCard.name")}</span>: {data.name}</h4>
            </div>
            <div className="md:mt-2">
                <p><span className="capitalize">{t("boxCard.status")}</span>: {status ? t("boxCard.online") : t("boxCard.offline")} </p>
            </div>
            <div className="self-end md:mt-5 mb-4 mr-2">
                <Link to={`/box/${data._id}`}
                    className="dark:bg-[#313E68] bg-[#1473E6]  text-white px-6 py-2 rounded-lg font-medium  hover:bg-blue-600 transition duration-200 each-in-out font-sans"
                >
                    {t("boxCard.details")}
                </Link>
            </div>
        </div>
    )
}

export default BoxCard
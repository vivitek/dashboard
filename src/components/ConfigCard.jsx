import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useState } from "react";

const ConfigCard = ({ data }) => {
    const [color] = useState("#1A1F32");
    const { t } = useTranslation();

    return (
        <div className="flex flex-col justify-between p-6 mx-4 mb-10 md:mb-8 lg:mx-0 md:min-h-80 md:w-80 md:max-h-96 h-auto rounded-xl transform transition-all duration-150 hover:scale-105 group" style={{ backgroundColor: color }}>
            <div className="mt-5 flex justify-between">
                <h4 className="capitalize text-lg">{t("boxCard.name")}:</h4>
                <p className="text-lg">{data.name}</p>
            </div>
            <div className="flex justify-between mt-1 items-center">
                <h4 className="capitalize text-lg">ID:</h4>
                <p className="text-lg">{data._id.slice(0,19)}</p>
            </div>
            <div className="self-end mt-5">
                <Link to={`/config/${data._id}`}
                    className="bg-viviYellOrange text-white px-6 py-2 rounded-full hover:bg-blue-600 transition duration-200 each-in-out font-sans font-bold text-base"
                >
                    {t("boxCard.details")}
                </Link>
            </div>
        </div>
    )
}

export default ConfigCard;
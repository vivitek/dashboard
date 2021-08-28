/* eslint-disable no-unused-vars */
import { Transition } from "@headlessui/react";
import { useState, useEffect } from "react"
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import Settings from "../images/Settings";
import ViviHourglass from "../images/ViviHourglass"
import {ChromePicker} from "react-color"
const BoxCard = ({ data }) => {
    const [color, setColor] = useState("#1A1F32");
    const [status, setStatus] = useState(false)
    const { t } = useTranslation();
    const [settings, setSettings] = useState(false)
    const [displayColorPicker, setDisplayColorPicker] = useState(false)

    useEffect(() => {
        fetch(data.url).then(() => {
            setStatus(true)
        }).catch(() => {
            setStatus(false)
        })
    }, [data])

    useEffect(() => {
        if (localStorage.getItem(data._id)) {
            setColor(localStorage.getItem(data._id))
        }
    }, [data])

    const updateColor = () => {
        localStorage.setItem(data._id, color)
    }
    return (
        <>
            <div className="flex flex-col justify-between p-4 mx-4 mb-8 md:mb-3 lg:mx-0 md:h-80 md:w-80 w-full h-auto rounded-xl transform transition-all duration-150 hover:scale-105 group" style={{ backgroundColor: color }}>

                <div className="flex justify-between mb-2">
                    <ViviHourglass dark={true} className="h-8 md:h-16 w-auto" />
                    <div onClick={() => { setSettings(!settings); setDisplayColorPicker(false) }} >
                        <Settings className="fill-current stroke-current z-0 h-6 w-auto transition-opacity duration-125 lg:opacity-0 group-hover:opacity-100 cursor-pointer" />
                    </div>
                </div>
                <div className="mt-5 flex justify-between">
                    <h4 className="capitalize">{t("boxCard.name")}:</h4>
                    <p>{data.name}</p>
                </div>
                <div className="flex justify-between mt-1">
                    <h4 className="capitalize">{t("boxCard.status")}:</h4>
                    <p>{status ? <div className="bg-green-500 h-4 w-4 rounded-full"></div> : <div className="bg-red-500 h-4 w-4 rounded-full"></div>}</p>
                </div>
                <Transition
                    show={settings}
                    enter="transition-all ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="transition-all ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="mt-4">
                        <hr />
                        <div>
                            <button onClick={() => setDisplayColorPicker(!displayColorPicker)} className="bg-red-200">Change Color</button>
                            {
                                displayColorPicker && <div className="absolute z-20">
                                    <ChromePicker color={color} onChange={(c, e) => {
                                        setColor(c.hex)
                                        updateColor()
                                    }} />
                                </div>
                            }
                        </div>
                    </div>
                </Transition>
                <div className="self-end mt-5">
                    <Link to={`/box/${data._id}`}
                        className="dark:bg-[#313E68] bg-[#1473E6] capitalize  text-white px-6 py-2 rounded-3xl font-medium  hover:bg-blue-600 transition duration-200 each-in-out font-sans"
                    >
                        {t("boxCard.details")}
                    </Link>
                </div>
            </div>
        </>
    )
}

export default BoxCard
/* eslint-disable no-unused-vars */
import { Transition } from "@headlessui/react";
import { useState, useEffect } from "react"
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import Settings from "../images/Settings";
import ViviHourglass from "../images/ViviHourglass"
import { ChromePicker } from "react-color"
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { Modal } from "@vivitek/toolbox";

const BoxCard = ({ data }) => {
    const [color, setColor] = useState("#1A1F32");
    const [status, setStatus] = useState(false)
    const [name, setName] = useState("");
    const { t } = useTranslation();
    const [settings, setSettings] = useState(false)
    const [displayColorPicker, setDisplayColorPicker] = useState(false)
    const nameFormik = useFormik({
        initialValues: {
            name: ""
        },
        onSubmit: (values) => {
            toast.info("Updated name to " + values.name);
            setName(values.name)
            localStorage.setItem(`${data._id}_name`, values.name)
        }
    })

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
        if (localStorage.getItem(data._id + "_name")) {
            setName(localStorage.getItem(data._id + "_name"))
        }
    }, [data])

    const updateColor = () => {
        localStorage.setItem(data._id, color)
    }
    return (
        <>
            <div className="w-full flex flex-col justify-between p-6 mx-4 mb-4 md:mb-8 lg:mx-0 md:min-h-80 md:w-80 md:max-h-96 h-auto rounded-xl transform transition-all duration-150 hover:scale-105 group" style={{ backgroundColor: color }}>

                <div className="flex justify-between mb-2">
                    <ViviHourglass dark={true} className="h-10 md:h-10 w-auto" />
                    <div onClick={() => { setSettings(!settings); setDisplayColorPicker(false) }} >
                        <Settings className="fill-current stroke-current z-0 h-6 w-auto transition-opacity duration-125 lg:opacity-0 group-hover:opacity-100 cursor-pointer" />
                    </div>
                </div>
                <div className="mt-5 flex justify-between">
                    <h4 className="capitalize text-lg">{t("boxCard.name")}:</h4>
                    <p className="text-lg">{name || data.name}</p>
                </div>
                <div className="flex justify-between mt-1 items-center">
                    <h4 className="capitalize text-lg">{t("boxCard.status")}:</h4>
                    {status ? <div className="bg-green-500 h-3.5 w-3.5 rounded-full"></div> : <div className="bg-red-500 h-3 w-3 rounded-full"></div>}
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
                    <div className="mt-4 space-y-2">
                        <hr />
                        <div className="text-left">
                            <button onClick={() => setDisplayColorPicker(!displayColorPicker)} className="uppercase text-white rounded-full transition duration-200 each-in-out font-sans font-bold hover:underline text-base">{t("boxCard.color")}</button>
                            {
                                displayColorPicker && <div className="absolute z-50">
                                    <ChromePicker color={color} onChange={(c, e) => {
                                        setColor(c.hex)
                                    }} onChangeComplete={(c, e) => {
                                        updateColor()
                                        setDisplayColorPicker(false)
                                    }}
                                    />
                                </div>
                            }
                        </div>
                        <form onSubmit={nameFormik.handleSubmit}>
                            <div className="flex flex-col">
                                <label htmlFor="name" className="text-white text-sm text-left font-medium mb-1">{t("boxCard.changeName")}</label>
                                <input type="text" className="bg-gray-200 dark:bg-[#313E68] border-none rounded-xl" name="name" id="name" onChange={nameFormik.handleChange} value={nameFormik.values.name} />
                                <button type="submit" className="uppercase text-white hover:underline px-6 py-2 rounded-full transition duration-200 each-in-out font-sans font-bold text-lg" onClick= {() => {setSettings(!settings); setDisplayColorPicker(false)}}>
                                    {t("boxCard.submit")}
                                </button>
                            </div>
                        </form>
                    </div>
                </Transition>
                <div className="self-end mt-5">
                    <Link to={`/box/${data._id}`}
                        className="bg-viviYellOrange text-white px-6 py-2 rounded-full hover:bg-blue-600 transition duration-200 each-in-out font-sans font-bold text-base"
                    >
                        {t("boxCard.details")}
                    </Link>
                </div>
            </div>
        </>
    )
}

export default BoxCard
import { useContext, useEffect, useState } from "react"
import QrCode from "qrcode.react";
import { useTranslation } from 'react-i18next';
import { useMutation, useQuery } from "@apollo/client";
import avatarholder from 'avatarholder';
import UserContext from "../contexts/userContext"
import { TOGGLE_2FA, CHECK_2FA, GET_OTP_URL, ME } from "../utils/apollo"
import { toast } from "react-toastify";

const Profile = () => {
    const userContext = useContext(UserContext)
    const { i18n, t } = useTranslation();
    const [checkToken] = useMutation(CHECK_2FA);
    const [toggleOtp] = useMutation(TOGGLE_2FA);
    const { data: url_data } = useQuery(GET_OTP_URL);
    const { data: me, refetch: refetchMe } = useQuery(ME)
    const [otpTest, setOtpTest] = useState("")
    const [profilePic, setProfilePic] = useState("");
    useEffect(() => {
        setProfilePic(avatarholder.generateAvatar(userContext.user?.username ?? "anon", { size: 256 }))
    }, [userContext.user?.username])

    return (
        <div className="w-full h-full flex flex-col items-center justify-center ">
            <div className="w-full sm:4/6 md:w-2/6 flex flex-col md:flex-row justify-evenly items-center bg-darkBlue py-10 rounded-lg mb-8">
                <div>
                    <img className="rounded-full h-32 w-auto"
                        src={profilePic}
                        alt={userContext?.user?.username}
                    />
                </div>
                <div className="flex flex-col justify-between">
                    <div className="flex flex-col font-itc font-semibold uppercase">
                        <span className="text-lg">
                            {userContext.user?.username ?? "anon"}
                        </span>
                        <span className="text-lg">
                            {userContext.user?.email ?? "anon"}
                        </span>
                    </div>
                    <div className="flex flex-col mt-4">
                        <span className="text-lg font-itc font-semibold uppercase">{t("profile.accActivity")}:</span>
                        <p className="text-lg">Last sign-in: Today</p>
                    </div>
                </div>
            </div>
            <div className="flex flex-col md:flex-row justify-evenly bg-darkBlue py-10 px-16 rounded-lg">
                <div className="flex flex-col w-1/2 mr-12">
                    <div className="">
                        <h3 className="font-semibold font-itc text-lg uppercase">preferences</h3>
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-white text-left capitalize mt-2 text-base font-medium mb-1">{t("profile.language")}:</span>
                            <select
                                defaultValue={"English"}
                                className="bg-darkBlue rounded-full border-4 text-base font-medium text-white"
                                onChange={(e) => {
                                    i18n.changeLanguage(i18n.languages[e.target.selectedIndex], (error) => {
                                        if (!error) {
                                            toast.success(t("profile.changeLang"));

                                        }
                                    })
                                }}>
                                {/* {i18n.languages.map((e) => <option key={e}>{e}</option>)} */}
                                <option>English</option>
                                <option>Français</option>
                            </select>
                        </div>
                    </div>
                    <div className="">
                        <h3 className="font-semibold text-lg font-itc uppercase">password modification</h3>
                        <div className="flex flex-col">
                            <label className="text-white mt-2 text-base font-medium mb-1">New {t("login.password")}:</label>
                            <input
                                className="bg-gray-200 dark:bg-[#313E68] border-none rounded-xl"
                                name="password"
                                type="password"
                            />
                            <label className="text-white text-base mt-2 font-medium mb-1">Confirm {t("login.password")}:</label>
                            <input
                                className="bg-gray-200 dark:bg-[#313E68] border-none rounded-xl"
                                name="password"
                                type="password"
                            />
                            <div className="w-full flex justify-end xl:mt-4">
                                <div className="flex flex-col justify-center">
                                    <button type="submit" className="bg-viviYellOrange text-white mt-1 px-6 py-2 rounded-full hover:bg-blue-600 transition duration-200 each-in-out font-sans font-bold">
                                        Change password
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col w-1/2">
                    <h3 className="font-semibold text-lg font-itc uppercase">2f authentication</h3>
                    {url_data?.getOtpUrl && <div className="flex">
                        {console.log(me)}
                        <div className="mt-8 flex items-center">
                            <QrCode value="https://bit.ly/3DQAC75"/*{url_data.getOtpUrl}*/ renderAs="svg" bgColor="none" fgColor="white" />
                            <div className="flex flex-col ml-4">
                                <div className="w-full flex">
                                    <div className="flex flex-col justify-center mx-6">
                                        <button
                                            className="bg-viviBlue text-white px-0 py-2 rounded-full hover:bg-viviBlue-500 transition duration-200 each-in-out font-sans font-bold text-base mb-4"
                                            onClick={() => {
                                                toggleOtp().then((refetchMe()))
                                            }} disabled={me?.me.otp_enabled}>Enable</button>
                                        <button
                                            className="bg-viviRed text-white px-6 py-2 rounded-full hover:bg-viviRed-500 transition duration-200 each-in-out font-sans font-bold text-base"
                                            onClick={() => {
                                                toggleOtp().then((refetchMe()))
                                            }} disabled={!me?.me.otp_enabled}>Disable</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>}
                    <div className="mt-6">
                        <form onSubmit={(e) => {
                            e.preventDefault()
                            checkToken({
                                variables: { code: otpTest }
                            }).then((valid) => {
                                setOtpTest("")
                                if (valid.data.checkOtpCode) {
                                    toast.success("Code is valid")
                                } else {
                                    toast.error("Wrong code")
                                }
                            })
                        }}>
                            <div className="flex flex-col">
                                <label htmlFor="code" className="text-white text-base font-medium mb-1">Code</label>
                                <input name="code" type="text" required className="bg-gray-200 dark:bg-[#313E68] border-none rounded-xl" value={otpTest} onChange={(e) => {
                                    setOtpTest(e.target.value)
                                }} />
                                <div className="w-full flex justify-end xl:mt-4">
                                    <div className="flex flex-col justify-center">
                                        <button type="submit" className="bg-viviYellOrange text-white mt-1 px-6 py-2 rounded-full hover:bg-blue-600 transition duration-200 each-in-out font-sans font-bold">
                                            Test code
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Profile
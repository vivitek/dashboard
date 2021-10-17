import { useContext, useState } from "react"
import QrCode from "qrcode.react";
import { useTranslation } from 'react-i18next';
import { useMutation, useQuery } from "@apollo/client";
import avatarholder from 'avatarholder';
import UserContext from "../contexts/userContext"
import { TOGGLE_2FA, CHECK_2FA, GET_OTP_URL, ME } from "../utils/apollo"
import { toast } from "react-toastify";

const Profile = () => {
    const userContext = useContext(UserContext)
    const { i18n } = useTranslation();
    const [checkToken] = useMutation(CHECK_2FA);
    const [toggleOtp] = useMutation(TOGGLE_2FA);
    const { data: url_data } = useQuery(GET_OTP_URL);
    const { data: me, refetch: refetchMe } = useQuery(ME)
    const [otpTest, setOtpTest] = useState("")

    return (
        <div className="w-full h-full flex flex-col items-center justify-evenly">
            <div className="w-full md:w-1/3 flex flex-col md:flex-row justify-evenly bg-darkBlue p-6 rounded-lg">
                <div>
                    <img className="rounded-full"
                        src={
                            avatarholder.generateAvatar(userContext.user?.username ?? "anon")
                        }
                        alt={userContext?.user?.username}
                    />
                </div>
                <div className="flex flex-col justify-between">
                    <div className="flex flex-col font-itc font-semibold uppercase">
                        <span>
                            {userContext.user?.username ?? "anon"}
                        </span>
                        <span>
                            {userContext.user?.email ?? "anon"}
                        </span>
                    </div>
                    <div className="flex flex-col">
                        <h3>Account Activity</h3>
                        <p>coming soon...</p>
                    </div>
                </div>
            </div>
            <div className="w-full md:w-1/2 space-y-4 md:spacey-0 flex flex-col md:flex-row justify-evenly bg-darkBlue p-6 rounded-lg">
                <div>
                    <div className="flex flex-col">
                        <h3 className="font-semibold font-itc uppercase">preferences</h3>
                        <div className="flex">
                            <span>Language:</span>
                            <select
                            defaultValue={i18n.language}
                            className="bg-darkBlue"
                             onChange={(e) => {
                                i18n.changeLanguage(i18n.languages[e.target.selectedIndex], (error) => {
                                    if (!error) {
                                        toast.success("Changed language");

                                    }
                                })
                            }}>
                                {i18n.languages.map((e) => <option key={e}>{e}</option>)}
                            </select>
                        </div>
                    </div>
                    <div>
                        <h3 className="font-semibold font-itc uppercase">password modification</h3>
                        coming soon
                    </div>
                </div>
                <div>
                    <h3 className="font-semibold font-itc uppercase">2f authentication</h3>
                    {url_data?.getOtpUrl && <div className="flex">
                        {console.log(me)}
                        <div className="mt-4 flex">
                            <QrCode value={url_data.getOtpUrl} />
                            <div className="flex flex-col justify-evenly">
                                <button
                                className="bg-gray-400 rounded-lg px-4 py-2 mb-2"
                                 onClick={() => {
                                    toggleOtp().then((refetchMe()))
                                }} disabled={me?.me.otp_enabled}>Enable 2FA</button>
                                <button 
                                className="bg-red-400 rounded-lg px-4 py-2 mb-2"
                                onClick={() => {
                                    toggleOtp().then((refetchMe()))
                                }} disabled={!me?.me.otp_enabled}>Disable 2FA</button>
                                <form onSubmit={(e) => {
                                    e.preventDefault()
                                    checkToken({
                                        variables: { code: otpTest }
                                    }).then((valid) => {
                                        setOtpTest("")
                                        if (valid.data.checkOtpCode) {
                                            toast.success("code is valid")
                                        } else {
                                            toast.error("wrong code")
                                        }
                                    })
                                }}>
                                    <div className="flex flex-col px-2">
                                        <label htmlFor="code">Code</label>
                                        <input name="code" required placeholder="Enter code here" value={otpTest} onChange={(e) => {
                                            setOtpTest(e.target.value)
                                        }} />
                                        <button type="submit">test</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>}


                </div>
            </div>
        </div>
    )
}

export default Profile
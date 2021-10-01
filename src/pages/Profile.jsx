import { useContext } from "react"
import QrCode from "qrcode.react";
import { /* useMutation, */ useQuery } from "@apollo/client";
import avatarholder from 'avatarholder';
import UserContext from "../contexts/userContext"
import { /* TOGGLE_2FA, CHECK_2FA, */ GET_OTP_URL } from "../utils/apollo"

const Profile = () => {
    const userContext = useContext(UserContext)
    // const [checkToken] = useMutation(CHECK_2FA);
    //const [toggleOtp] = useMutation(TOGGLE_2FA);
    const { data: url_data } = useQuery(GET_OTP_URL);

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
                            <select>

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
                        <div>
                            <QrCode href={url_data?.getOtpUrl} />
                        </div>
                    </div>}

                </div>
            </div>
        </div>
    )
}

export default Profile
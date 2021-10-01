import { useContext } from "react"
import UserContext from "../contexts/userContext"
import avatarholder from 'avatarholder';

const Profile = () => {
    const userContext = useContext(UserContext)

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
        </div>
    )
}

export default Profile
import { useMutation } from "@apollo/client";
import { toast } from "react-toastify";
import { LOGIN } from "../utils/apollo";

const { Link } = require("react-router-dom");

const Login = () => {
  const [login] = useMutation(LOGIN);

  return (
    <div
      className="h-full w-full bg-cover bg-center "
      style={{
        backgroundImage: "url(https://source.unsplash.com/random/1920x1080)",
      }}
    >
      <div style={{ background: "rgba(0,0,0,0.9)" }} className="w-full h-full">
        <div className="h-full w-full grid grid-cols-1 md:grid-cols-3">
          <div className="hidden md:flex flex-col justify-center items-center">
            <img
              src="/vivi_white.svg"
              alt="ViVi logo"
              className="w-1/2 h-auto"
            />
            <p className="mt-2 pl-32">Login</p>
          </div>
          <div className="hidden md:block"></div>
          <div className="flex flex-col justify-center h-full w-full md:pr-36">
            <div className="h-full md:h-3/5  w-full bg-[#313E68] rounded-md">
              <div className="px-4 py-10 h-full grid grid-cols-1">
                <div className="">
                  <h1 className="font-bold text-lg">Sign In</h1>
                  <p className="text-sm">
                    Enter your email and password to sign in
                  </p>
                </div>
                <div>
                  <div className="w-full flex flex-col mt-2 mb-2">
                    <label>Email</label>
                    <input
                      type="email"
                      className="bg-[#292E41] border-none rounded-md"
                    />
                  </div>
                  <div className="w-full flex flex-col mt-2 mb-2">
                    <label>Password</label>
                    <input
                      type="password"
                      className="bg-[#292E41] border-none rounded-md"
                    />
                  </div>
                </div>
                <div className="w-full flex justify-end">
                  <div className="flex flex-col justify-center w-full">
                    <button className="bg-[#3C66AE] px-4 py-2 rounded-md w-full md:w-1/2 self-center md:self-end">
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

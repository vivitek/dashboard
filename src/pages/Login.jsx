import { useMutation } from "@apollo/client";
import { useTranslation } from "react-i18next";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { LOGIN } from "../utils/apollo";
import { LoginSchema } from "../utils/constants";
import { useState } from "react";
import { useHistory } from "react-router";
import LoadingPage from "./Loading";

const Login = () => {
  const [login] = useMutation(LOGIN);
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();
  const history = useHistory();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: LoginSchema,
    onSubmit: async (values) => {
      try {
        setLoading(true);
        const res = await login({
          variables: {
            loginData: values,
          },
        });
        setLoading(false);
        if (res.data.login.access_token) {
          localStorage.setItem("vivi-jwt", res.data.login.access_token);
          localStorage.setItem(
            "vivi-user",
            JSON.stringify(res.data.login.user)
          );
        }
        toast.success("Welcome back", { position: "top-center" });
        history.push("/");
      } catch (error) {
        toast.error("Something went wrong...", { position: "top-center" });
        setLoading(false);
      }
    },
  });

  if (loading) {
    return <LoadingPage />
  }

  return (
    <div className="h-full w-full bg-cover bg-center relative" style={{
      backgroundImage: "url(https://source.unsplash.com/random/1920x1080)",
    }}>
      <div className="w-full h-full flex flex-col md:flex-row" style={{ background: "rgba(0,0,0,0.85)" }}>
        <div className="w-full md:w-1/3 h-1/3 md:h-full flex flex-col justify-center items-center">
          <img
            src="/vivi_white.svg"
            alt="ViVi logo"
            className="w-1/3 md:w-1/2 h-auto"
          />
          <div align="right" className="w-1/3 hidden md:block">
            <p className="mt-2 text-xl montserrat text-white">Login</p>
          </div>
        </div>
        <div className="w-full md:w-2/3 h-2/3 md:h-full md:flex flex-col justify-center items-center">
          <div className="dark:bg-[#292E40] bg-white rounded-3xl w-full md:w-2/3 lg:w-1/3 px-4 py-4">
            <form onSubmit={formik.handleSubmit}>
              <div className="w-full flex flex-col">
                <div className="">
                  <h1 className="font-bold text-3xl itc">
                    {t("login.prompt")}
                  </h1>
                  <p className="text-xl font-semibold montserrat">
                    {t("login.details")}
                  </p>
                </div>
                <div className="w-full flex flex-col mb-10 mt-10">
                  <label className="montserrat mb-2">Email</label>
                  <input
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    name="email"
                    type="email"
                    className="bg-gray-200 dark:bg-[#313E68] border-none rounded-xl"
                  />
                </div>
                <div className="w-full flex flex-col mb-2">
                  <label className="montserrat mb-2">Password</label>
                  <input
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    name="password"
                    type="password"
                    className="bg-gray-200 dark:bg-[#313E68] border-none rounded-xl"
                  />
                </div>
                <div align="right" className="">
                  <a
                    href="mailto:contact@vincipit.com"
                    className="montserrat "
                    rel="noreferrer"
                    target="_blank"
                  >
                    Forgotten your password?
                  </a>
                </div>
                <div className="w-full flex justify-end mt-8">
                  <div className="flex flex-col justify-center w-full">
                    <button
                      type="submit"
                      className="dark:bg-[#313E68] bg-[#1473E6]  text-white px-6 py-2 rounded-lg font-medium  hover:bg-blue-600 transition duration-200 each-in-out montserrat"
                    >
                      {t("common.submit")}
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
};

export default Login;

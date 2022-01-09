import { useMutation } from "@apollo/client";
import { useTranslation } from "react-i18next";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { LOGIN } from "../utils/apollo";
import { LoginSchema } from "../utils/constants";
import { useState } from "react";
import { useHistory } from "react-router-dom";
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
        history.push("/box");
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
    <div className="h-full w-full bg-cover bg-center" style={{backgroundImage: "url(https://images.unsplash.com/photo-1620121692029-d088224ddc74?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1932&q=80)"}}>
      <div style={{ background: "rgba(0,0,0,0.85)" }} className="w-full h-full flex justify-around items-center">
        <div className="xl:w-1/5 hidden xl:block">
          <img src="/vivi_white.svg" alt="VIVI logo"/>
          <p align="right" className="text-white font-bold text-lg">Login</p>
        </div>
        <div className="bg-darkBlue xl:h-1/2 xl:w-1/5 w-full h-full xl:rounded-xl flex-col">
          <form onSubmit={formik.handleSubmit} className="flex-col p-12 h-full pb-0">
          <h1 className="text-white text-3xl font-itc">{t("login.prompt")}</h1>
          <h2 className="text-white mb-5 text-md">{t("login.details")}</h2>
            <div className="flex flex-wrap h-1/4 xl:h-1/2">
              <div className="flex flex-col w-full">
                <label className="text-white text-base font-medium mt-2 mb-1">Email</label>
                <input
                  className="bg-gray-200 dark:bg-[#313E68] border-none rounded-xl"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  name="email"
                  type="email"
                />
              </div>
              <div className="flex flex-col w-full">
                <label className="text-white text-base font-medium mb-1">{t("login.password")}</label>
                <input
                  className="bg-gray-200 dark:bg-[#313E68] border-none rounded-xl"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  name="password"
                  type="password"
                />
              </div>
            </div>
            <div className="w-full flex justify-end xl:mt-4">
              <div className="flex flex-col justify-center">
                <button type="submit" className="bg-viviYellOrange uppercase text-white mt-1 px-6 py-2 rounded-full hover:bg-blue-600 transition duration-200 each-in-out font-sans font-bold">
                    {t("common.submit")}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
};

export default Login;

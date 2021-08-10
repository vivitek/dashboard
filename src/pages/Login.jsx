import { useMutation } from "@apollo/client";
import { useTranslation } from "react-i18next";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { LOGIN } from "../utils/apollo";
import { LoginSchema } from "../utils/constants";
import { useState } from "react";
import { useHistory } from "react-router";

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

  return (
    <div
      className="h-full w-full bg-cover bg-center "
      style={{
        backgroundImage: "url(https://source.unsplash.com/random/1920x1080)",
      }}
    >
      <div style={{ background: "rgba(0,0,0,0.85)" }} className="w-full h-full">
        <div className="h-full w-full grid grid-cols-1 md:grid-cols-3">
          <div className="hidden md:flex flex-col justify-center items-center">
            <img
              src="/vivi_white.svg"
              alt="ViVi logo"
              className="w-1/3 h-auto"
            />
            <div align="right" className="w-1/3">
              <p className="mt-2 text-xl montserrat text-white">Login</p>
            </div>
          </div>
          <div className="hidden md:block"></div>
          <div className="flex flex-col justify-center h-full w-full md:pr-52 md:pl-5">
            <div className="h-full md:h-4/6  w-full dark:bg-[#292E40] bg-white rounded-3xl">
              <div className="px-8 py-20 h-full grid grid-cols-1">
                <form onSubmit={formik.handleSubmit}>
                  <div>
                    <h1 className="font-bold text-3xl itc mt-4">
                      {t("login.prompt")}
                    </h1>
                    <p className="text-xl font-semibold montserrat">
                      {t("login.details")}
                    </p>
                  </div>
                  <div>
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
                  </div>
                  <div className="w-full flex justify-end mt-8">
                    <div className="flex flex-col justify-center w-full">
                      <button
                        type="submit"
                        className="dark:bg-[#313E68] bg-[#1473E6]  text-white px-4 py-2 rounded-xl w-full md:w-1/3 self-center md:self-end montserrat"
                      >
                        {t("common.submit")}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

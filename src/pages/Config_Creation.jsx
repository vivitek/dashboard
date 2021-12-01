import { useMutation, useQuery } from "@apollo/client";
import { useContext, useState } from "react";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { useHistory } from "react-router";
import { GET_SERVICES, GET_CONFIGS, CREATE_CONFIG } from "../utils/apollo";
import UserContext from "../contexts/userContext";
import LoadingPage from "./Loading";

const ConfigCreation = () => {
  const history = useHistory();
  const userContext = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [createConfig] = useMutation(CREATE_CONFIG);
  const { loading: getServicesLoad, error: getServicesError, data: getServiceData } = useQuery(GET_SERVICES);
  const { loading: getConfigsLoad, error: getConfigsError, data: getConfigsData } = useQuery(GET_CONFIGS);

  const formik = useFormik({
    initialValues: {
      name: "",
      services: [],
      configs: [],
      public: false
    },
    onSubmit: async (values) => {
      console.log(values);
      try {
        setLoading(true);
        await createConfig({
          variables: {
            configCreateData: { ...values, creator: userContext.user?._id },
          },
        });
        setLoading(false);
        toast.success("Config Create", { position: "top-center" });
        history.push("/config");
      } catch (error) {
        toast.error("Something went wrong...", { position: "top-center" });
        setLoading(false);
      }
    }
  });

  if (getServicesLoad || getConfigsLoad || loading) {
    return <LoadingPage />
  }
  if (getServicesError || getConfigsError) {
    return (
      <div className="w-full h-full flex flex-col justify-center items-center">
        <h1>Error</h1>
      </div>
    )
  }
  return (
    <div className="w-full h-full flex flex-col lg:flex-row py-4">
      <div className="w-auto lg:w-1/5 px-4 flex flex-col">
        <div className="dark:bg-darkBlue rounded-lg p-4 flex flex-col h-full">
          <h3 className="font-itc uppercase font-medium">New configuration</h3>
          <form onSubmit={formik.handleSubmit} className=" rounded pt-6 mb-2" >
            <div className="mb-4">
              <label className="block text-sm mb-2">Configuration name</label>
              <input
                className="bg-gray-200 dark:bg-[#313E68] border-none rounded-xl w-full"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name="name"
                type="text"
                required
              />
            </div>
            <div class="mb-4">
              <label className="block text-sm mb-2">Add services</label>
              <select
                required
                name="services"
                multiple={true}
                onChange={formik.handleChange}
                className="bg-gray-200 dark:bg-[#313E68] w-full border-none rounded-xl h-60">
                {getServiceData.getServices.map((item) => {
                  return <option value={item._id}>{item.name}</option>
                })}
              </select>
            </div>
            <div class="mb-4">
              <label className="block text-sm mb-2">Add configurations</label>
              <select
                name="configs"
                multiple={true}
                onChange={formik.handleChange}
                className="bg-gray-200 dark:bg-[#313E68] w-full border-none rounded-xl">
                {getConfigsData.getConfigs.map((item) => {
                  return <option value={item._id}>{item.name}</option>
                })}
              </select>
            </div>
            <div className="md:flex md:items-center mb-4">
              <input name="public" type="checkbox" className="mr-2 leading-tight rounded-xl bg-gray-200 dark:bg-[#313E68] border-transparent" />
              <span className="text-sm">Make it public</span>
            </div>
            <div className="w-full flex justify-end xl:mt-4">
              <div className="flex flex-col justify-center">
              <button
                class="bg-viviYellOrange w-full uppercase text-white mt-1 px-6 py-2 rounded-full hover:bg-blue-600 transition duration-200 each-in-out font-sans text-sm font-bold" type="submit">
                Submit
              </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className="w-auto lg:w-2/5 pr-4">
        <div className="h-full dark:bg-darkBlue rounded-lg flex flex-col p-4">

        </div>
      </div>
      <div className="w-auto lg:w-2/5 pr-4">
        <div className="h-full dark:bg-darkBlue rounded-lg flex flex-col p-4">

        </div>
      </div>
    </div>
  );
};

export default ConfigCreation;
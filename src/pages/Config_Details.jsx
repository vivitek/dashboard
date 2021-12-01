import { useParams } from "react-router";
import { useMutation, useQuery } from "@apollo/client";
import { useState } from "react";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { useHistory } from "react-router";
import { GET_CONFIG, GET_SERVICES, GET_CONFIGS, DELETE_CONFIG, UPDATE_CONFIG } from "../utils/apollo";
import LoadingPage from "./Loading";

const ConfigDetails = () => {
  const { id } = useParams();
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [updateConfig] = useMutation(UPDATE_CONFIG);
  const [deleteConfig] = useMutation(DELETE_CONFIG);
  const { loading: getConfigLoad, error: getConfigError, data: getConfigData } = useQuery(GET_CONFIG, { variables: { configId: id } });
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
        await updateConfig({
          variables: {
            configUpdateData: { ...values, _id: getConfigData.getConfig._id },
          },
        });
        setLoading(false);
        toast.success("Config Create", { position: "top-center" });
      } catch (error) {
        toast.error("Something went wrong...", { position: "top-center" });
        setLoading(false);
      }
    }
  });

  const setDeleteConfig = async () => {
    try {
      await deleteConfig({ variables: { id: getConfigData.getConfig._id } });
      toast.success("Config Delete", { position: "top-center" });
      history.push("/config");
    } catch (error) {
      toast.error("Something went wrong...", { position: "top-center" });
    }
  }

  if (getConfigLoad || getServicesLoad || getConfigsLoad || loading) {
    return <LoadingPage />
  }
  if (getConfigError || getServicesError || getConfigsError) {
    return (
      <div className="w-full h-full flex flex-col justify-center items-center">
        <h1>Error !!</h1>
      </div>
    )
  }
  return (
    <div className="w-full h-full flex flex-col lg:flex-row py-4">
      <div className="w-auto lg:w-1/5 px-4 flex flex-col">
        <div className="dark:bg-darkBlue rounded-lg p-4 flex flex-col mb-2">
          <h3 className="font-itc uppercase font-medium">Information</h3>
          <div className="flex justify-between mt-2">
            <h4 className="font-itc font-light">Name:</h4>
            <span>{getConfigData.getConfig.name}</span>
          </div>
          <div className="flex justify-between mt-2">
            <h4 className="font-itc font-light">Public:</h4>
            <span>{getConfigData.getConfig.public ? "Yes":"No"}</span>
          </div>
        </div>
        <div className="dark:bg-darkBlue rounded-lg p-4 flex flex-col h-full mt-2">
          <h3 className="font-itc uppercase font-medium">Edit configuration</h3>
          <form onSubmit={formik.handleSubmit} className="border-none rounded pt-6 mb-4" >
            <div className="mb-4">
              <label className="block text-sm mb-2">Edit configuration name</label>
              <input
                className="bg-gray-200 dark:bg-[#313E68] border-none rounded-xl w-full"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name="name"
                type="text"
              />
            </div>
            <div class="mb-4">
              <label className="block text-sm mb-2">Change services</label>
              <select
                name="services"
                multiple={true}
                onChange={formik.handleChange}
                class="bg-gray-200 dark:bg-[#313E68] w-full border-none rounded-xl">
                {getServiceData.getServices.map((item) => {
                  return <option value={item._id}>{item.name}</option>
                })}
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-sm mb-2">Change configuration</label>
              <select
                name="configs"
                multiple={true}
                onChange={formik.handleChange}
                class="bg-gray-200 dark:bg-[#313E68] w-full border-none rounded-xl">
                {getConfigsData.getConfigs.filter((item) => 
                  item._id !== getConfigData.getConfig._id
                ).map((item) => {
                  return <option value={item._id}>{item.name}</option>
                })}
              </select>
            </div>
            <div className="md:flex md:items-center mb-4">
              <input name="public" type="checkbox" className="mr-2 leading-tight rounded-xl bg-gray-200 dark:bg-[#313E68] border-transparent" />
              <span className="text-sm">Make it public</span>
            </div>
          </form>
          <div className="flex justify-evenly">
            <button
              onClick={() => setDeleteConfig()}
              className="bg-viviRed w-full text-white px-4 py-2 mr-2 rounded-full hover:bg-viviRed-500 transition duration-200 each-in-out font-sans font-bold text-sm">
              DELETE
            </button>
            <button
              onClick={() => formik.handleSubmit()}
              className="bg-viviYellOrange w-full uppercase text-white ml-2 px-4 py-2 rounded-full hover:bg-blue-600 transition duration-200 each-in-out font-sans text-sm font-bold" type="submit">
              Submit
            </button>
          </div>
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

export default ConfigDetails;
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
          <div className="flex justify-between mt-1">
            <h4 className="font-itc font-light">ID:</h4>
            <span>{getConfigData.getConfig._id.match(/.{1,6}/g).join('-')}</span>
          </div>
        </div>
        <div className="dark:bg-darkBlue rounded-lg p-4 flex flex-col h-full mt-2">
          <h3 className="font-itc uppercase font-medium">Modifier Config</h3>
          <form onSubmit={formik.handleSubmit} className="dark:bg-darkBlue shadow-md rounded px-8 pt-6 pb-8 mb-8" >
            <div className="mb-8">
              <label className="block text-gray-700 text-sm font-bold mb-2"> Modifier nom de config </label>
              <input
                className="bg-gray-200 dark:bg-[#313E68] border-none rounded-xl w-full"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name="name"
                type="text"
              />
            </div>
            <div class="mb-8">
              <label className="block text-gray-700 text-sm font-bold mb-2"> Modifier Services </label>
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
            <div className="mb-8">
              <label className="block text-gray-700 text-sm font-bold mb-2"> Modifier Configs </label>
              <select
                name="configs"
                multiple={true}
                onChange={formik.handleChange}
                class="bg-gray-200 dark:bg-[#313E68] w-full border-none rounded-xl">
                {getConfigsData.getConfigs.map((item) => {
                  return <option value={item._id}>{item.name}</option>
                })}
              </select>
            </div>
            <div className="md:flex md:items-center mb-8">
              <label class="md:w-2/3 block text-gray-500 font-bold">
                <input name="public" type="checkbox" className="mr-2 leading-tight"/>
                <span className="text-sm">Public </span>
              </label>
            </div>
            <div className="mb-8">
              <button
                class="bg-viviYellOrange w-full uppercase text-white mt-1 px-6 py-2 rounded-full hover:bg-blue-600 transition duration-200 each-in-out font-sans font-bold" type="submit">
                Submit
              </button>
            </div>
          </form>
          <div>
            <button
              onClick={() => setDeleteConfig()}
              class="bg-viviRed w-full text-white px-6 py-2 rounded-full hover:bg-viviRed-500 transition duration-200 each-in-out font-sans font-bold text-sm">
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfigDetails;
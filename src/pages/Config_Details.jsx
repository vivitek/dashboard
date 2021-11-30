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
  const [ loading, setLoading] = useState(false);
  const [ updateConfig ] = useMutation(UPDATE_CONFIG);
  const [ deleteConfig ] = useMutation(DELETE_CONFIG);
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
            configCreateData: values,
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
      </div>
      <div className="w-auto lg:w-4/5 pr-4">
        <div className="h-full dark:bg-darkBlue rounded-lg flex flex-col p-4">
          <div className="mb-4">
            <form onSubmit={formik.handleSubmit} className="flex-col p-12 h-full pb-0" >
              <label className="text-white text-base font-medium mt-2 mb-1"> Modifier nom de config </label>
              <input
                  className="bg-gray-200 dark:bg-[#313E68] border-none rounded-xl"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  name="name"
                  type="text"
                />
              <div class="inline-block">
                <select 
                  name="services"
                  multiple={true} 
                  onChange={formik.handleChange} 
                  class="bg-gray-200 dark:bg-[#313E68] border-none rounded-xl">
                    {getServiceData.getServices.map((item) => {
                      return <option value={item._id}>{item.name}</option>
                    })}
                </select>
              </div>
              <div class="inline-block">
                <select
                  name="configs"
                  multiple={true} 
                  onChange={formik.handleChange} 
                  class="bg-gray-200 dark:bg-[#313E68] border-none rounded-xl">
                    {getConfigsData.getConfigs.map((item) => {
                      return <option value={item._id}>{item.name}</option>
                    })}
                </select>
              </div>
              <label>Public</label>
              <input name="public" type="checkbox"/>
              <button 
                class="bg-viviYellOrange uppercase text-white mt-1 px-6 py-2 rounded-full hover:bg-blue-600 transition duration-200 each-in-out font-sans font-bold" type="submit">
                  Submit
              </button>
            </form>
            <button 
              onClick={ () => setDeleteConfig()}
              class="bg-viviRed uppercase text-white mt-1 px-6 py-2 rounded-full hover:bg-blue-600 transition duration-200 each-in-out font-sans font-bold">
                Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfigDetails;
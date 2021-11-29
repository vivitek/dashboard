import { useTranslation } from "react-i18next";
import { useParams } from "react-router";
import { useQuery } from "@apollo/client";
import { GET_CONFIG, GET_SERVICES } from "../utils/apollo";
import LoadingPage from "./Loading";
import { useState } from "react";

const ConfigDetails = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const { loading, error, data: configData } = useQuery(GET_CONFIG, { variables: { configId: id } });
  const { loading: load, error: errorServ, data: serviceData } = useQuery(GET_SERVICES);
  const [service, setService] = useState([]);

  const handleSubmit = event => {
    event.preventDefault();
  }

  const handleChange = event => {
    setService({
      service: event.target.services
    });
  }


  if (loading || load) {
    return <LoadingPage />
  }
  if (error && errorServ) {
    return (
      <div className="w-full h-full flex flex-col justify-center items-center">
        <h1>Error</h1>
        <p>{error.message}</p>
      </div>
    )
  }
  return (
    <div className="w-full h-full flex flex-col lg:flex-row py-4">
      <div className="w-auto lg:w-1/5 px-4 flex flex-col">
        <div className="dark:bg-darkBlue rounded-lg p-4 flex flex-col mb-2">
          <h3 className="font-itc uppercase font-medium">{t("boxDetails.information")}</h3>
          <div className="flex justify-between mt-2">
            <h4 className="font-itc font-light">{t("boxDetails.name")}</h4>
            <span>{configData.getConfig.name}</span>
          </div>
          <div className="flex justify-between mt-1">
            <h4 className="font-itc font-light">{t("boxDetails.id")}</h4>
            <span>{configData.getConfig._id}</span>
          </div>
          <div className="flex justify-between mt-4 items-center">

          </div>

        </div>

      </div>
      <div className="w-auto lg:w-4/5 pr-4">
        <div className="h-full dark:bg-darkBlue rounded-lg flex flex-col p-4">
          <h3 className="font-itc uppercase font-medium">{t("boxDetails.connections")}</h3>
          <form onSubmit={handleSubmit}>
            <select multiple className="font-itc text-black" onChange={handleChange}>
              {serviceData.getServices.map((item) => {
                return <option value={item._id}>{item.name}</option>
              })}
            </select>
            <button type="submit">Submit</button>
          </form>
          <ul>
            {Object.entries(service).map((item) => {
              <li>{item}</li>
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ConfigDetails;
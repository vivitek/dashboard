import { useParams } from "react-router";
import { useQuery } from "@apollo/client";
import { GET_CONFIG, GET_SERVICES } from "../utils/apollo";
import LoadingPage from "./Loading";

const ConfigDetails = () => {
    const { id } = useParams();
    const { loading, error, data: configData } = useQuery(GET_CONFIG, {
      variables: { configId: id },
    });
    const { loading: load, error: errorServ, data: serviceData } = useQuery(GET_SERVICES);

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
      <div>
        <span>{configData.getConfig._id}</span>
        <select multiple>
          {serviceData.getServices.map((item) => {
            return <option value={item._id}>{item.name}</option>
          })}
        </select>
        
      </div>
    )
};

export default ConfigDetails;
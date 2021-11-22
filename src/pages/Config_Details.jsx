import { useParams } from "react-router";
import { useQuery } from "@apollo/client";
import { GET_CONFIG } from "../utils/apollo";
import LoadingPage from "./Loading";

const ConfigDetails = () => {
    const { id } = useParams();
    const { loading, error, data: configData } = useQuery(GET_CONFIG, {
        variables: { configId: id },
    });

    if (loading) {
        return <LoadingPage />
    }
    if (error) {
        return (
          <div className="w-full h-full flex flex-col justify-center items-center">
            <h1>Error</h1>
            <p>{error.message}</p>
          </div>
        )
      }
    return (
        <span>{configData.getConfig._id}</span>
    )
};

export default ConfigDetails;
import { useQuery } from "@apollo/client";
import { GET_CONFIGS } from "../utils/apollo";
import ConfigCard from "../components/ConfigCard";
import LoadingPage from "../pages/Loading";
import { Link } from "react-router-dom";

const Config = () => {
  const { data, error, loading } = useQuery(GET_CONFIGS);
  
  if (loading) 
    return <LoadingPage />
  if (error) 
    return <p>{error.message}</p>
  return (
    <>
      <div className="relative h-full">
        <center>
          <div className="w-full flex flex-wrap xl:w-4/5 justify-evenly pt-4">
            {data.getConfigs.map((e) => (
              <ConfigCard data={e} key={e._id} />
            ))}
          </div>
        </center>
        <div className="absolute bottom-0 right-0 m-4">
          <Link to="/config/new" className="bg-viviRed uppercase text-white px-6 py-2 rounded-full hover:bg-viviRed-500 transition duration-200 each-in-out font-sans font-bold text-sm">
            Create New Config
          </Link>
        </div>
      </div>
    </>
  );
};

export default Config;
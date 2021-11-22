import { useQuery } from "@apollo/client";
import { GET_CONFIGS } from "../utils/apollo";
import ConfigCard from "../components/ConfigCard";
import LoadingPage from "../pages/Loading";

const Config = () => {
  const { data, error, loading } = useQuery(GET_CONFIGS)
  if (loading) {
    return (
      <LoadingPage />
    )
  }
  if (error) {
    return (
      <p>{error.message}</p>
    )
  }
  return (
    <center>
      <div className="w-full flex flex-wrap xl:w-4/5 justify-evenly pt-4">
        {data.getConfigs.map((e) => (
          <ConfigCard data={e} key={e._id} />
        ))}
      </div>
    </center>
  );
};

export default Config;
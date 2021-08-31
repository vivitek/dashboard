import { useQuery } from "@apollo/client";
import { GET_ROUTERS } from "../utils/apollo";
import BoxCard from "../components/BoxCard";
import LoadingPage from "../pages/Loading"
const Boxes = () => {
  const {data, error, loading} = useQuery(GET_ROUTERS)
  // TODO: retrieve info from backend

  if (loading) {
    return (
      <LoadingPage />
    )
  }
  if (error) {
    return (
      <p>{error}</p>
    )
  }
  return (
    <div className=" w-full flex flex-wrap justify-evenly pt-4">
      {data.getRouters.map((e) => (
        <BoxCard data={e} key={e._id}/>
      ))}
    </div>
  );
};

export default Boxes;

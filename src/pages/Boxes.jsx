import { useHistory } from "react-router";
import BoxCard from "../components/BoxCard";

const Boxes = () => {
  const { data } = {
    data: [
      {
        _id: "1",
        name: "MK1",
      },
      {
        _id: "2",
        name: "MK2",
      },
      {
        _id: "3",
        name: "MK3",
      },
      {
        _id: "4",
        name: "MK4",
      },
    ],
  };

  const history = useHistory();

  return (
    <div className=" w-full grid grid-cols-1 md:grid-cols-4 gap-y-4 gap-x-8 container mx-auto pt-5 font-sans">
      {data.map((e) => (
        <BoxCard data={e} />
      ))}
    </div>
  );
};

export default Boxes;

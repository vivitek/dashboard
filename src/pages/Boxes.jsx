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

  return (
    <div className=" w-full flex flex-wrap justify-evenly pt-4 font-sans">
      {data.map((e) => (
        <BoxCard data={e} />
      ))}
    </div>
  );
};

export default Boxes;

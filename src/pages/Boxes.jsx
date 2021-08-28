import BoxCard from "../components/BoxCard";

const Boxes = () => {
  const { data } = {
    data: [
      {
        _id: "1",
        name: "MK1",
        url: "https://google.com"
      },
      {
        _id: "2",
        name: "MK2",
        url: "https://vincipit.com"
      },
      {
        _id: "3",
        name: "MK3",
        url:"example.com"
      },
      {
        _id: "4",
        name: "MK4",
        url: "test.tek"
      },

    ],
  };

  return (
    <div className=" w-full flex flex-wrap justify-evenly pt-4">
      {data.map((e) => (
        <BoxCard data={e} key={e._id}/>
      ))}
    </div>
  );
};

export default Boxes;

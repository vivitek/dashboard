import { useHistory } from "react-router";

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
    <div className=" w-full grid grid-cols-1 md:grid-cols-4 gap-y-4 gap-x-8 container mx-auto pt-5 ">
      {data.map((e) => (
        <div
          key={e._id}
          className="shadow-md flex flex-col justify-center items-center"
        >
          <div>{e.name}</div>
          <svg
            className="mt-2 mb-2 h-2/3 w-auto"
            xmlns="http://www.w3.org/2000/svg"
            width="64"
            height="64"
            viewBox="0 0 64 64"
          >
            <title>router</title>
            <g
              stroke-linecap="square"
              stroke-linejoin="miter"
              stroke-width="2"
              fill="#000000"
              stroke="#000000"
            >
              <line
                x1="42"
                y1="44"
                x2="42"
                y2="22"
                fill="none"
                stroke="#000000"
                stroke-miterlimit="10"
              ></line>
              <circle
                cx="42"
                cy="18"
                r="4"
                fill="none"
                stroke="#000000"
                stroke-miterlimit="10"
              ></circle>
              <path
                d="M50.485,9.515a12,12,0,0,1,0,16.97"
                fill="none"
                stroke-miterlimit="10"
              ></path>
              <path
                d="M33.515,26.485a12,12,0,0,1,0-16.97"
                fill="none"
                stroke-miterlimit="10"
              ></path>
              <path
                d="M56.142,3.858a20,20,0,0,1,0,28.284"
                fill="none"
                stroke-miterlimit="10"
              ></path>
              <path
                d="M27.858,32.142a20,20,0,0,1,0-28.284"
                fill="none"
                stroke-miterlimit="10"
              ></path>
              <path
                d="M54,60a8,8,0,0,0,0-16H10a8,8,0,0,0,0,16Z"
                fill="none"
                stroke="#000000"
                stroke-miterlimit="10"
              ></path>
              <circle
                cx="10"
                cy="52"
                r="2"
                data-stroke="none"
                stroke="none"
                stroke-linecap="butt"
              ></circle>
              <circle
                cx="20"
                cy="52"
                r="2"
                data-stroke="none"
                stroke="none"
                stroke-linecap="butt"
              ></circle>
              <line
                x1="12"
                y1="60"
                x2="12"
                y2="62"
                fill="none"
                stroke="#000000"
                stroke-miterlimit="10"
              ></line>
              <line
                x1="52"
                y1="60"
                x2="52"
                y2="62"
                fill="none"
                stroke="#000000"
                stroke-miterlimit="10"
              ></line>
            </g>
          </svg>
          <div>
            <button
              onClick={() => {
                history.push(`/box/${e._id}`);
              }}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Details
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Boxes;

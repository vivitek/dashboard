import { Line } from "react-chartjs-2";

const Home = () => {
  return (
    <div className="w-full h-full flex p-4">
      <div className="w-1/2 shadow-lg rounded-lg ">
        <div class="py-3 px-5 text-center">Response Time</div>
        <Line
          className="p-10"
          data={{
            labels: [
              "8h",
              "8h30",
              "9h",
              "9h30",
              "10h",
              "10h30",
              "11h",
              "11h30",
              "12h",
              "12h30",
              "13h",
              "13h30",
              "14h",
              "14h30",
              "15h",
            ],
            datasets: [
              {
                label: "Response time",
                borderColor: "#f96332",
                pointBorderColor: "#FFF",
                pointBackgroundColor: "#f96332",
                pointBorderWidth: 2,
                pointHoverRadius: 4,
                pointHoverBorderWidth: 1,
                pointRadius: 4,
                fill: true,
                borderWidth: 2,
                data: [
                  32, 33, 31, 35, 34, 32, 31, 35, 34, 38, 37, 32, 34, 37, 32,
                ],
              },
            ],
          }}
        />
      </div>
	  <div className="w-1/2 shadow-lg rounded-lg ">
        <div class="py-3 px-5 text-center">Response Time</div>
        <Line
          className="p-10"
          data={{
            labels: [
              "8h",
              "8h30",
              "9h",
              "9h30",
              "10h",
              "10h30",
              "11h",
              "11h30",
              "12h",
              "12h30",
              "13h",
              "13h30",
              "14h",
              "14h30",
              "15h",
            ],
            datasets: [
              {
                label: "Response time",
                borderColor: "#f96332",
                pointBorderColor: "#FFF",
                pointBackgroundColor: "#f96332",
                pointBorderWidth: 2,
                pointHoverRadius: 4,
                pointHoverBorderWidth: 1,
                pointRadius: 4,
                fill: true,
                borderWidth: 2,
                data: [
                  32, 33, 31, 35, 34, 32, 31, 35, 34, 38, 37, 32, 34, 37, 32,
                ],
              },
            ],
          }}
        />
      </div>
    </div>
  );
};

export default Home;

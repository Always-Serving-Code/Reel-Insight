import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import "../App.css";
import { Bar } from "react-chartjs-2";
import { StatsProps, DirectorObj } from "../interfaces";

export default function StatsTopDirectors(props: StatsProps) {
  const { filmsWatched } = props;
  const directors: Array<string> = [];
  if (filmsWatched.length) {
    filmsWatched.forEach((film) => {
      film["directors"].forEach((director: string) => {
        directors.push(director);
      });
    });
  }

  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );
  const options = {
    indexAxis: "y" as const,
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    responsive: true,
    plugins: {
      legend: {
        position: "bottom" as const,
      },
      title: {
        display: true,
      },
    },
  };

  const filteredDirectors = directors.filter(
    (value, index) => directors.indexOf(value) === index
  );

  const directorObj: DirectorObj = {};
  directors.forEach((director) => {
    if (director in directorObj) {
      directorObj[director] = directorObj[director] + 1;
    } else {
      directorObj[director] = 1;
    }
  });

  const dataArr: Array<number> = [];
  for (const directorData in directorObj) {
    dataArr.push(directorObj[directorData]);
  }

  const labels = filteredDirectors;
  const data = {
    labels,
    datasets: [
      {
        label: "Number of Films",
        data: dataArr,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  return (
    <div>
      <div className="stat-title">
        <h2>Most Watched Directors</h2>
      </div>
      <Bar options={options} data={data} />
      <hr className="stat-divider" />
    </div>
  );
}

import styles from "./style.module.scss";
import classNames from "classnames/bind";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useEffect, useState } from "react";
import axios from "axios";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  // responsive: true,
  // maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Yolo",
    },
  },
};

const labels = ["January", "February", "March", "April", "May", "June", "July"];

let cx = classNames.bind(styles);

const Chart = () => {
  const { REACT_APP_IO_USERNAME, REACT_APP_IO_KEY } = process.env;
  const [data, setData] = useState({
    labels,
    datasets: [
      {
        label: "Dataset 1",
        data: labels.map(() => 1),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `https://io.adafruit.com/api/v2/${REACT_APP_IO_USERNAME}/feeds/dht20-temp/data?limit=10`,
          {
            headers: {
              "X-AIO-Key": REACT_APP_IO_KEY,
            },
          }
        );
        const resData = res.data.reverse();
        setData({
          labels: resData.map((d) => {
            const createdDate = d.created_at;
            const date = new Date(createdDate);
            const m = date.getUTCMinutes();
            const s = date.getUTCSeconds();
            return m + ":" + s;
          }),
          datasets: [
            {
              label: resData[0].feed_key,
              data: resData.map((d) => d.value),
              borderColor: "#DFA67B",
              backgroundColor: "#DFA67B",
            },
          ],
        });
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, []);

  return (
    <div className={cx("container")}>
      <Line options={options} data={data} />
    </div>
  );
};

export default Chart;

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
import { useSelector } from "react-redux";

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

const fetchFeedData = async (user) => {
  try {
    const res = await axios.get(
      `https://io.adafruit.com/api/v2/${user.username}/feeds/dht20-humi/data?limit=10`,
      {
        headers: {
          "X-AIO-Key": user.active_key,
        },
      }
    );
    return res.data.reverse();
  } catch (e) {
    console.log(e);
  }
};

let cx = classNames.bind(styles);

let labels = [];
const Chart = () => {
  const { user } = useSelector((state) => state.auth);
  const [data, setData] = useState({
    labels,
    datasets: [
      {
        label: "Dataset 1",
        data: labels.map(() => 1),
        borderColor: "#DFA67B",
        backgroundColor: "#DFA67B",
      },
    ],
  });

  useEffect(() => {
    if (user === null) return;
    const data = fetchFeedData(user);

    setData({
      labels: data.map((d) => {
        const createdDate = d.created_at;
        const date = new Date(createdDate);
        const m = date.getUTCMinutes();
        const s = date.getUTCSeconds();
        return m + ":" + s;
      }),
      datasets: [
        {
          label: data[0].feed_key,
          data: data.map((d) => d.value),
          borderColor: "#DFA67B",
          backgroundColor: "#DFA67B",
        },
      ],
    });
  }, [user]);

  return (
    <div className={cx("container")}>
      <Line options={options} data={data} />
    </div>
  );
};

export default Chart;

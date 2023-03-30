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

let cx = classNames.bind(styles);

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

const initData = {
  labels: [],
  datasets: [
    {
      label: "Dataset 1",
      data: [1],
      borderColor: "#DFA67B",
      backgroundColor: "#DFA67B",
    },
  ],
};

const generateChartData = (data) => ({
  labels: data.map((fd) => {
    const createdDate = fd.created_at;
    const date = new Date(createdDate);
    const m = date.getUTCMinutes();
    const s = date.getUTCSeconds();
    return m + ":" + s;
  }),
  datasets: [
    {
      label: data[0].feed_key,
      data: data.map((fd) => fd.value),
      borderColor: "#DFA67B",
      backgroundColor: "#DFA67B",
    },
  ],
});

const Chart = () => {
  const { user } = useSelector((state) => state.auth);
  const { currentFeed } = useSelector((state) => state.feed);
  const [data, setData] = useState(initData);

  useEffect(() => {
    if (user === null || currentFeed === null) return;

    const fetchFeedData = async () => {
      try {
        const res = await axios.get(
          `/api/v2/${user.username}/feeds/${currentFeed.key}/data?limit=10`,
          {
            headers: {
              "X-AIO-Key": user.active_key,
            },
          }
        );
        const feedData = res.data.reverse();
        setData(generateChartData(feedData));
      } catch (e) {
        console.log(e);
      }
    };
    fetchFeedData();
  }, [user, currentFeed]);

  return (
    <div className={cx("container")}>
      <Line options={options} data={data} />
    </div>
  );
};

export default Chart;

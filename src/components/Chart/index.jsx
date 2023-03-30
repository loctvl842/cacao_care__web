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
  TimeScale,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { SocketContext } from "~/socket";
import "chartjs-adapter-date-fns";

let cx = classNames.bind(styles);

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale
);

// const options = {
//   plugins: {
//     legend: {
//       position: "top",
//     },
//     title: {
//       display: true,
//       text: "Yolo",
//     },
//   },
// };

const options = {
  scales: {
    x: {
      type: "time",
      time: {
        unit: "minute",
        displayFormats: {
          minute: "h:mm a",
        },
      },
      ticks: {
        source: "auto",
        autoSkip: true,
      },
    },
    // y: {
    //   ticks: {
    //     stepSize: 0.5,
    //   },
    // },
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

const generateChartData = (name, data) =>
  data.length === 0
    ? initData
    : {
        // labels: data.map((d) => {
        //   const createdDate = d.created_at;
        //   const date = new Date(createdDate);
        //   const m = date.getUTCMinutes();
        //   const s = date.getUTCSeconds();
        //   return m + ":" + s;
        // }),
        labels: data.map((d) => d.created_at),
        datasets: [
          {
            label: name,
            data: data.map((d) => d.value),
            borderColor: "#DFA67B",
            backgroundColor: "#DFA67B",
          },
        ],
      };

const Chart = () => {
  const { user } = useSelector((state) => state.auth);
  const { currentFeed } = useSelector((state) => state.feed);
  const [datas, setDatas] = useState([]);
  const socket = useContext(SocketContext);

  useEffect(() => {
    if (user === null || currentFeed === null) return;

    const fetchFeedData = async () => {
      try {
        const res = await axios.get(
          `/api/v2/${user.username}/feeds/${currentFeed.key}/data?limit=39`,
          {
            headers: {
              "X-AIO-Key": user.active_key,
            },
          }
        );
        const feedData = res.data.reverse();
        setDatas(feedData);
      } catch (e) {
        console.log(e);
      }
    };
    fetchFeedData();
  }, [user, currentFeed]);

  useEffect(() => {
    if (user === null || currentFeed === null) return;

    const topic = `${user.username}/feeds/${currentFeed.key}`;
    socket.on(topic, (data, createdAt) => {
      const newFeedData = {
        created_at: createdAt,
        value: data,
      };
      const copiedDatas = [...datas];
      copiedDatas.shift();
      copiedDatas.push(newFeedData);
      setDatas(copiedDatas);
    });
  }, [user, socket, currentFeed]);

  return (
    <div className={cx("container")}>
      <Line
        options={options}
        data={generateChartData(
          currentFeed === null ? "ON NO" : currentFeed.name,
          datas
        )}
      />
    </div>
  );
};

export default Chart;

import styles from "./style.module.scss";
import classNames from "classnames/bind";

import { useState, useEffect } from "react";
import axios from "axios";
import mqtt from "precompiled-mqtt";
import { v4 as uuidv4 } from "uuid";
import { PulseLoader } from "react-spinners";

let cx = classNames.bind(styles);

const factors = [
  {
    color: "#1daad0",
    name: "Humidity",
    unit: "%",
    feedKey: "dht20-humi",
  },
  {
    color: "#b8621b",
    name: "Moisture",
    unit: "%",
    feedKey: "yolo-moisture",
  },
  {
    color: "#7AA874",
    name: "Light",
    unit: "%",
    feedKey: "yolo-light",
  },
  {
    color: "#DFA67B",
    name: "Temperature",
    unit: "°C",
    feedKey: "dht20-temp",
  },
];

const EnvironmentFactor = ({ factor }) => {
  const { REACT_APP_IO_USERNAME, REACT_APP_IO_KEY } = process.env;
  const [value, setValue] = useState(null);
  const [client, setClient] = useState(null);

  useEffect(() => {
    setClient(
      mqtt.connect("wss://io.adafruit.com:443/mqtt/", {
        username: REACT_APP_IO_USERNAME,
        password: REACT_APP_IO_KEY,
      })
    );
  }, [REACT_APP_IO_KEY, REACT_APP_IO_USERNAME]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(
        `https://io.adafruit.com/api/v2/${REACT_APP_IO_USERNAME}/feeds/${factor.feedKey}/data/last`,
        {
          headers: {
            "X-AIO-Key": REACT_APP_IO_KEY,
          },
        }
      );
      setValue(res.data.value);
    };
    fetchData();
  }, [REACT_APP_IO_USERNAME, REACT_APP_IO_KEY, factor]);

  useEffect(() => {
    if (client == null) {
      return;
    }
    client.on("connect", () => {
      console.log("connected");
      client.subscribe(`${REACT_APP_IO_USERNAME}/feeds/${factor.feedKey}`);
    });

    client.on("message", (_, message) => {
      const data = JSON.parse(message.toString());
      setValue(data);
    });
    return () => {
      client.end();
    };
  }, [client, REACT_APP_IO_KEY, REACT_APP_IO_USERNAME, factor]);

  return (
    <li className={cx("item")} style={{ backgroundColor: factor.color }}>
      <div className={cx("value-box")}>
        <PulseLoader color={factor.color} size={5} loading={value === null} />
        {value !== null && (
          <span style={{ color: factor.color }}>
            {value}
            {factor.unit}
          </span>
        )}
      </div>
      <div className={cx("info")}>
        <span className={cx("name")}>{factor.name}</span>
        <span className={cx("date")}>March 25, 08:00 pm</span>
      </div>
    </li>
  );
};

const Rightbar = () => {
  return (
    <div className={cx("container")}>
      <div className={cx("devices")}>
        <div className={cx("title")}>
          <h1>Devices</h1>
        </div>
        <ul className={cx("list")}>
          {factors.map((factor) => (
            <EnvironmentFactor factor={factor} key={uuidv4()} />
          ))}
        </ul>
      </div>
      <div className={cx("chip")}>
        <div className={cx("wrapper")}>
          <div className={cx("value-box")}>
            <span>30°C</span>
          </div>
          <span className={cx("name")}>Chip's temperature</span>
        </div>
      </div>
    </div>
  );
};

export default Rightbar;

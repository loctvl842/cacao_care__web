import styles from "./style.module.scss";
import classNames from "classnames/bind";

import { v4 as uuidv4 } from "uuid";

// components
import { Device } from "~/components";
// Environment factors
import { factors } from "./factors";
import { useEffect, useState } from "react";
import axios from "axios";
import { io } from "socket.io-client";

let cx = classNames.bind(styles);
var socket;
const Rightbar = () => {
  const { REACT_APP_IO_USERNAME, REACT_APP_SOCKET_ENDPOINT } = process.env;
  const [feeds, setFeeds] = useState([]);
  useEffect(() => {
    const fetchFeeds = async () => {
      try {
        socket = io(REACT_APP_SOCKET_ENDPOINT);
        const res = await axios.get(`/api/v2/${REACT_APP_IO_USERNAME}/feeds`);
        console.log(res.data);
        setFeeds(res.data);
      } catch (e) {
        console.log(e);
      }
    };
    fetchFeeds();
  }, []);
  return (
    <div className={cx("container")}>
      <div className={cx("devices")}>
        <div className={cx("title")}>
          <h1>Devices</h1>
        </div>
        <ul className={cx("list")}>
          {feeds.map((feed) => (
            <Device feed={feed} socket={socket} key={uuidv4()} />
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

import styles from "./style.module.scss";
import classNames from "classnames/bind";

import { SocketContext } from "~/socket";

import { useState, useEffect, useContext } from "react";
import { PulseLoader } from "react-spinners";
import axios from "axios";
import dayjs from "dayjs";

let cx = classNames.bind(styles);

const Device = ({ feed }) => {
  const { REACT_APP_IO_USERNAME, REACT_APP_IO_KEY } = process.env;
  const [value, setValue] = useState(null);
  const [createdAt, setCreatedAt] = useState("");
  const socket = useContext(SocketContext);

  useEffect(() => {
    const topic = `${REACT_APP_IO_USERNAME}/feeds/${feed.key}`;
    socket.on(topic, (data, createdAt) => {
      setValue(data);
      setCreatedAt(createdAt);
    });
  }, [REACT_APP_IO_USERNAME, socket, feed.key]);

  useEffect(() => {
    const fetchLast = async () => {
      const res = await axios.get(
        `/api/v2/${REACT_APP_IO_USERNAME}/feeds/${feed.key}/data/last`,
        {
          headers: {
            "X-AIO-Key": REACT_APP_IO_KEY,
          },
        }
      );
      setValue(res.data.value);
      setCreatedAt(res.data.created_at);
    };
    fetchLast();
  }, [REACT_APP_IO_USERNAME, REACT_APP_IO_KEY, feed.key]);

  return (
    <div className={cx("item")}>
      <div className={cx("value-box")}>
        <PulseLoader color="#bd613c" size={5} loading={value === null} />
        {value !== null && (
          <span>
            {value}
            {feed.unit}
          </span>
        )}
      </div>
      <div className={cx("info")}>
        <span className={cx("name")}>{feed.name}</span>
        <span className={cx("date")}>
          {dayjs(createdAt).format("MMMM D, HH:mm a")}
        </span>
      </div>
    </div>
  );
};

export default Device;

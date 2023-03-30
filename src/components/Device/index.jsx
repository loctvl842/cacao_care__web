import styles from "./style.module.scss";
import classNames from "classnames/bind";

import { SocketContext } from "~/socket";

import { useState, useEffect, useContext } from "react";
import { PulseLoader } from "react-spinners";
import axios from "axios";
import dayjs from "dayjs";
import { useSelector } from "react-redux";

let cx = classNames.bind(styles);

const Device = ({ feed }) => {
  const { user } = useSelector((state) => state.auth);
  const [value, setValue] = useState(null);
  const [createdAt, setCreatedAt] = useState("");
  const socket = useContext(SocketContext);

  useEffect(() => {
    const topic = `${user.username}/feeds/${feed.key}`;
    socket.on(topic, (data, createdAt) => {
      setValue(data);
      setCreatedAt(createdAt);
    });
  }, [user, socket, feed.key]);

  useEffect(() => {
    const fetchLast = async () => {
      const res = await axios.get(
        `/api/v2/${user.username}/feeds/${feed.key}/data/last`,
        {
          headers: {
            "X-AIO-Key": user.active_key,
          },
        }
      );
      setValue(res.data.value);
      setCreatedAt(res.data.created_at);
    };
    fetchLast();
  }, [user, feed.key]);

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

import styles from "./style.module.scss";
import classNames from "classnames/bind";

import { useState, useEffect } from "react";
import { PulseLoader } from "react-spinners";

let cx = classNames.bind(styles);

const Device = ({ feed, socket }) => {
  const { REACT_APP_IO_USERNAME } = process.env;
  const [value, setValue] = useState(null);

  useEffect(() => {
    const topic = `${REACT_APP_IO_USERNAME}/feeds/${feed.key}`;
    socket.on(topic, (data) => setValue(data));
  }, []);

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
        <span className={cx("date")}>March 25, 08:00 pm</span>
      </div>
    </div>
  );
};

export default Device;

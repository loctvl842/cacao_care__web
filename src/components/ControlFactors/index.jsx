import styles from "./style.module.scss";
import classNames from "classnames/bind";

import { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

let cx = classNames.bind(styles);

const ControlFactors = ({min, max, feed_key, title}) => {
  const [value, setValue] = useState(0);
  const { user } = useSelector((state) => state.auth);

  const handleFanSubmit = async (e) => {
    const feed_key = e.currentTarget.name
    try {
      const res = await axios.post(
        `/api/v2/${user.username}/feeds/${feed_key}/data`,
        {
          value: value,
        },
        {
          headers: {
            "X-AIO-Key": user.active_key,
          },
        }
      );
      console.log(res.data);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className={cx("container")}>
      <div className={cx("controller")}>
        <div className={cx("name")}>
          <h1>{title}</h1>
        </div>
        <div className={cx("value-wrapper")}>
          <h2>{value}</h2>
        </div>
        <input
          min={min}
          max={max}
          name={feed_key}
          type="range"
          className={cx("range")}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onMouseUp={handleFanSubmit}
        />
      </div>
    </div>
  );
};

export default ControlFactors;

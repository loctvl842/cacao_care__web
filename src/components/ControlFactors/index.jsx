import styles from "./style.module.scss";
import classNames from "classnames/bind";

import { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

let cx = classNames.bind(styles);

const ControlFactors = () => {
  const [fan, setFan] = useState(0);
  const { user } = useSelector((state) => state.auth);
  const handleFanSubmit = async () => {
    try {
      const res = await axios.post(
        `/api/v2/${user.username}/feeds/yolo-fan/data`,
        {
          value: fan,
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
          <h1>YOLO FAN</h1>
        </div>
        <div className={cx("value-wrapper")}>
          <h2>{fan}</h2>
        </div>
        <input
          type="range"
          className={cx("range")}
          value={fan}
          onChange={(e) => setFan(e.target.value)}
          onMouseUp={handleFanSubmit}
        />
      </div>
    </div>
  );
};

export default ControlFactors;

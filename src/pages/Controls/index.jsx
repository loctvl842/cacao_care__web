import styles from "./style.module.scss";
import classNames from "classnames/bind";

// components
import { ControlFactors } from "~/components";

let cx = classNames.bind(styles);

const Controls = () => {
  return (
    <div className={cx("container")}>
      <div className={cx("wrapper")}>
        <ControlFactors
          title="YOLO FAN"
          feed_key="yolo-fan"
          min={0}
          max={100}
        />
        <ControlFactors
          title="YOLO SERVO"
          feed_key="yolo-servo"
          min={0}
          max={180}
        />
      </div>
    </div>
  );
};

export default Controls;

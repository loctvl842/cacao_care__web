import styles from "./style.module.scss";
import classNames from "classnames/bind";

// components
import { ControlFactors } from "~/components";

let cx = classNames.bind(styles);

const Controls = () => {
  return (
    <div className={cx("container")}>
      <div className={cx("wrapper")}>
        <ControlFactors />
      </div>
    </div>
  );
};

export default Controls;

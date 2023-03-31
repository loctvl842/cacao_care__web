import styles from "./style.module.scss";
import classNames from "classnames/bind";

let cx = classNames.bind(styles);

const Chip = () => {
  return (
    <div className={cx("chip")}>
      <div className={cx("wrapper")}>
        <div className={cx("value-box")}>
          <span>30°C</span>
        </div>
        <span className={cx("name")}>Chip's temperature</span>
      </div>
    </div>
  );
};

export default Chip;

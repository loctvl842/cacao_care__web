import styles from "./style.module.scss";
import classNames from "classnames/bind";

let cx = classNames.bind(styles);

const ControlFactors = () => {
  return <div className={cx("container")}></div>;
};

export default ControlFactors;

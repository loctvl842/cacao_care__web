import styles from "./style.module.scss";
import classNames from "classnames/bind";

let cx = classNames.bind(styles);

const Controls = () => {
  return (
    <div className={cx("container")}>
      <div className={cx("wrapper")}>
        <h1>Controls page</h1>
      </div>
    </div>
  );
};

export default Controls;

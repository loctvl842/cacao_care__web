import styles from "./style.module.scss";
import classNames from "classnames/bind";

// icons
import { HiOutlineBell } from "react-icons/hi";

let cx = classNames.bind(styles);

const Header = () => {
  return (
    <div className={cx("container")}>
      <div className={cx("left")}>
        <img src="/assets/logo/logo.png" alt="" />
      </div>
      <div className={cx("right")}>
        <div className={cx("notification")}>
          <HiOutlineBell />
          <div className={cx("badge")}></div>
        </div>
      </div>
    </div>
  );
};

export default Header;

import styles from "./style.module.scss";
import classNames from "classnames/bind";

let cx = classNames.bind(styles);

const Header = () => {
  return (
    <div className={cx("container")}>
      <h1>Header</h1>
    </div>
  );
};

export default Header;

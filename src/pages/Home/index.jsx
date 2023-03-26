import styles from "./style.module.scss";
import classNames from "classnames/bind";

// components
import { Sidebar } from "~/components";

let cx = classNames.bind(styles);

const Home = () => {
  return (
    <div className={cx("container")}>
      <div className={cx("wrapper")}>
        <Sidebar />
      </div>
    </div>
  );
};

export default Home;

import styles from "./style.module.scss";
import classNames from "classnames/bind";

// components
import { Sidebar, Chart, Rightbar } from "~/components";

let cx = classNames.bind(styles);

const Home = () => {
  return (
    <div className={cx("container")}>
      <div className={cx("wrapper")}>
        <Sidebar />
        <Chart />
        <Rightbar />
      </div>
    </div>
  );
};

export default Home;

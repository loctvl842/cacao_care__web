import styles from "./style.module.scss";
import classNames from "classnames/bind";

// components
import { Sidebar, Chart, Rightbar } from "~/components";
import { AiOutlineMenu } from "react-icons/ai";
import { useState } from "react";

let cx = classNames.bind(styles);

const Home = () => {
  return (
    <div className={cx("container")}>
      <div className={cx("wrapper")}>
        {/* <div className={cx("menu-btn")} onClick={handleSidebarToggle}> */}
        {/*   <AiOutlineMenu /> */}
        {/* </div> */}
        <Sidebar />
        <Chart />
        <Rightbar />
      </div>
    </div>
  );
};

export default Home;

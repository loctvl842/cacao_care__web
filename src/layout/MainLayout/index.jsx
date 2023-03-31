import styles from "./style.module.scss";
import classNames from "classnames/bind";

import { Fragment, useState } from "react";
import { v4 as uuidv4 } from "uuid";

// components
import { Header, Sidebar } from "~/components";

// icons
import { AiOutlineMenu } from "react-icons/ai";

let cx = classNames.bind(styles);

const MainLayout = ({ components }) => {
  const [visible, setVisible] = useState(false);

  const handleMenuBtnClick = () => {
    setVisible((visible) => !visible);
  };

  return (
    <div className={cx("container")}>
      {/* header here */}
      <div className={cx("header-wrapper")}>
        <Header />
      </div>
      <div className={cx("content-wrapper")}>
        <div className={cx("sidebar-wrapper", { visible: visible })}>
          <div className={cx("menu-btn")} onClick={handleMenuBtnClick}>
            <AiOutlineMenu />
          </div>
          <Sidebar />
        </div>
        <div className={cx("content")}>
          {Array.isArray(components)
            ? components.map((c) => <Fragment key={uuidv4()}>{c}</Fragment>)
            : components}
        </div>
      </div>
      {/* footer here */}
      {/* <br /> */}
      {/* <br /> */}
    </div>
  );
};

export default MainLayout;

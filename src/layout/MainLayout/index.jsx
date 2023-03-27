import styles from "./style.module.scss";
import classNames from "classnames/bind";

import { Fragment } from "react";
import { v4 as uuidv4 } from "uuid";

import { Header } from "~/components";

let cx = classNames.bind(styles);

const MainLayout = ({ components }) => {
  return (
    <div className={cx("container")}>
      {/* header here */}
      <div className={cx("header-wrapper")}>
        <Header />
      </div>
      <div className={cx("content-wrapper")}>
        {Array.isArray(components)
          ? components.map((c) => <Fragment key={uuidv4()}>{c}</Fragment>)
          : components}
      </div>
      {/* footer here */}
      {/* <br /> */}
      {/* <br /> */}
    </div>
  );
};

export default MainLayout;

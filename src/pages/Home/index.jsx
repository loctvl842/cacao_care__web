import styles from "./style.module.scss";
import classNames from "classnames/bind";

// components
import { Sidebar, Chart, Rightbar } from "~/components";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
let cx = classNames.bind(styles);

const Home = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  useEffect(() => {
    if (user === null) navigate("/login");
  }, [user, navigate]);
  return (
    <div className={cx("container")}>
      <div className={cx("wrapper")}>
        <Sidebar />
        {user !== null && (
          <>
            <Chart />
            <Rightbar />
          </>
        )}
      </div>
    </div>
  );
};

export default Home;

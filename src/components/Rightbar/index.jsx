import styles from "./style.module.scss";
import classNames from "classnames/bind";

// components
import { Device } from "~/components";

import { v4 as uuidv4 } from "uuid";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

let cx = classNames.bind(styles);

const Rightbar = () => {
  const navigate = useNavigate();
  const [feeds, setFeeds] = useState([]);
  const { user } = useSelector((state) => state.auth);
  useEffect(() => {
    if (user === null) navigate("/login");
    const fetchFeeds = async () => {
      try {
        const res = await axios.get(`/api/v2/${user.username}/feeds`);
        setFeeds(res.data);
      } catch (e) {
        console.log(e);
      }
    };
    fetchFeeds();
  }, [user, navigate]);
  return (
    <div className={cx("container")}>
      <div className={cx("devices")}>
        <div className={cx("title")}>
          <h1>Devices</h1>
        </div>
        <ul className={cx("list")}>
          {feeds.map((feed) => (
            <Device feed={feed} key={uuidv4()} />
          ))}
        </ul>
      </div>
      <div className={cx("chip")}>
        <div className={cx("wrapper")}>
          <div className={cx("value-box")}>
            <span>30°C</span>
          </div>
          <span className={cx("name")}>Chip's temperature</span>
        </div>
      </div>
    </div>
  );
};

export default Rightbar;

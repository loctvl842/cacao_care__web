import styles from "./style.module.scss";
import classNames from "classnames/bind";

// components
import { Device } from "~/components";

// actions
import { feedSet, feedSetCurrentById } from "~/store/feedSlice";

import { v4 as uuidv4 } from "uuid";
import { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

let cx = classNames.bind(styles);

const Rightbar = () => {
  const dispatch = useDispatch();
  const feeds = useSelector((state) => state.feed.feeds);
  const { user } = useSelector((state) => state.auth);

  const handleFeedClick = (feed) => {
    dispatch(feedSetCurrentById(feed.id));
  };

  useEffect(() => {
    const fetchFeeds = async () => {
      try {
        const res = await axios.get(`/api/v2/${user.username}/feeds`);
        dispatch(feedSet(res.data));
      } catch (e) {
        console.log(e);
      }
    };
    fetchFeeds();
  }, [user, dispatch]);
  return (
    <div className={cx("container")}>
      <div className={cx("devices")}>
        <div className={cx("title")}>
          <h1>Devices</h1>
        </div>
        <ul className={cx("list")}>
          {feeds.map((feed) => (
            <li key={uuidv4()} onClick={() => handleFeedClick(feed)}>
              <Device feed={feed} />
            </li>
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

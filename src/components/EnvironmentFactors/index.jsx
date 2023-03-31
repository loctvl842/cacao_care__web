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

const EnvironmentFactors = () => {
  const dispatch = useDispatch();
  const feeds = useSelector((state) => state.feed.feeds);
  const { user } = useSelector((state) => state.auth);

  const handleFeedClick = (feed) => {
    dispatch(feedSetCurrentById(feed.id));
  };

  useEffect(() => {
    const fetchFeeds = async () => {
      try {
        const res = await axios.get(
          `/api/v2/${user.username}/groups/overview/feeds`
        );
        dispatch(feedSet(res.data));
      } catch (e) {
        console.log(e);
      }
    };
    fetchFeeds();
  }, [user, dispatch]);
  return (
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
  );
};

export default EnvironmentFactors;

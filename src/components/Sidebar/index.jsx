import styles from "./style.module.scss";
import classNames from "classnames/bind";

// icons
import { BsHouse, BsGraphUp, BsToggleOff } from "react-icons/bs";
import { FiSettings } from "react-icons/fi";
import { SiAdafruit } from "react-icons/si";

import { useNavigate, NavLink } from "react-router-dom";

let cx = classNames.bind(styles);

const Sidebar = () => {
  const navigate = useNavigate();

  return (
    <div className={cx("container")}>
      <div className={cx("menu")}>
        <div className={cx("title")}>
          <h1>Menu</h1>
        </div>
        <ul className={cx("list")}>
          <li className={cx("item")}>
            <NavLink to="/">
              {({ isActive }) => (
                <div className={cx("option-wrapper", { active: isActive })}>
                  <div className={cx("icon")}>
                    <BsHouse />
                  </div>
                  <span>Overview</span>
                </div>
              )}
            </NavLink>
          </li>
          <li className={cx("item")}>
            <NavLink to="/controls">
              {({ isActive }) => (
                <div className={cx("option-wrapper", { active: isActive })}>
                  <div className={cx("icon")}>
                    <BsToggleOff />
                  </div>
                  <span>Controls</span>
                </div>
              )}
            </NavLink>
          </li>
          <li className={cx("item")}>
            <div className={cx("option-wrapper")}>
              <div className={cx("icon")}>
                <BsGraphUp />
              </div>
              <span>Statistics</span>
            </div>
          </li>
        </ul>
      </div>
      <div className={cx("menu")}>
        <div className={cx("title")}>
          <h1>Account</h1>
        </div>
        <ul className={cx("list")}>
          <li className={cx("item")} onClick={() => navigate("/login")}>
            <div className={cx("option-wrapper")}>
              <div className={cx("icon")}>
                <SiAdafruit />
              </div>
              <span>Adafruit IO</span>
            </div>
          </li>
          <li className={cx("item")}>
            <div className={cx("option-wrapper")}>
              <div className={cx("icon")}>
                <FiSettings />
              </div>
              <span>Settings</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;

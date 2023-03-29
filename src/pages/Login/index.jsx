import styles from "./style.module.scss";
import classNames from "classnames/bind";

import axios from "axios";
import { useNavigate } from "react-router-dom";
import { PulseLoader } from "react-spinners";
import { useState } from "react";

let cx = classNames.bind(styles);

const Login = () => {
  const navigate = useNavigate();
  const [fetching, setFetching] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const dataArray = [...formData];
    const input_data = Object.fromEntries(dataArray);
    try {
      setFetching(true);
      const res = await axios.post("/api/auth/login", {
        io_username: input_data.username,
        io_key: input_data.active_key,
      });
      setFetching(false);
      if (res.data.success) {
        navigate("/");
      }
    } catch (e) {
      setFetching(false);
      console.log(e);
    }
  };
  return (
    <div className={cx("container")}>
      <div className={cx("left")}>
        <div className={cx("img-wrapper")}>
          <img src="/assets/cacao_tree.jpg" alt="" />
        </div>
      </div>
      <div className={cx("right")}>
        <div className={cx("logo")}>
          <img src="/assets/logo/logo.png" alt="" />
        </div>
        <div className={cx("form-wrapper")}>
          <form className={cx("form-data")} onSubmit={handleSubmit}>
            <div className={cx("form-control")}>
              <input
                className="form-control"
                name="username"
                type="text"
                placeholder="Username"
              />
            </div>
            <div className={cx("form-control")}>
              <input
                className="form-control"
                name="active_key"
                type="text"
                placeholder="Active Key"
              />
            </div>
            <div className={cx("submit-btn-wrapper")}>
              <button type="submit" className={cx("submit-btn")}>
                <PulseLoader color="#fff" size={5} loading={fetching} />
                {!fetching && <span>GO</span>}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

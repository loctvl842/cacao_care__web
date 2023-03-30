import styles from "./style.module.scss";
import classNames from "classnames/bind";

import axios from "axios";
import { useNavigate } from "react-router-dom";
import { PulseLoader } from "react-spinners";
import { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// actions
import { authStart, authSuccess, authFail, authReset } from "~/store/authSlice";
import { SocketContext } from "~/socket";

let cx = classNames.bind(styles);

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const socket = useContext(SocketContext);
  const { fetching, error } = useSelector((state) => state.auth);

  useEffect(() => {
    let timeoutId;
    socket.on("error", (msg) => {
      dispatch(authFail(msg));
      timeoutId = setTimeout(() => {
        dispatch(authReset());
      }, 3000);
    });
    return () => {
      clearTimeout(timeoutId);
    };
  }, [socket, dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const dataArray = [...formData];
    const input_data = Object.fromEntries(dataArray);
    try {
      dispatch(authStart());
      const res = await axios.post("/api/auth/login", {
        adafruit: {
          io_username: input_data.username,
          io_key: input_data.active_key,
        },
        socketId: socket.id,
      });
      if (res.data.success) {
        dispatch(authSuccess(input_data));
        localStorage.setItem("user", JSON.stringify(input_data));
        navigate("/");
      }
    } catch (e) {
      dispatch(authFail(e.response.data.error));
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
          <div className={cx("message-wrapper", { visible: error !== "" })}>
            <div className={cx("message")}>
              <p>{error}</p>
            </div>
          </div>
          <form className={cx("form-data")} onSubmit={handleSubmit}>
            <label htmlFor="username" className={cx("form-control")}>
              <input
                className="form-control"
                id="username"
                name="username"
                type="text"
                placeholder="Username"
              />
            </label>
            <label htmlFor="active_key" className={cx("form-control")}>
              <input
                className="form-control"
                id="active_key"
                name="active_key"
                type="text"
                placeholder="Active Key"
              />
            </label>
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

import styles from "./style.module.scss";
import classNames from "classnames/bind";

let cx = classNames.bind(styles);

const Login = () => {
  return (
    <div className={cx("container")}>
      <div className={cx("left")}>
        <div className={cx("form-wrapper")}>
          <form className={cx("form-data")}>
            <div className={cx("form-control")}>
              <input
                className="form-control"
                type="text"
                placeholder="Username"
              />
            </div>
            <div className={cx("form-control")}>
              <input
                className="form-control"
                type="text"
                placeholder="Active Key"
              />
            </div>
          </form>
        </div>
      </div>
      <div className={cx("right")}>
        <img src="/login_img.jpeg" alt="" />
      </div>
    </div>
  );
};

export default Login;

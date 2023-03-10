import Home from "~/pages/Home";
import Login from "~/pages/Login";

const pages = [
  { path: ["/", "/home"], element: <Home /> },
  { path: "/login", element: <Login /> },
];

export default pages;

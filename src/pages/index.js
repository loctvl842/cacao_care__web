// layout
import { MainLayout } from "~/layout";

// pages
import Home from "~/pages/Home";
import Login from "~/pages/Login";

const pages = [
  { path: ["/", "/home"], components: <Home />, layout: MainLayout },
  { path: "/login", components: <Login /> },
];

export default pages;

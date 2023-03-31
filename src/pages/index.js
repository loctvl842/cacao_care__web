// layout
import { MainLayout } from "~/layout";

// pages
import Home from "~/pages/Home";
import Login from "~/pages/Login";
import Controls from "~/pages/Controls";

const pages = [
  { path: ["/", "/home"], components: <Home />, layout: MainLayout },
  { path: "/login", components: <Login /> },
  { path: "/controls", components: <Controls />, layout: MainLayout },
];

export default pages;

import { MainLayout } from "~/layout";

import Home from "~/pages/Home";

const pages = [
  { path: ["/", "/home"], components: <Home />, layout: MainLayout },
];

export default pages;

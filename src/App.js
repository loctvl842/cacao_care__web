import { } from "./main.scss";
import { Fragment } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

import pages from "~/pages";
import { EmptyLayout } from "~/layout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {pages.map((page) => {
          const Layout = page.layout;
          const Element = page.layout ? (
            <Layout components={page.components} />
          ) : (
            <EmptyLayout components={page.components} />
          );
          return Array.isArray(page.path) ? (
            <Fragment key={uuidv4()}>
              {page.path.map((path) => {
                return <Route key={uuidv4()} path={path} element={Element} />;
              })}
            </Fragment>
          ) : (
            <Route key={uuidv4()} path={page.path} element={Element} />
          );
        })}
      </Routes>
    </BrowserRouter>
  );
}

export default App;

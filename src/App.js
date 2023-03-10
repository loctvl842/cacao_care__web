import { Fragment } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import pages from "~/pages";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {pages.map((page) => {
          if (Array.isArray(page.path)) {
            const paths = page.path;
            return (
              <Fragment key={uuidv4()}>
                {paths.map((path) => (
                  <Route key={uuidv4()} path={path} element={page.element} />
                ))}
              </Fragment>
            );
          } else {
            return (
              <Route key={uuidv4()} path={page.path} element={page.element} />
            );
          }
        })}
      </Routes>
    </BrowserRouter>
  );
}

export default App;

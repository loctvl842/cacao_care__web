import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { SocketProvider } from "./socket";
import { Provider } from "react-redux";
import store from "~/store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <SocketProvider>
    <Provider store={store}>
      <App />
    </Provider>
  </SocketProvider>
);

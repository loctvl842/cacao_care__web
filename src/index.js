import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { SocketContext, socket } from "./socket";
import { Provider } from "react-redux";
import store from "~/store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <SocketContext.Provider value={socket}>
    <Provider store={store}>
      <App />
    </Provider>
  </SocketContext.Provider>
);

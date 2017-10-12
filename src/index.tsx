import * as React from "react";
import * as ReactDOM from "react-dom";
import registerServiceWorker from "./registerServiceWorker";
// import './index.css';
import { AppRoutes } from "./components/AppRoutes";

ReactDOM.render(
  <AppRoutes />,
  document.getElementById("root") as HTMLElement
);
registerServiceWorker();

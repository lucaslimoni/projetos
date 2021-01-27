if (__DEV__) {
  import("../ReactotronConfig").then(() =>
    console.log("Reactotron Configured")
  );
}
console.disableYellowBox = true;
import React from "react";
import Routes from "./routes";
import "./config/StatusBarConfig";

import { decode, encode } from "base-64";

if (!global.btoa) {
  global.btoa = encode;
}

if (!global.atob) {
  global.atob = decode;
}
const App = () => <Routes />;

export default App;

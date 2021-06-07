import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import App from "./App";
import SeenQuotes from "./SeenQuotes";
function Routing() {
  return (
    <Router>
      <Switch>
        <Route path="/SeenQuotes" component={SeenQuotes} />
        <Route path="/" component={App} />
      </Switch>
    </Router>
  );
}

export default Routing;

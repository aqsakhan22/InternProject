import "bootstrap/dist/css/bootstrap.min.css";

import Dashboard from "./dashboard";

import React, { Component } from "react";

export default class App extends Component {
  render() {
    return (
      <div className="App">
        <Dashboard />
      </div>
    );
  }
}

import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";

import "./App.css";

import Home from "./components/Home";
import Landing from "./components/Landing";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false
    };
  }

  render() {
    return (
      <div className="app">
        <section className="app-body">
          <header></header>
          <section className="app-component-switch">
            <Switch>
              <Route exact path="/" component={Landing} />
              <Route exact path="/home" component={Home} />
            </Switch>
          </section>
          <footer></footer>
        </section>
      </div>
    );
  }
}

export default App;

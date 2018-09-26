import React, { Component, Fragment } from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import Header from "./components/Header";
import ProfileForm from "./components/ProfileForm";
import SignUpPage from "./views/SignUpPage";
import MainPage from "./views/MainPage";
import TestPage from "./views/TestPage";
import ProfilePage from "./views/ProfilePage";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaw } from "@fortawesome/free-solid-svg-icons";

import "./App.css";

class App extends Component {
  state = {
    timestamp: ""
  };

  render() {
    return (
      <Fragment>
        <Header />

        <Switch>
          <Route exact path="/signup" component={SignUpPage} />
          <Route exact path="/profile" component={ProfilePage} />
          <Route exact path="/profile/edit" component={ProfileForm} />
          <Route exact path="/test" component={TestPage} />
          <Route exact path="/" component={MainPage} />
        </Switch>
      </Fragment>
    );
  }
}
library.add(faPaw);

export default withRouter(App);

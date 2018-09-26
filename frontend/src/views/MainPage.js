import React, { Component } from "react";
import Dashboard from "../components/Dashboard";
import LandingPage from "./LandingPage";
import withAuth from "../hocs/withAuth";

const AuthedDashboard = withAuth(Dashboard);

class MainPage extends Component {
  render() {
    return (
      <div>{localStorage.jwt ? <AuthedDashboard /> : <LandingPage />}</div>
    );
  }
}

export default MainPage;

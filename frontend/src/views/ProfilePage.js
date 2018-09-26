import React, { Component, Fragment } from "react";
import { withRouter } from "react-router-dom";
import withAuth from "../hocs/withAuth";
import LandingPage from "./LandingPage";
import ProfileContainer from "../components/ProfileContainer";

const AuthedProfileContainer = withAuth(ProfileContainer);

class ProfilePage extends Component {
  render() {
    return (
      <Fragment>
        {localStorage.jwt ? <AuthedProfileContainer /> : <LandingPage />}
      </Fragment>
    );
  }
}

export default withRouter(ProfilePage);

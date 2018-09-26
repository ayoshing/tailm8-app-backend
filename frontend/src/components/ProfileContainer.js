import React, { Component, Fragment } from "react";
import ProfileBar from "./ProfileBar";
import MenuDrawer from "./MenuDrawer";
import Navigation from "./Navigation";

class ProfileContainer extends Component {
  render() {
    return (
      <Fragment>
        <MenuDrawer />
        <ProfileBar />
        <Navigation />
      </Fragment>
    );
  }
}

export default ProfileContainer;

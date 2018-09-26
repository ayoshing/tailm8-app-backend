import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import HomeIcon from "@material-ui/icons/Home";
import FavoriteIcon from "@material-ui/icons/Favorite";
import NotificationsIcon from "@material-ui/icons/Notifications";

const styles = {
  root: {
    width: "100%",
    position: "fixed",
    bottom: 0
  }
};

class SimpleBottomNavigation extends React.Component {
  state = {
    value: 0
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <BottomNavigation
        value={value}
        onChange={this.handleChange}
        showLabels
        className={classes.root}
      >
        <BottomNavigationAction
          component={Link}
          to="/"
          label={<span style={{ color: "chocolate" }}>Home</span>}
          icon={<HomeIcon style={{ color: "chocolate" }} />}
        />

        {/* TODO: stretch feature priority: medium (after chat feature)
          <BottomNavigationAction
          label="Notifications"
          icon={<NotificationsIcon />}
        /> */}
        {/* <BottomNavigationAction
          component={Link}
          to="/test"
          label={<span style={{ color: "chocolate" }}>Furiends</span>}
          icon={<FavoriteIcon style={{ color: "chocolate" }} />}
        /> */}
      </BottomNavigation>
    );
  }
}

SimpleBottomNavigation.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SimpleBottomNavigation);

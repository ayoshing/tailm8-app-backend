import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { closeMenuAction } from "../redux/actions/profileActions";
import Menu from "./Menu";
import StarIcon from "@material-ui/icons/Star";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import InboxIcon from "@material-ui/icons/MoveToInbox";

class MenuDrawer extends React.Component {
  toggleDrawer = () => {
    this.props.closeMenuAction();
  };

  render() {
    return (
      <div>
        <Drawer open={this.props.left} onClose={this.toggleDrawer}>
          <div
            tabIndex={0}
            role="button"
            onClick={this.toggleDrawer}
            onKeyDown={this.toggleDrawer}
          >
            <Menu />
          </div>
        </Drawer>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  userName: state.auth.user.name,
  left: state.profile.menuOpen
});

export default connect(
  mapStateToProps,
  { closeMenuAction }
)(withRouter(MenuDrawer));

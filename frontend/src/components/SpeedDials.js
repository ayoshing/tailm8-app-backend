import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import SpeedDial from "@material-ui/lab/SpeedDial";
import SpeedDialIcon from "@material-ui/lab/SpeedDialIcon";
import SpeedDialAction from "@material-ui/lab/SpeedDialAction";
import CreateIcon from "@material-ui/icons/Create";
import ChatIcon from "@material-ui/icons/Chat";
import EventIcon from "@material-ui/icons/Event";
import { connect } from "react-redux";
import { openDialogAction } from "../redux/actions/postActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const styles = theme => ({
  root: {
    height: 0
  },
  speedDial: {
    position: "fixed",
    bottom: theme.spacing.unit * 7,
    right: theme.spacing.unit * 3
  }
});

const actions = [
  { icon: <CreateIcon />, name: "Post" }
  // { icon: <ChatIcon />, name: "Chat" }
  // TODO: stretch feature priority: medium { icon: <EventIcon />, name: "Event" }
];

class SpeedDials extends React.Component {
  state = {
    open: false,
    hidden: false
  };

  handleVisibility = () => {
    this.setState(state => ({
      open: false,
      hidden: !state.hidden
    }));
  };

  handleClick = () => {
    this.setState(state => ({
      open: !state.open
    }));
  };

  handleClickAction = dialAction => {
    switch (dialAction) {
      case "Post":
        this.props.openDialogAction();
        break;
      case "Chat":
        return null;
      case "Event":
        return null;
      default:
        break;
    }
  };

  handleOpen = () => {
    if (!this.state.hidden) {
      this.setState({
        open: true
      });
    }
  };

  handleClose = () => {
    this.setState({
      open: false
    });
  };

  render() {
    const { classes } = this.props;
    const { hidden, open } = this.state;

    let isTouch;
    if (typeof document !== "undefined") {
      isTouch = "ontouchstart" in document.documentElement;
    }

    return (
      <div className={classes.root}>
        <SpeedDial
          ariaLabel="SpeedDial"
          className={classes.speedDial}
          hidden={hidden}
          icon={<SpeedDialIcon />}
          onBlur={this.handleClose}
          onClick={this.handleClick}
          onClose={this.handleClose}
          onFocus={isTouch ? undefined : this.handleOpen}
          onMouseEnter={isTouch ? undefined : this.handleOpen}
          onMouseLeave={this.handleClose}
          open={open}
        >
          {actions.map(action => (
            <SpeedDialAction
              key={action.name}
              icon={action.icon}
              tooltipTitle={action.name}
              onClick={() => this.handleClickAction(action.name)}
            />
          ))}
        </SpeedDial>
      </div>
    );
  }
}

SpeedDials.propTypes = {
  classes: PropTypes.object.isRequired
};
//
// const mapStateToProps = state => ({
//   auth: state.auth,
//   profile: state.profile,
//   post: state.post,
//   errors: state.errors
// });

export default connect(
  null,
  { openDialogAction }
)(withStyles(styles)(SpeedDials));

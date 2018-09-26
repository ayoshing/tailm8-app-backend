import React from "react";
import Divider from "@material-ui/core/Divider";
import Avatar from "@material-ui/core/Avatar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import DraftsIcon from "@material-ui/icons/Drafts";
import StarIcon from "@material-ui/icons/Star";
import ExitIcon from "@material-ui/icons/ExitToApp";
import DeleteIcon from "@material-ui/icons/Delete";
import ReportIcon from "@material-ui/icons/Report";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { logOutUserAction } from "../redux/actions/authActions";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const styles = {
  list: {
    width: 250
  },
  avatar: {
    backgroundColor: "chocolate",
    color: "white"
  }
};

const Menu = props => {
  const handleClick = () => {
    props.logOutUserAction();
    localStorage.removeItem("jwt");
  };

  const { classes } = props;

  return (
    <div className={classes.list}>
      <List>
        <div>
          <ListItem button>
            <ListItemIcon>
              <Avatar className={classes.avatar}>{props.name.charAt(0)}</Avatar>
            </ListItemIcon>
            <ListItemText primary={props.name} />
          </ListItem>
          {/* <Link to="/profile/edit" style={{ textDecoration: "none" }}> */}
          <ListItem button component={Link} to="/profile">
            <ListItemIcon>
              <Avatar className={classes.avatar}>
                <FontAwesomeIcon icon="paw" size="lg" />
              </Avatar>
            </ListItemIcon>
            <ListItemText primary={props.userName} />
          </ListItem>
          {/* </Link> */}
        </div>
      </List>
      <Divider />

      {/* TODO: stretch feature priority: low
        <ListItem button>
        <ListItemIcon>
          <DraftsIcon />
        </ListItemIcon>
        <ListItemText primary="Favorites*" />
      </ListItem> */}
      <Divider />
      {/* TODO: stretch feature priority: low
        <ListItem button>
        <ListItemIcon>
          <MailIcon />
        </ListItemIcon>
        <ListItemText primary="Settings(Display Only)" />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <DeleteIcon />
        </ListItemIcon>
        <ListItemText primary="Help Center(Display Only)" />
      </ListItem> */}
      <ListItem button onClick={handleClick}>
        <ListItemIcon>
          <Avatar className={classes.avatar}>
            <ExitIcon />
          </Avatar>
        </ListItemIcon>
        <ListItemText primary="Logout" />
      </ListItem>
    </div>
  );
};

Menu.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  userName: state.profile.profile.userName,
  name: state.auth.user.name
});

export default connect(
  mapStateToProps,
  { logOutUserAction }
)(withStyles(styles)(Menu));

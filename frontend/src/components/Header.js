import React from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { connect } from "react-redux";
import { logOutUserAction } from "../redux/actions/authActions";
import { openMenuAction } from "../redux/actions/profileActions";
import { clearErrorsAction } from "../redux/actions/postActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const styles = {
  root: {
    flexGrow: 1
  }
};

function SimpleAppBar(props) {
  const { classes } = props;
  const handleClick = e => {
    props.openMenuAction();
  };
  const handleHome = () => {
    props.clearErrorsAction();
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Toolbar>
          <Grid
            container
            spacing={16}
            alignItems="center"
            // justify="flex-end"
            direction="row"
          >
            {localStorage.jwt ? (
              <Grid item>
                <IconButton
                  className={classes.menuButton}
                  aria-label="Menu"
                  onClick={handleClick}
                  style={{ color: "chocolate" }}
                >
                  <MenuIcon />
                </IconButton>
              </Grid>
            ) : null}
            <Grid item onClick={handleHome}>
              <Link to="/" style={{ textDecoration: "none", color: "black" }}>
                <Typography variant="title" style={{ color: "chocolate" }}>
                  TAILM8 <FontAwesomeIcon icon="paw" size="1x" />
                </Typography>
              </Link>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </div>
  );
}

SimpleAppBar.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logOutUserAction, openMenuAction, clearErrorsAction }
)(withRouter(withStyles(styles)(SimpleAppBar)));

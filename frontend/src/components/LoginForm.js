import React from "react";
import PropTypes from "prop-types";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import Paper from "@material-ui/core/Paper";
import withStyles from "@material-ui/core/styles/withStyles";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { logInUser } from "../redux/actions/authActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const styles = theme => ({
  layout: {
    width: "auto",
    display: "block", // Fix IE11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`
  },
  form: {
    width: "100%", // Fix IE11 issue.
    marginTop: theme.spacing.unit
  },
  submit: {
    marginTop: theme.spacing.unit * 3
  }
});

class LoginForm extends React.Component {
  state = {
    email: "",
    password: ""
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleClick = e => {
    e.preventDefault();

    let userData = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.logInUser(userData, this.props.history);
  };

  render() {
    const { classes } = this.props;
    const { errors } = this.props;

    return (
      <React.Fragment>
        <CssBaseline />
        <main className={classes.layout}>
          <Paper className={classes.paper}>
            {/* <FontAwesomeIcon
              icon="paw"
              size="4x"
              style={{ color: "chocolate" }}
            /> */}

            <form className={classes.form}>
              <FormControl
                margin="normal"
                required
                fullWidth
                error={errors.email}
              >
                <InputLabel htmlFor="email">Email Address</InputLabel>
                <Input
                  id="email"
                  name="email"
                  autoComplete="email"
                  value={this.state.email}
                  onChange={this.handleChange}
                  autoFocus
                />
                <FormHelperText error>{errors.email}</FormHelperText>
              </FormControl>
              <FormControl
                margin="normal"
                required
                fullWidth
                error={errors.password}
              >
                <InputLabel htmlFor="password">Password</InputLabel>
                <Input
                  name="password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={this.state.password}
                  onChange={this.handleChange}
                />
                <FormHelperText error>{errors.password}</FormHelperText>
              </FormControl>
              <Button
                type="submit"
                fullWidth
                style={{ color: "chocolate" }}
                className={classes.submit}
                onClick={this.handleClick}
              >
                <FontAwesomeIcon
                  icon="paw"
                  size="4x"
                  style={{ color: "chocolate" }}
                />
              </Button>
            </form>
          </Paper>
        </main>
      </React.Fragment>
    );
  }
}

LoginForm.propTypes = {
  classes: PropTypes.object.isRequired,
  logInUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    auth: state.auth,
    errors: state.errors
  };
};

export default connect(
  mapStateToProps,
  { logInUser }
)(withStyles(styles)(withRouter(LoginForm)));

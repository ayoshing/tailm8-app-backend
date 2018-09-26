import React from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import Paper from "@material-ui/core/Paper";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import withStyles from "@material-ui/core/styles/withStyles";
import { connect } from "react-redux";
import { signUpUser } from "../redux/actions/authActions";
import { withRouter } from "react-router-dom";
import FormHelperText from "@material-ui/core/FormHelperText";
import { clearErrorsAction } from "../redux/actions/postActions";

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
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120
  }
});

class SignUpForm extends React.Component {
  state = {
    name: "",
    email: "",
    password: "",
    password2: "",
    accountType: ""
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleClick = e => {
    e.preventDefault();

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2,
      accountType: this.state.accountType
    };

    this.props.signUpUser(newUser, this.props.history);
    this.props.clearErrorsAction();
  };

  render() {
    const { classes } = this.props;
    const { errors } = this.props;

    return (
      <React.Fragment>
        <CssBaseline />
        <main className={classes.layout}>
          <Paper className={classes.paper}>
            <form className={classes.form}>
              <FormControl
                margin="normal"
                required
                fullWidth
                error={errors.name}
              >
                <InputLabel htmlFor="email">Name</InputLabel>
                <Input
                  id="name"
                  name="name"
                  autoComplete="name"
                  value={this.state.name}
                  onChange={this.handleChange}
                  autoFocus
                />
                <FormHelperText error>{errors.name}</FormHelperText>
              </FormControl>

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

              <FormControl
                margin="normal"
                required
                fullWidth
                error={errors.password2}
              >
                <InputLabel htmlFor="password2">Confirm Password</InputLabel>
                <Input
                  name="password2"
                  type="password"
                  id="password2"
                  autoComplete="current-password"
                  value={this.state.password2}
                  onChange={this.handleChange}
                />
                <FormHelperText error>{errors.password2}</FormHelperText>
              </FormControl>

              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="accountType">Account Type</InputLabel>
                <Select
                  value={this.state.accountType}
                  onChange={this.handleChange}
                  inputProps={{
                    name: "accountType",
                    id: "accountType"
                  }}
                >
                  <MenuItem value="Pet">
                    <em>Pet (Default)</em>
                  </MenuItem>
                  <MenuItem value="Business">Business</MenuItem>
                </Select>
              </FormControl>

              <Button
                type="submit"
                fullWidth
                variant="outlined"
                color="primary"
                className={classes.submit}
                onClick={this.handleClick}
              >
                Create Account
              </Button>
            </form>
          </Paper>
        </main>
      </React.Fragment>
    );
  }
}

SignUpForm.propTypes = {
  classes: PropTypes.object.isRequired,
  signUpUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default withRouter(
  connect(
    mapStateToProps,
    { signUpUser, clearErrorsAction }
  )(withStyles(styles)(SignUpForm))
);

import React from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import Paper from "@material-ui/core/Paper";
import withStyles from "@material-ui/core/styles/withStyles";
import { connect } from "react-redux";
import { createProfile } from "../redux/actions/profileActions";
import { withRouter } from "react-router-dom";
import DatePickers from "./DatePickers";
import GenderRadioButton from "./GenderRadioButton";
import PhoneTextField from "./PhoneTextField";
import Typography from "@material-ui/core/Typography";
import { clearErrorsAction } from "../redux/actions/postActions";
import MenuDrawer from "./MenuDrawer";

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
  },
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200
  }
});

class ProfileForm extends React.Component {
  state = {
    userName: "",
    birthday: "",
    breed: "",
    gender: "",
    phone: "",
    location: "",
    website: "",
    bio: "",
    instagram: "",
    facebook: "",
    twitter: ""
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  getPhone = phone => {
    this.setState({
      phone
    });
  };

  handleClick = e => {
    e.preventDefault();

    const newUser = {
      userName: this.state.userName,
      birthday: this.state.birthday,
      breed: this.state.breed,
      gender: this.state.gender,
      phone: this.state.phone,
      location: this.state.location,
      website: this.state.website,
      bio: this.state.bio,
      instagram: this.state.instagram,
      facebook: this.state.facebook,
      twitter: this.state.twitter
    };

    this.props.createProfile(newUser, this.props.history);
    this.props.clearErrorsAction();
  };

  render() {
    const { classes } = this.props;

    const isEmpty = value =>
      value === undefined ||
      value === null ||
      (typeof value === "object" && Object.keys(value).length === 0) ||
      (typeof value === "string" && value.trim().length === 0);

    return (
      <React.Fragment>
        <MenuDrawer />
        <CssBaseline />
        <main className={classes.layout}>
          <Paper className={classes.paper}>
            {isEmpty(this.props.profile.profile) ? (
              <Typography variant="headline">Create Profile</Typography>
            ) : (
              <Typography variant="headline">Edit Profile</Typography>
            )}

            <form className={classes.form}>
              <FormControl margin="normal" fullWidth>
                <InputLabel htmlFor="email">Pet's Name</InputLabel>
                <Input
                  id="userName"
                  name="userName"
                  value={this.state.userName}
                  onChange={this.handleChange}
                  autoFocus
                />
              </FormControl>

              <FormControl margin="normal" fullWidth>
                <InputLabel htmlFor="breed">Breed</InputLabel>
                <Input
                  name="breed"
                  id="breed"
                  value={this.state.breed}
                  onChange={this.handleChange}
                />
              </FormControl>
              <FormControl margin="normal" fullWidth>
                <InputLabel htmlFor="bio">Bio</InputLabel>
                <Input
                  name="bio"
                  id="bio"
                  value={this.state.bio}
                  onChange={this.handleChange}
                  rows={3}
                  multiline
                />
              </FormControl>

              <DatePickers onChange={this.handleChange} />
              <GenderRadioButton onChange={this.handleChange} />

              <FormControl margin="normal" fullWidth>
                <InputLabel htmlFor="instagram">Instagram</InputLabel>
                <Input
                  name="instagram"
                  id="instagram"
                  value={this.state.instagram}
                  onChange={this.handleChange}
                />
              </FormControl>

              <FormControl margin="normal" fullWidth>
                <InputLabel htmlFor="facebook">Facebook</InputLabel>
                <Input
                  name="facebook"
                  id="facebook"
                  value={this.state.facebook}
                  onChange={this.handleChange}
                />
              </FormControl>

              <FormControl margin="normal" fullWidth>
                <InputLabel htmlFor="twitter">Twitter</InputLabel>
                <Input
                  name="twitter"
                  id="twitter"
                  value={this.state.twitter}
                  onChange={this.handleChange}
                />
              </FormControl>

              <PhoneTextField onChange={this.getPhone} />

              <FormControl margin="normal" fullWidth>
                <InputLabel htmlFor="location">Location</InputLabel>
                <Input
                  name="location"
                  id="location"
                  value={this.state.location}
                  onChange={this.handleChange}
                />
              </FormControl>

              <FormControl margin="normal" fullWidth>
                <InputLabel htmlFor="website">Website</InputLabel>
                <Input
                  name="website"
                  id="website"
                  value={this.state.website}
                  onChange={this.handleChange}
                />
              </FormControl>
              <Button
                type="submit"
                fullWidth
                variant="outlined"
                color="primary"
                className={classes.submit}
                onClick={this.handleClick}
              >
                Update Profile
              </Button>
            </form>
          </Paper>
        </main>
      </React.Fragment>
    );
  }
}

ProfileForm.propTypes = {
  classes: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { createProfile, clearErrorsAction }
)(withStyles(styles)(withRouter(ProfileForm)));

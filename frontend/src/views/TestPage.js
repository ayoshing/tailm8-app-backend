import React, { Component, Fragment } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import Paper from "@material-ui/core/Paper";
import Input from "@material-ui/core/Input";
import FormControl from "@material-ui/core/FormControl";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import { createMessage, newMessage } from "../socket";

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
    width: "50%",
    height: 500,
    margin: "auto"
  },
  paper: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    width: "100%"
  }
});

class TestPage extends Component {
  state = {
    message: ""
  };

  handleChange = e => {
    this.setState({
      message: e.target.value
    });
  };

  handleSend = e => {
    e.preventDefault();
    createMessage(this.state.message);
  };

  render() {
    const { classes } = this.props;
    console.log(newMessage());

    return (
      <Grid container alignItems="center">
        <FormControl margin="normal" style={{ width: "50%", margin: "auto" }}>
          <Paper style={{ height: 500, marginTop: 20 }}>
            Message Container
          </Paper>
          <Input
            autoFocus
            margin="dense"
            id="content"
            placeholder="Your Message"
            fullWidth
            multiline
            rows="1"
            value={this.state.message}
            onChange={this.handleChange}
            name="message"
          />
          <Button onClick={this.handleSend}>Send</Button>
        </FormControl>
      </Grid>
    );
  }
}

TestPage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withRouter(withStyles(styles)(TestPage));

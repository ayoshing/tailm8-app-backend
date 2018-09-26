import React, { Component, Fragment } from "react";
import { withRouter } from "react-router-dom";
import Navigation from "./Navigation";
import MenuDrawer from "./MenuDrawer";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    marginBottom: 50
  }
});

class TestPage extends Component {
  render() {
    const { classes } = this.props;

    // const renderFriendCards = () => {
    //   return this.props.posts.map(post => {
    //     return (
    //       <Grid item key={post._id}>
    //         <FriendCard key={post._id} {...post} />
    //       </Grid>
    //     );
    //   });
    // };

    return (
      <Fragment>
        <MenuDrawer />
        <Paper className={classes.root} elevation={0}>
          <Grid
            container
            spacing={16}
            alignItems="center"
            direction="row"
            justify="space-evenly"
          >
            <Grid item>
              <Card>
                <CardContent>
                  <Typography>Friend</Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Paper>
        <Navigation />
      </Fragment>
    );
  }
}

TestPage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withRouter(withStyles(styles)(TestPage));

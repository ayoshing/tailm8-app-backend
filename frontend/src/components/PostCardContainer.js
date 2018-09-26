import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import PostCard from "./PostCard";
import { connect } from "react-redux";

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    marginBottom: 50
  }
});

class PostCardContainer extends React.Component {
  render() {
    const { classes } = this.props;

    const renderPostCards = () => {
      return this.props.posts.map(post => {
        return (
          <Grid item key={post._id}>
            <PostCard key={post._id} {...post} />
          </Grid>
        );
      });
    };
    return (
      <div>
        <Paper className={classes.root} elevation={0}>
          <Grid
            container
            spacing={24}
            justify="space-evenly"
            alignItems="center"
            direction="column"
          >
            {renderPostCards()}
          </Grid>
        </Paper>
      </div>
    );
  }
}

PostCardContainer.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  posts: state.post.posts
});

export default connect(mapStateToProps)(withStyles(styles)(PostCardContainer));

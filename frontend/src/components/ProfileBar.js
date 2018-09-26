import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import Paper from "@material-ui/core/Paper";
import { connect } from "react-redux";

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  card: {
    width: "100%"
  },
  avatar: {
    backgroundColor: "chocolate"
  },
  paper: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    marginBottom: 50
  }
});

class SimpleAppBar extends React.Component {
  handleCardArea = () => {};

  postCount = () => {
    return this.props.posts.filter(post => {
      return post.profile === this.props.profile._id;
    }).length;
  };

  likeCount = () => {
    let likes = [];

    this.props.posts.forEach(post => {
      post.likes.forEach(like => {
        if (like.profile === this.props.profile._id) {
          likes.push(like);
        }
      });
    });

    return likes.length;
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Paper className={classes.paper} elevation={0}>
          <Card className={classes.card}>
            <CardActionArea
              className={classes.card}
              onClick={this.handleCardArea}
            >
              <CardHeader
                avatar={
                  <Avatar aria-label="Profile" className={classes.avatar}>
                    T
                  </Avatar>
                }
                title={this.props.profile.userName}
                subheader={this.props.user.name}
              />
              <CardContent>
                <Typography variant="body2">0 Furiends</Typography>
                <Typography variant="body2">
                  {this.postCount()} Posts
                </Typography>
                <Typography variant="body2">
                  {this.likeCount()} Likes
                </Typography>
              </CardContent>
            </CardActionArea>

            <CardContent>
              <Typography paragraph variant="body2">
                Bio: {this.props.profile.bio}
              </Typography>
            </CardContent>
          </Card>
        </Paper>
      </div>
    );
  }
}

SimpleAppBar.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.auth.user,
  profile: state.profile.profile,
  posts: state.post.posts
});

export default connect(mapStateToProps)(withStyles(styles)(SimpleAppBar));

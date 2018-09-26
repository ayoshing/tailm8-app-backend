import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import classnames from "classnames";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import CardActionArea from "@material-ui/core/CardActionArea";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import { openCommentDialogAction } from "../redux/actions/commentActions";
import { requestFriendAction } from "../redux/actions/friendshipActions";
import {
  clickLikeAction,
  deletePostAction
} from "../redux/actions/postActions";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

const styles = theme => ({
  card: {
    width: 320
  },
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
  },
  actions: {
    display: "flex"
  },
  expand: {
    transform: "rotate(0deg)",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    }),
    marginLeft: "auto",
    [theme.breakpoints.up("sm")]: {
      marginRight: -8
    }
  },
  expandOpen: {
    transform: "rotate(180deg)"
  },
  avatar: {
    backgroundColor: "chocolate"
  },
  "@media (min-width: 600px)": {
    card: {
      width: 600
    }
  }
});

class PostCard extends React.Component {
  state = {
    expanded: false,
    anchorEl: null
  };

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };

  handleCommentClick = () => {
    this.props.openCommentDialogAction(this.props._id);
  };

  handleLikeClick = () => {
    this.props.clickLikeAction(this.props._id);
  };

  handleOpenPostMenu = e => {
    e.stopPropagation();
    this.setState({ anchorEl: e.currentTarget });
  };

  handleClosePostMenu = e => {
    this.setState({ anchorEl: null });
  };

  handleDeletePost = e => {
    e.stopPropagation();
    this.props.deletePostAction(this.props._id, this.props.history);
    this.setState({ anchorEl: null });
  };

  handleAddFriend = e => {
    e.stopPropagation();
    this.props.requestFriendAction(this.props.profile);
    this.setState({ anchorEl: null });
  };

  handleCardArea = e => {
    console.log("card area");
  };

  convertDate = () => {
    let date = new Date(Date.parse(this.props.date));
    return date.toDateString();
  };

  renderComments = () => {
    return this.props.comments.map(comment => {
      return (
        <Typography key={comment._id}>
          <strong>{comment.userName}: </strong>
          {comment.content}
        </Typography>
      );
    });
  };

  render() {
    const { classes } = this.props;
    const { anchorEl } = this.state;

    return (
      <React.Fragment>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClosePostMenu}
        >
          <MenuItem onClick={this.handleDeletePost}>Delete Post</MenuItem>
          <MenuItem onClick={this.handleAddFriend}>Add Friend</MenuItem>
          {/* <MenuItem onClick={this.handleFollowPost}>Follow Post</MenuItem> */}
        </Menu>
        <Card className={classes.card}>
          <CardActionArea
            className={classes.card}
            onClick={this.handleCardArea}
          >
            <CardHeader
              avatar={
                <Avatar aria-label="Post" className={classes.avatar}>
                  {this.props.userName.charAt(0)}
                </Avatar>
              }
              action={
                <IconButton>
                  <MoreVertIcon
                    aria-owns={anchorEl ? "simple-menu" : null}
                    aria-haspopup="true"
                    onClick={this.handleOpenPostMenu}
                  />
                </IconButton>
              }
              title={this.props.userName}
              subheader={this.convertDate()}
            />
            {this.props.imgUrl ? (
              <CardMedia
                className={classes.media}
                image={this.props.imgUrl}
                title="Dogs"
              />
            ) : null}
            <CardContent>
              <Typography component="p">
                <strong>{this.props.userName}: </strong>
                {this.props.content}
              </Typography>
              <Typography component="p">
                <strong>{this.props.likes.length} Likes</strong>
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions className={classes.actions} disableActionSpacing>
            <IconButton aria-label="Comment" onClick={this.handleCommentClick}>
              <ChatBubbleOutlineIcon />
            </IconButton>
            <IconButton aria-label="Like" onClick={this.handleLikeClick}>
              <FavoriteIcon
                color={
                  this.props.likes.find(el => el.user === this.props.userId)
                    ? "secondary"
                    : ""
                }
              />
            </IconButton>
            {/* TODO: stretch goal share feature
            <IconButton aria-label="Share">
            <ShareIcon />
          </IconButton> */}
            <IconButton
              className={classnames(classes.expand, {
                [classes.expandOpen]: this.state.expanded
              })}
              onClick={this.handleExpandClick}
              aria-expanded={this.state.expanded}
              aria-label="Show more"
            >
              <ExpandMoreIcon />
            </IconButton>
          </CardActions>
          <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <Typography paragraph variant="body2">
                {this.props.comments ? this.props.comments.length : 0} Comments
              </Typography>
              {this.renderComments()}
            </CardContent>
          </Collapse>
        </Card>
      </React.Fragment>
    );
  }
}

PostCard.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  userId: state.auth.user.id,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  {
    openCommentDialogAction,
    clickLikeAction,
    deletePostAction,
    requestFriendAction
  }
)(withRouter(withStyles(styles)(PostCard)));

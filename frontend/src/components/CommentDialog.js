import React from "react";
import Button from "@material-ui/core/Button";
import Input from "@material-ui/core/Input";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { connect } from "react-redux";
import {
  createCommentAction,
  closeCommentDialogAction
} from "../redux/actions/commentActions";
import { clearErrorsAction } from "../redux/actions/postActions";
import { withRouter } from "react-router-dom";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";

class CommentDialog extends React.Component {
  state = {
    content: ""
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleComment = e => {
    e.preventDefault();
    let commentData = {
      content: this.state.content
    };

    this.props
      .createCommentAction(commentData, this.props.postId, this.props.history)
      .then(res => {
        if (!this.props.errors.content) {
          this.setState({
            content: ""
          });
        }
      });
  };

  handleClose = () => {
    this.props.clearErrorsAction();
    this.props.closeCommentDialogAction();
  };

  render() {
    const { errors } = this.props;

    return (
      <div style={{ width: "100%" }}>
        <Dialog
          open={this.props.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
          maxWidth="lg"
        >
          <DialogTitle id="form-dialog-title">Add Comment</DialogTitle>
          <DialogContent>
            <FormControl
              margin="normal"
              fullWidth
              required
              error={errors.content}
            >
              <Input
                autoFocus
                margin="dense"
                id="content"
                placeholder="Comment"
                fullWidth
                multiline
                rows="2"
                value={this.state.content}
                onChange={this.handleChange}
                name="content"
              />
              <FormHelperText error>{errors.content}</FormHelperText>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleComment} color="primary">
              Post Comment
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  open: state.comment.dialogOpen,
  postId: state.comment.postId,
  errors: state.errors
});

export default withRouter(
  connect(
    mapStateToProps,
    { createCommentAction, closeCommentDialogAction, clearErrorsAction }
  )(CommentDialog)
);

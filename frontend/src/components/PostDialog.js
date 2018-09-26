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
  createPostAction,
  closeDialogAction,
  getPostsAction,
  clearErrorsAction
} from "../redux/actions/postActions";
import { withRouter } from "react-router-dom";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import isEmpty from "../validations/isEmpty";

class PostDialog extends React.Component {
  state = {
    content: "",
    imgUrl: ""
  };

  handleChange = e => {
    this.setState(
      {
        [e.target.name]: e.target.value
      },
      () => {
        if (isEmpty(this.state.imgUrl)) {
          this.props.clearErrorsAction();
        }
      }
    );
  };

  handlePost = e => {
    e.preventDefault();
    let postData = {
      content: this.state.content,
      imgUrl: this.state.imgUrl
    };

    this.props.createPostAction(postData, this.props.history).then(res => {
      if (isEmpty(this.props.errors)) {
        this.setState({
          content: "",
          imgUrl: ""
        });
      }
    });
  };

  handleClose = () => {
    this.props.closeDialogAction();
    this.props.clearErrorsAction();
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
          <DialogTitle id="form-dialog-title">Create Post</DialogTitle>
          <DialogContent>
            <DialogContentText>
              {/* Editor Toggle Buttons Will Go Here */}
            </DialogContentText>
            <FormControl
              margin="normal"
              fullWidth
              required
              error={errors.content}
            >
              <Input
                autoFocus
                // margin="dense"
                id="content"
                placeholder="Bark, Meow, Moo..."
                fullWidth
                multiline
                rows="4"
                value={this.state.content}
                onChange={this.handleChange}
                name="content"
              />
              <FormHelperText error>{errors.content}</FormHelperText>
            </FormControl>
            <FormControl
              margin="normal"
              fullWidth
              required
              error={errors.imgUrl}
            >
              <Input
                margin="dense"
                id="imgUrl"
                placeholder="Add a image URL: (optional)"
                fullWidth
                value={this.state.imgUrl}
                onChange={this.handleChange}
                name="imgUrl"
              />
              <FormHelperText error>{errors.imgUrl}</FormHelperText>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handlePost} color="primary">
              Post
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  open: state.post.dialogOpen,
  errors: state.errors
});

export default withRouter(
  connect(
    mapStateToProps,
    { createPostAction, closeDialogAction, getPostsAction, clearErrorsAction }
  )(PostDialog)
);

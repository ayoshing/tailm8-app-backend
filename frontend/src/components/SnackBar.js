import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import { connect } from "react-redux";
import {
  openSnackBarAction,
  closeSnackBarAction
} from "../redux/actions/postActions";

class PositionedSnackbar extends React.Component {
  handleClose = () => {
    this.props.closeSnackBarAction();
  };

  render() {
    const { vertical, horizontal, open } = this.props;
    return (
      <div>
        <Snackbar
          variant="success"
          anchorOrigin={{ vertical, horizontal }}
          open={open}
          onClose={this.handleClose}
          ContentProps={{
            "aria-describedby": "message-id"
          }}
          message={<span id="message-id">{this.props.msg}</span>}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  open: state.post.snackBarOpen,
  vertical: state.post.snackBarVertical,
  horizontal: state.post.snackBarHorizontal,
  msg: state.post.snackBarMsg
});

export default connect(
  mapStateToProps,
  { openSnackBarAction, closeSnackBarAction }
)(PositionedSnackbar);

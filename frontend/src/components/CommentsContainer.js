import React from "react";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

export default props => {
  return (
    <CardContent>
      <Typography paragraph variant="body2">
        {this.props.comments ? this.props.comments.length : 0} Comments
      </Typography>
      {this.renderComments()}
    </CardContent>
  );
};

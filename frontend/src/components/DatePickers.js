import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

const styles = theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200
  }
});

function DatePickers(props) {
  const { classes } = props;

  return (
    <TextField
      id="birthday"
      name="birthday"
      label="Birthday"
      type="date"
      defaultValue="2018-09-04"
      className={classes.textField}
      InputLabelProps={{
        shrink: true
      }}
      onChange={e => props.onChange(e)}
    />
  );
}

DatePickers.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(DatePickers);

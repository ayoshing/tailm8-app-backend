import React from "react";
import MaskedInput from "react-text-mask";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  formControl: {
    margin: theme.spacing.unit
  }
});

function TextMaskCustom(props) {
  const { inputRef, ...other } = props;

  return (
    <MaskedInput
      {...other}
      ref={inputRef}
      mask={[
        "(",
        /[1-9]/,
        /\d/,
        /\d/,
        ")",
        " ",
        /\d/,
        /\d/,
        /\d/,
        "-",
        /\d/,
        /\d/,
        /\d/,
        /\d/
      ]}
      placeholderChar={"\u2000"}
      showMask
      guide={false}
    />
  );
}

TextMaskCustom.propTypes = {
  inputRef: PropTypes.func.isRequired
};

class FormattedInputs extends React.Component {
  state = {
    phone: ""
  };

  handleChange = name => event => {
    this.setState(
      {
        [name]: event.target.value
      },
      () => this.props.onChange(this.state.phone)
    );
  };

  render() {
    const { classes } = this.props;
    const { phone } = this.state;

    return (
      <div className={classes.container}>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="phone">Phone</InputLabel>
          <Input
            value={phone}
            onChange={this.handleChange("phone")}
            id="phone"
            inputComponent={TextMaskCustom}
          />
        </FormControl>
      </div>
    );
  }
}

FormattedInputs.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(FormattedInputs);

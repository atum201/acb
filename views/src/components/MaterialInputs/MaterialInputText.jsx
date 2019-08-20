import React from "react";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import PropTypes from "prop-types";

const MaterialInputText = props => {
  return (
    <div>
      <FormControl
        style={{ width: "100%", marginBottom: "10px" }}
        error={props.error}
      >
        <InputLabel htmlFor="custom-css-standard-input">
          {props.label}
        </InputLabel>
        <Input
          id="custom-css-standard-input"
          name={props.name}
          value={props.value}
          onChange={props.onChange}
          disabled={props.disabled}
          type={props.type === "number" ? "number" : "text"}
          rows={props.rows}
          multiline={props.multiline}
        />
        <FormHelperText id="component-error-text">
          {props.errorMessage}
        </FormHelperText>
      </FormControl>
    </div>
  );
};
MaterialInputText.propTypes = {
  error: PropTypes.bool,
  label: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  type: PropTypes.string,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  errorMessage: PropTypes.string,
  multiline: PropTypes.bool,
  rows: PropTypes.number
};
MaterialInputText.defaultProps = {
  value: "",
  rows: 4
};

export default MaterialInputText;

import React, { Component } from "react";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { withStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import PropTypes from "prop-types";

const styles = theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap"
  },
  formControl: {
    width: "100%"
  }
});

class MaterialSelect extends Component {
  state = {
    age: ""
  };

  handleOnChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    // eslint-disable-next-line react/prop-types
    const { classes } = this.props;
    const label = this.props.label;
    const data = this.props.data;
    const name = this.props.name;
    const value = this.props.value;

    return (
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="age-simple">{label}</InputLabel>
        <Select
          value={value}
          onChange={this.props.handleOnChange}
          inputProps={{
            name
          }}
          disabled={this.props.disabled}
        >
          <MenuItem value="">
            <em>Tất cả</em>
          </MenuItem>
          {data.map((prop, key) => {
            return (
              <MenuItem value={prop.value} key={key}>
                {prop.label}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    );
  }
}

export default withStyles(styles)(MaterialSelect);
MaterialSelect.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  data: PropTypes.array,
  value: PropTypes.string,
  handleOnChange: PropTypes.func,
  disabled: PropTypes.bool
};
MaterialSelect.defaultProps = {
  label: "",
  data: [],
  value: ""
};

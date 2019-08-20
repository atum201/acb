import React, { Component } from "react";
// used to make this component's props into classes
import cx from "classnames";
// used for making the prop types of this component
import PropTypes from "prop-types";
import { PulseLoader } from "react-spinners";

class CustomText extends Component {
  render() {
    const {
      simple,
      round,
      icon,
      neutral,
      iconMini,
      leftLabel,
      rightLabel,
      wd,
      className,
      twitter,
      facebook,
      google,
      linkedin,
      pinterest,
      youtube,
      tumblr,
      github,
      behance,
      dribbble,
      reddit,
      stumbleupon,
      isLoading,
      ...rest
    } = this.props;

    var btnClasses = cx({
      "btn-simple": simple,
      "btn-round": round,
      "btn-icon": icon,
      "btn-neutral": neutral,
      "btn-icon btn-icon-mini": iconMini,
      "btn-wd": wd,
      "btn-twitter": twitter,
      "btn-facebook": facebook,
      "btn-google": google,
      "btn-linkedin": linkedin,
      "btn-pinterest": pinterest,
      "btn-youtube": youtube,
      "btn-tumblr": tumblr,
      "btn-github": github,
      "btn-behance": behance,
      "btn-dribbble": dribbble,
      "btn-reddit": reddit,
      "btn-stumbleupon": stumbleupon
    });

    if (className !== undefined) {
      btnClasses += " " + className;
    }

    return (
      <span className={"resgis_form" + btnClasses} {...rest}>
        {isLoading ? <PulseLoader loading={true} size={4} color="blue" /> : ""}
      </span>
    );
  }
}

CustomText.propTypes = {
  simple: PropTypes.bool,
  round: PropTypes.bool,
  icon: PropTypes.bool,
  neutral: PropTypes.bool,
  iconMini: PropTypes.bool,
  wd: PropTypes.bool,
  twitter: PropTypes.bool,
  facebook: PropTypes.bool,
  google: PropTypes.bool,
  linkedin: PropTypes.bool,
  pinterest: PropTypes.bool,
  youtube: PropTypes.bool,
  tumblr: PropTypes.bool,
  github: PropTypes.bool,
  behance: PropTypes.bool,
  dribbble: PropTypes.bool,
  reddit: PropTypes.bool,
  stumbleupon: PropTypes.bool,
  isLoading: PropTypes.bool
};

export default CustomText;

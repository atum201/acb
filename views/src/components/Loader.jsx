import React, { Component } from "react";
import { PulseLoader } from "react-spinners";
class Loader extends Component {
  state = {};
  render() {
    const isLoaded = this.props.isLoaded;
    return (
      <React.Fragment>
        {isLoaded ? (
          ""
        ) : (
          <div className="loader">
            <div className="preloader-logo">
              <PulseLoader
                size={13}
                loading={isLoaded}
                color={'#006fe3'}
                margin={"10px"}
              />
            </div>
          </div>
        )}
      </React.Fragment>
    );
  }
}

export default Loader;
Loader.propTypes = {};
Loader.defaultProps = {};

import React, { Component } from "react";
class MilestoneCountMobile extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { rightQuantity, allPlayer } = this.props;
    const renderMilesCountLevel = (allPlayer, rightQuantity) => {
      if (window.innerWidth > 0) {
        return (rightQuantity / allPlayer) * 100 + "%";
      }
    };

    return (
      <div className="ruler_wc_mb">
        <div className="ruler_wc_tab_mb">
          <div
            className="ruler_wc_tab_pointer_mb"
            style={{
              width: renderMilesCountLevel(allPlayer, rightQuantity)
            }}
          />
        </div>
        <div className="b_r_active_mb">
          <p>Người chiến thắng:</p>
          <p>
            {rightQuantity ? rightQuantity : 0} /{" "}
            {allPlayer ? allPlayer : 0}{" "}
          </p>
        </div>
      </div>
    );
  }
}

export default MilestoneCountMobile;
MilestoneCountMobile.propTypes = {};
MilestoneCountMobile.defaultProps = {};

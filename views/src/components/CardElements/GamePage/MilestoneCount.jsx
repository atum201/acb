import React, { Component } from "react";
class MilestoneCount extends Component {
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
      <div className="ruler_wc">
        <div className="ruler_wc_tab">
          <div
            className="ruler_wc_tab_pointer"
            style={{
              height: renderMilesCountLevel(allPlayer, rightQuantity)
            }}
          />
        </div>
        <div className="b_r_active">
          <p>Người chiến thắng:</p>
          <p>
            {rightQuantity ? rightQuantity : 0} / {allPlayer ? allPlayer : 0}{" "}
          </p>
        </div>
      </div>
    );
  }
}

export default MilestoneCount;
MilestoneCount.propTypes = {};
MilestoneCount.defaultProps = {};

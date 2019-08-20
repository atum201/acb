import React, { Component } from "react";
import line_level from "../../../assets/image/line_level.png";
class Milestone extends Component {
  state = {};

  render() {
    const renderMilestoneFromLevel = level => {
      if (window.innerWidth > 0) {
        if (level >= 10) {
          return "100%";
        }
        return 11 * level + 1 + "%";
      } else {
        if (level >= 10) {
          return "76%";
        }
        return 7 * level + 1 + "%";
      }
    };
    const level = this.props.level;
    return (
      <div>
        <div className="_line_level">
          <img src={line_level} alt="" className="line_level" />
          <section id="milestone-ruler">
            <label className={level === 0 ? "milestone active" : "milestone "}>
              1
            </label>
            <label className={level === 1 ? "milestone active" : "milestone "}>
              2
            </label>
            <label className={level === 2 ? "milestone active" : "milestone "}>
              3
            </label>
            <label className={level === 3 ? "milestone active" : "milestone "}>
              4
            </label>
            <label className={level === 4 ? "milestone active" : "milestone "}>
              5
            </label>
            <label className={level === 5 ? "milestone active" : "milestone "}>
              6
            </label>
            <label className={level === 6 ? "milestone active" : "milestone "}>
              7
            </label>
            <label className={level === 7 ? "milestone active" : "milestone "}>
              8
            </label>
            <label className={level === 8 ? "milestone active" : "milestone "}>
              9
            </label>
            <label className={level === 9 ? "milestone active" : "milestone "}>
              10
            </label>
          </section>
          <div
            className="milestone-pointer"
            style={{
              width: renderMilestoneFromLevel(level)
            }}
          />
        </div>
      </div>
    );
  }
}

export default Milestone;
Milestone.propTypes = {};
Milestone.defaultProps = {};

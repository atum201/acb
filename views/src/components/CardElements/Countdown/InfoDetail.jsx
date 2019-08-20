import React from "react";

const InfoDetail = props => {
  return (
    <div className="info_Detail">
      <div className="box_info_detail">
        <ul className="lawUl">
          {/* <li>{props.message.law ? props.message.law : ""}</li> */}
          <div
            dangerouslySetInnerHTML={{
              __html: props.message.law ? props.message.law : ""
            }}
          />
        </ul>
        {/* <ul className="lawInfo">
          <h5>Thông tin giải thưởng:</h5>
          <div
            dangerouslySetInnerHTML={{
              __html: props.message.prize_info ? props.message.prize_info : ""
            }}
          />
        </ul> */}
      </div>
    </div>
  );
};

export default InfoDetail;

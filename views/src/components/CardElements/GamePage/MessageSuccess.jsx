import React from "react";
import q_answer from "../../../assets/image/q_answer.png";
import girl_mess_success from "../../../assets/image/girl_mess_success.png";
const MessageSuccess = props => {
  return (
    <div className="mess_info">
      <img src={q_answer} alt="" className="img_fixed" />
      <div className="box_content">
        <h2>Chúc mừng! Bạn đã trả lời đúng.</h2>
        <p>{props.message ? props.message : ""}</p>
      </div>
      <img src={girl_mess_success} alt="" className="girl_mess" />
    </div>
  );
};

export default MessageSuccess;

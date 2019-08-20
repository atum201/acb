import moment from "moment";
import formatNumber from "./formatNumber";
require("moment/locale/vi");

export const formatStringToTimeInfo = dateString => {
  const date = moment(dateString).locale("vi");
  // console.log(
  //   date,
  //   date.hour(),
  //   date.minute(),
  //   date.date(),
  //   date.month(),
  //   date.year()
  // );
  return formatNumber(date.hour()) + ":" + formatNumber(date.minute());
};

export const countTime = dateString => {
  const date = new moment(dateString).fromNow();
  return date;
};

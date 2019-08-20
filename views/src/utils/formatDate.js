import moment from "moment";
import formatNumber from "./formatNumber";
require("moment/locale/vi");

export const formatStringToDate = dateString => {
  const date = moment(dateString).format("L");
  return date;
};

export const formatStringToTime = dateString => {
  const date = moment(dateString).locale("vi");
  // console.log(
  //   date,
  //   date.hour(),
  //   date.minute(),
  //   date.date(),
  //   date.month(),
  //   date.year()
  // );
  return (
    formatNumber(date.hour()) +
    ":" +
    formatNumber(date.minute()) +
    " " +
    formatNumber(date.date()) +
    "/" +
    formatNumber(date.month() + 1) +
    "/" +
    formatNumber(date.year())
  );
};

export const countTime = dateString => {
  const date = new moment(dateString).fromNow();
  return date;
};

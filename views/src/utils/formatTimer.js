export function formatTime(totalSeconds, checkStatusGame) {
  if (totalSeconds && totalSeconds >= 0) {
    let hours = Math.floor(totalSeconds / 3600);
    totalSeconds %= 3600;
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = totalSeconds % 60;
    // If you want strings with leading zeroes:
    minutes = String(minutes).padStart(2, "0");
    hours = String(hours).padStart(2, "0");
    seconds = String(seconds).padStart(2, "0");
    return hours + ":" + minutes + ":" + seconds;
  } else {
    if (checkStatusGame) {
      switch (checkStatusGame) {
        case "PENDING":
          return "Đang đợi";
        case "PLAYING":
          return "Đang chơi";
        case "FINISHED":
          return "Chưa Mở";
        case "OPENING":
          return "Sẵn Sàng";
        default:
          return "Sẵn Sàng";
      }
    }
    return "";
  }
}

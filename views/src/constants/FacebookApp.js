var APP_ID = "";
const DEVELOPMENT_APP_ID = "1204894566357957";
const PRODUCTION_APP_ID = "645826709192257";
if (
  window.location.hostname === "localhost" ||
  window.location.hostname === "[::1]" ||
  window.location.hostname.match(
    /^192(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
  )
) {
  APP_ID = DEVELOPMENT_APP_ID;
} else {
  APP_ID = PRODUCTION_APP_ID;
}

export default APP_ID;

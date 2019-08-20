var APP_ID = "";
const DEVELOPMENT_APP_ID =
  "959359812106-ulsn2923j01fjun0cl6kdqj82kobbjvk.apps.googleusercontent.com";
const PRODUCTION_APP_ID =
  "512623777276-489ct8rir1eanatb57j6i4ceslj6dl2b.apps.googleusercontent.com";
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

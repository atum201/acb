var URL = "";

if (
  window.location.hostname === "localhost" ||
  window.location.hostname === "[::1]" ||
  window.location.hostname.match(
    /^192(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
  )
) {
  URL = "http://acbiq.wejelly.com/";
  // URL = 'http://192.168.86.181:3000/';
  // URL = "http://localhost:5000/";
} else {
  URL = window.location.protocol + "//" + window.location.hostname + "/";
}

export default URL;

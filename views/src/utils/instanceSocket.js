import io from "socket.io-client";
// let uri = "http://192.168.86.118:5000/";
let uri = "http://acbcsr.wejelly.com/";
// var uri = "http://localhost:5000/";
let socketGlobal = io(uri, { transports: ["websocket"] });

export { socketGlobal, uri };

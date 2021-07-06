"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const WebSocket = require("ws");
var soundMotion;
(function (soundMotion) {
    const port = 5000; // Number(process.env.PORT) ||
    const wss = new WebSocket.Server({ port: port });
    wss.on("connection", (socket) => {
        console.log("Client connected on", socket);
    });
})(soundMotion = exports.soundMotion || (exports.soundMotion = {}));
//# sourceMappingURL=Server.js.map
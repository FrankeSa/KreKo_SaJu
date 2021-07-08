"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const WebSocket = require("ws");
var soundMotion;
(function (soundMotion) {
    const port = Number(process.env.PORT) || 5000;
    const wss = new WebSocket.Server({ port: port });
    // list of client messages
    const messageList = [];
    // list of connected sockets
    const clientSockets = new Set();
    wss.on("connection", (socket) => {
        console.log("Client connected on");
        clientSockets.add(socket);
        const initMessageObj = {
            // userNames:string;
            messages: messageList
        };
        const initCarrierMessage = {
            selector: "init",
            data: JSON.stringify(initMessageObj)
        };
        socket.send(JSON.stringify(initCarrierMessage));
        socket.on("message", (message) => {
            const carrierMessage = JSON.parse(message);
            const selector = carrierMessage.selector;
            const data = carrierMessage.data;
            switch (selector) {
                case "text-message": {
                    const textMessage = JSON.parse(data);
                    // add message to message list
                    messageList.push(textMessage);
                    console.log(`#${textMessage.userNames}: "${textMessage.text}"`);
                    // broadcast message to all connected clients
                    for (let socket of clientSockets) {
                        socket.send(message);
                    }
                    break;
                }
            }
        });
        socket.on("close", () => {
            clientSockets.delete(socket);
        });
    });
})(soundMotion = exports.soundMotion || (exports.soundMotion = {}));
//# sourceMappingURL=Server.js.map
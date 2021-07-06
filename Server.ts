import * as WebSocket from "ws";
export namespace soundMotion {

    const port: number = 5000; // Number(process.env.PORT) ||

    const wss: WebSocket.Server = new WebSocket.Server({ port: port });



    wss.on("connection", (socket) => {
        console.log("Client connected on", socket);

    });



















}
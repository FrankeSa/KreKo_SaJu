import * as WebSocket from "ws";
export namespace soundMotion {

    // carrier message interface
    interface CarrierMessage {
        selector: string;
        data?: string;
    }

    // client init message interface
    interface InitMessage {
        // userNames: string; ==>???
        messages: TextMessage[];
    }

    // client text message interface
    interface TextMessage {
        userNames: string;
        text: string;
    }





    const port: number = 5000; // Number(process.env.PORT) ||

    const wss: WebSocket.Server = new WebSocket.Server({ port: port });

    // list of client messages
    const messageList: TextMessage[] = [];

    // list of connected sockets
    const clientSockets: Set<WebSocket> = new Set();

    wss.on("connection", (socket) => {
        console.log("Client connected on");

        clientSockets.add(socket);

        const initMessageObj: InitMessage = {
            // userNames:string;
            messages: messageList
        };

        const initCarrierMessage: CarrierMessage = {
            selector: "init",
            data: JSON.stringify(initMessageObj)
        };

        socket.send(JSON.stringify(initCarrierMessage));

        socket.on("message", (message) => {

            const carrierMessage: CarrierMessage = <CarrierMessage>JSON.parse(<string>message);
            const selector: string = carrierMessage.selector;
            const data: string = <string>carrierMessage.data;

            switch (selector) {
                case "text-message": {
                    const textMessage: TextMessage = <TextMessage>JSON.parse(<string>data);

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

















}
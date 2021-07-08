namespace soundMotion {
    const socket: WebSocket = new WebSocket("wss://soundmotion.herokuapp.com/");
    let audio: HTMLAudioElement = new Audio();

    window.addEventListener("load", handleLoad);




    function handleLoad(_event: Event): void {


        console.log("Hier bist du im Chat");

        // carrier message interface
        interface CarrierMessage {
            selector: string;
            data?: string;
        }
        // client init message interface
        interface InitMessage {
            //  userNames: string;
            messages: TextMessage[];
        }
        // client text message interface
        interface TextMessage {
            // uerNames: string;
            text: string;
        }
        let messageList: TextMessage[]; //= null; ?????






        ///WENN DER CLIENT EINE MASSAGE EMPFÄNGT
        socket.addEventListener("message", (event) => {
            const carrier: CarrierMessage = <CarrierMessage>JSON.parse(event.data);
            const selector: string = carrier.selector;
            const data: string = <string>carrier.data;

            switch (selector) {
                case "init": {
                    const initMessage: InitMessage = <InitMessage>JSON.parse(data);

                    // store userNames and message list
                    // userNames = initMessage.userNames;
                    messageList = initMessage.messages;
                    // displayListUserNames();
                    break;
                }

                case "text-message": {
                    const textMessage: TextMessage = <TextMessage>JSON.parse(<string>data);
                    messageList.push(textMessage); // add message to message list
                    audio.src = textMessage.text;
                    const sarah = audio.play();
                    if (sarah !== undefined) {
                        sarah.then(_ => {
                            audio.play();
                        });
                    }

                    console.log(textMessage.text);

                    // displayListUserNames();
                    break;
                }
            }

        });

    }

    socket.addEventListener("open", () => {
        console.log("We are connected in Chat");
    });


}
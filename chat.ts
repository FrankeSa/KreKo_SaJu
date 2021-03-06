namespace soundMotion {
 
    const socket: WebSocket = new WebSocket("wss://soundmotion.herokuapp.com/");
    let audio: HTMLAudioElement = new Audio();

    window.addEventListener("click", handleLoad);



    function handleLoad(_event: Event): void {


    function play(_textMessage: string): void {
        audio.pause();
        audio.src = _textMessage;
        audio.play();
    }


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
                // audio.src = textMessage.text;
                // audio.play(); 
                play(textMessage.text);

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


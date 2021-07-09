namespace soundMotion {

    const socket: WebSocket = new WebSocket("wss://soundmotion.herokuapp.com/");

    window.addEventListener("load", handleLoad);
    let audio: HTMLAudioElement = new Audio();
    let angry1: HTMLDivElement;
    let angry2: HTMLDivElement;
    let angry3: HTMLDivElement;
    let angrySend1: HTMLButtonElement;
    let angrySend2: HTMLButtonElement;
    let angrySend3: HTMLButtonElement;

    function handleLoad(_event: Event): void {

        angry1 = <HTMLDivElement>document.querySelector("#angry1");
        angry2 = <HTMLDivElement>document.querySelector("#angry2");
        angry3 = <HTMLDivElement>document.querySelector("#angry3");
        angrySend1 = <HTMLButtonElement>document.querySelector("#angry1 button");
        angrySend2 = <HTMLButtonElement>document.querySelector("#angry2 button");
        angrySend3 = <HTMLButtonElement>document.querySelector("#angry3 button");

        angry1.addEventListener("click", function () { play("./assets/sounds/angry/fk_you_very_much.mp3") });
        angry2.addEventListener("click", function () { play("./assets/sounds/angry/i_hate_u_so_much_right_now.mp3") });
        angry3.addEventListener("click", function () { play("./assets/sounds/angry/im_t_n_t.mp3") });

        angrySend1.addEventListener("click", function (e) { console.log("sending song1"); sendSound("./assets/sounds/angry/fk_you_very_much.mp3"); e.stopImmediatePropagation(); });
        angrySend2.addEventListener("click", function (e) { sendSound("./assets/sounds/angry/i_hate_u_so_much_right_now.mp3"); e.stopImmediatePropagation(); });
        angrySend3.addEventListener("click", function (e) { sendSound("./assets/sounds/angry/im_t_n_t.mp3"); e.stopImmediatePropagation(); });

    }
    function play(_soundpiece: string): void {
        audio.pause();
        audio.src = _soundpiece;
        audio.play();
    }


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

    // get div element
    // const messageListDiv: HTMLDivElement = <HTMLInputElement>document.getElementById("chatArea");


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
                audio.play();
                console.log("following song was received", textMessage.text);

                // displayListUserNames();
                break;
            }
        }

    });

    // WENN DER CLIENT EINE MASSAGE VERSCHICKT

    function sendSound(_soundpeace: string): void {
        window.location.href = "chat.html";
        let soundToSend: string = _soundpeace;

        const message: TextMessage = {
            text: soundToSend
        };

        const textCarrier: CarrierMessage = {
            selector: "text-message",
            data: JSON.stringify(message)
        };
        socket.send(JSON.stringify(textCarrier));
        console.log("following song has been sent", textCarrier.data);
    }

    socket.addEventListener("open", () => {
        console.log("We are connected");
    });


}
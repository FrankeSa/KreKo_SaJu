namespace soundMotion {
    const socket: WebSocket = new WebSocket("wss://soundmotion.herokuapp.com/");


    window.addEventListener("load", handleLoad);
    let audio: HTMLAudioElement = new Audio();
    let sad1: HTMLDivElement;
    let sad2: HTMLDivElement;
    let sad3: HTMLDivElement;
    let sadSend1: HTMLButtonElement;
    let sadSend2: HTMLButtonElement;
    let sadSend3: HTMLButtonElement;


    function handleLoad(_event: Event): void {

        sad1 = <HTMLDivElement>document.querySelector("#sad1");
        sad2 = <HTMLDivElement>document.querySelector("#sad2");
        sad3 = <HTMLDivElement>document.querySelector("#sad3");
        sadSend1 = <HTMLButtonElement>document.querySelector("#sad1 button");
        sadSend2 = <HTMLButtonElement>document.querySelector("#sad2 button");
        sadSend3 = <HTMLButtonElement>document.querySelector("#sad3 button");

        sad1.addEventListener("click", function () { play("./assets/sounds/sad/just_a_sad_song_V2.mp3") });
        sad2.addEventListener("click", function () { play("./assets/sounds/sad/sad_situation.mp3") });
        sad3.addEventListener("click", function () { play("./assets/sounds/sad/nobody_knows.mp3") });

        sadSend1.addEventListener("click", function (e) { console.log("sending song1"); sendSound("./assets/sounds/sad/just_a_sad_song_V2.mp3"); e.stopImmediatePropagation(); });
        sadSend2.addEventListener("click", function (e) { sendSound("./assets/sounds/sad/sad_situation.mp3"); e.stopImmediatePropagation(); });
        sadSend3.addEventListener("click", function (e) { sendSound("./assets/sounds/sad/nobody_knows.mp3"); e.stopImmediatePropagation(); });


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
        // window.location.href = "chat.html";
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
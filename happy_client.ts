namespace soundMotion {
    const socket: WebSocket = new WebSocket("wss://soundmotion.herokuapp.com/");

    window.addEventListener("load", handleLoad);
    let audio: HTMLAudioElement = new Audio();
    let happy1: HTMLDivElement;
    let happy2: HTMLDivElement;
    let happy3: HTMLDivElement;
    let happySend1: HTMLButtonElement;
    let happySend2: HTMLButtonElement;
    let happySend3: HTMLButtonElement;

    function handleLoad(_event: Event): void {
        happy1 = <HTMLDivElement>document.querySelector("#happy1");
        happy2 = <HTMLDivElement>document.querySelector("#happy2");
        happy3 = <HTMLDivElement>document.querySelector("#happy3");
        happySend1 = <HTMLButtonElement>document.querySelector("#happy1 button");
        happySend2 = <HTMLButtonElement>document.querySelector("#happy2 button");
        happySend3 = <HTMLButtonElement>document.querySelector("#happy3 button");

        happy1.addEventListener("click", function () { play("cant_stop_smilin.mp3") });
        happy2.addEventListener("click", function () { play("because_im_happy.mp3") });
        happy3.addEventListener("click", function () { play("sunshine_in_my_pocket_V2.mp3") });

        happySend1.addEventListener("click", function (e) { console.log("sending song1"); sendSound("./assets/sounds/happy/cant_stop_smilin.mp3"); e.stopImmediatePropagation(); });
        happySend2.addEventListener("click", function (e) { sendSound("./assets/sounds/happy/because_im_happy.mp3"); e.stopImmediatePropagation(); });
        happySend3.addEventListener("click", function (e) { sendSound("./assets/sounds/happy/sunshine_in_my_pocket_V2.mp3"); e.stopImmediatePropagation(); });

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
                console.log(textMessage.text);

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
    }

    socket.addEventListener("open", () => {
        console.log("We are connected");
    });


}
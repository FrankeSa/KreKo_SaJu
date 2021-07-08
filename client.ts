namespace soundMotion {
    // const socket: WebSocket = new WebSocket("ws://localhost:5000");
    const socket: WebSocket = new WebSocket("wss://soundmotion.herokuapp.com/");

    window.addEventListener("load", handleLoad);
    let inputField: HTMLInputElement;
    let loginBtn: HTMLButtonElement;
    let username: string;
    let audio: HTMLAudioElement = new Audio();
    let love1: HTMLDivElement;
    let love2: HTMLDivElement;
    let love3: HTMLDivElement;
    let loveSend1: HTMLButtonElement;
    let loveSend2: HTMLButtonElement;
    let loveSend3: HTMLButtonElement;


    function handleLoad(_event: Event): void {

        // Category Love ******
        love1 = <HTMLDivElement>document.querySelector("#love1");
        love2 = <HTMLDivElement>document.querySelector("#love2");
        love3 = <HTMLDivElement>document.querySelector("#love3");
        loveSend1 = <HTMLButtonElement>document.querySelector("#love1 button");
        loveSend2 = <HTMLButtonElement>document.querySelector("#love2 button");
        loveSend3 = <HTMLButtonElement>document.querySelector("#love3 button");
        //Play Sound
        love1.addEventListener("click", function () { play("./assets/sounds/love/hey_im_in_love.mp3") });
        love2.addEventListener("click", function () { play("./assets/sounds/love/I_want_ur_stupid_love.mp3") });
        love3.addEventListener("click", function () { play("./assets/sounds/love/keep_on_falling_in_love.mp3") });
        // Send Sound 
        loveSend1.addEventListener("click", function (e) { console.log("sending song1"); sendSound("./assets/sounds/love/hey_im_in_love.mp3"); e.stopImmediatePropagation(); });
        loveSend2.addEventListener("click", function (e) { sendSound("./assets/sounds/love/I_want_ur_stupid_love.mp3"); e.stopImmediatePropagation(); });
        loveSend3.addEventListener("click", function (e) { sendSound("./assets/sounds/love/keep_on_falling_in_love.mp3"); e.stopImmediatePropagation(); });

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

    function play(soundpiece: string): void {
        audio.pause();
        audio.src = soundpiece;
        // audio.play();

    }


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
                play(textMessage.text);
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


    // function getUsername(_event: Event): void {
    //     username = inputField.value;
    //     console.log(username);
    //     // alert("dein Nutzername ist:" + username);
    // }


    socket.addEventListener("open", () => {
        console.log("We are connected");
    });






}//Ende Namespance
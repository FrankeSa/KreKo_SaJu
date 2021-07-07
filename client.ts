namespace soundMotion {
    const socket: WebSocket = new WebSocket("ws://localhost:5000");
    // const socket: WebSocket = new WebSocket("wss://soundmotion.herokuapp.com/");

    window.addEventListener("load", handleLoad);
    let inputField: HTMLInputElement;
    let loginBtn: HTMLButtonElement;
    let username: string;


    function handleLoad(_event: Event): void {

        inputField = <HTMLInputElement>document.querySelector("#inputField");
        loginBtn = <HTMLButtonElement>document.querySelector("#loginBtn");
        loginBtn.addEventListener("click", getUsername);
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
    const messageListDiv: HTMLDivElement = <HTMLInputElement>document.getElementById("chatArea");


    socket.addEventListener("open", () => {
        console.log("We are connected");
    });

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

               // displayListUserNames();
                break;
            }
        }

    });










    function getUsername(_event: Event): void {
        username = inputField.value;
        console.log(username);
        // alert("dein Nutzername ist:" + username);
    }




}//Ende Namespance
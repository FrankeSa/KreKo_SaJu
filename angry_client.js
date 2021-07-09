"use strict";
var soundMotion;
(function (soundMotion) {
    const socket = new WebSocket("wss://soundmotion.herokuapp.com/");
    window.addEventListener("load", handleLoad);
    let audio = new Audio();
    let angry1;
    let angry2;
    let angry3;
    let angrySend1;
    let angrySend2;
    let angrySend3;
    function handleLoad(_event) {
        angry1 = document.querySelector("#angry1");
        angry2 = document.querySelector("#angry2");
        angry3 = document.querySelector("#angry3");
        angrySend1 = document.querySelector("#angry1 button");
        angrySend2 = document.querySelector("#angry2 button");
        angrySend3 = document.querySelector("#angry3 button");
        angry1.addEventListener("click", function () { play("./assets/sounds/angry/fk_you_very_much.mp3"); });
        angry2.addEventListener("click", function () { play("./assets/sounds/angry/i_hate_u_so_much_right_now.mp3"); });
        angry3.addEventListener("click", function () { play("./assets/sounds/angry/im_t_n_t.mp3"); });
        angrySend1.addEventListener("click", function (e) { console.log("sending song1"); sendSound("./assets/sounds/angry/fk_you_very_much.mp3"); e.stopImmediatePropagation(); });
        angrySend2.addEventListener("click", function (e) { sendSound("./assets/sounds/angry/i_hate_u_so_much_right_now.mp3"); e.stopImmediatePropagation(); });
        angrySend3.addEventListener("click", function (e) { sendSound("./assets/sounds/angry/im_t_n_t.mp3"); e.stopImmediatePropagation(); });
    }
    function play(_soundpiece) {
        audio.pause();
        audio.src = _soundpiece;
        audio.play();
    }
    let messageList; //= null; ?????
    // get div element
    // const messageListDiv: HTMLDivElement = <HTMLInputElement>document.getElementById("chatArea");
    // ///WENN DER CLIENT EINE MASSAGE EMPFÄNGT
    // socket.addEventListener("message", (event) => {
    //     const carrier: CarrierMessage = <CarrierMessage>JSON.parse(event.data);
    //     const selector: string = carrier.selector;
    //     const data: string = <string>carrier.data;
    //     switch (selector) {
    //         case "init": {
    //             const initMessage: InitMessage = <InitMessage>JSON.parse(data);
    //             // store userNames and message list
    //             // userNames = initMessage.userNames;
    //             messageList = initMessage.messages;
    //             // displayListUserNames();
    //             break;
    //         }
    //         case "text-message": {
    //             const textMessage: TextMessage = <TextMessage>JSON.parse(<string>data);
    //             messageList.push(textMessage); // add message to message list
    //             audio.src = textMessage.text;
    //             audio.play();
    //             console.log(textMessage.text);
    //             // displayListUserNames();
    //             break;
    //         }
    //     }
    // });
    // WENN DER CLIENT EINE MASSAGE VERSCHICKT
    function sendSound(_soundpeace) {
        window.location.href = "chat.html";
        let soundToSend = _soundpeace;
        const message = {
            text: soundToSend
        };
        const textCarrier = {
            selector: "text-message",
            data: JSON.stringify(message)
        };
        socket.send(JSON.stringify(textCarrier));
        console.log(textCarrier);
    }
    socket.addEventListener("open", () => {
        console.log("We are connected");
    });
})(soundMotion || (soundMotion = {}));
//# sourceMappingURL=angry_client.js.map
"use strict";
var soundMotion;
(function (soundMotion) {
    const socket = new WebSocket("wss://soundmotion.herokuapp.com/");
    window.addEventListener("load", handleLoad);
    let audio = new Audio();
    let happy1;
    let happy2;
    let happy3;
    let happySend1;
    let happySend2;
    let happySend3;
    function handleLoad(_event) {
        happy1 = document.querySelector("#happy1");
        happy2 = document.querySelector("#happy2");
        happy3 = document.querySelector("#happy3");
        happySend1 = document.querySelector("#happy1 button");
        happySend2 = document.querySelector("#happy2 button");
        happySend3 = document.querySelector("#happy3 button");
        happy1.addEventListener("click", function () { play("./assets/sounds/happy/because_im_happy/cant_stop_smilin.mp3"); });
        happy2.addEventListener("click", function () { play("./assets/sounds/happy/because_im_happy/because_im_happy.mp3"); });
        happy3.addEventListener("click", function () { play("./assets/sounds/happy/because_im_happy/sunshine_in_my_pocket_V2.mp3"); });
        happySend1.addEventListener("click", function (e) { console.log("sending song1"); sendSound("./assets/sounds/happy/cant_stop_smilin.mp3"); e.stopImmediatePropagation(); });
        happySend2.addEventListener("click", function (e) { sendSound("./assets/sounds/happy/because_im_happy.mp3"); e.stopImmediatePropagation(); });
        happySend3.addEventListener("click", function (e) { sendSound("./assets/sounds/happy/sunshine_in_my_pocket_V2.mp3"); e.stopImmediatePropagation(); });
    }
    function play(_soundpiece) {
        audio.pause();
        audio.src = _soundpiece;
        audio.play();
    }
    let messageList; //= null; ?????
    // get div element
    // const messageListDiv: HTMLDivElement = <HTMLInputElement>document.getElementById("chatArea");
    ///WENN DER CLIENT EINE MASSAGE EMPFÄNGT
    socket.addEventListener("message", (event) => {
        const carrier = JSON.parse(event.data);
        const selector = carrier.selector;
        const data = carrier.data;
        switch (selector) {
            case "init": {
                const initMessage = JSON.parse(data);
                // store userNames and message list
                // userNames = initMessage.userNames;
                messageList = initMessage.messages;
                // displayListUserNames();
                break;
            }
            case "text-message": {
                const textMessage = JSON.parse(data);
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
    function sendSound(_soundpeace) {
        // window.location.href = "chat.html";
        let soundToSend = _soundpeace;
        const message = {
            text: soundToSend
        };
        const textCarrier = {
            selector: "text-message",
            data: JSON.stringify(message)
        };
        socket.send(JSON.stringify(textCarrier));
    }
    socket.addEventListener("open", () => {
        console.log("We are connected");
    });
})(soundMotion || (soundMotion = {}));
//# sourceMappingURL=happy_client.js.map
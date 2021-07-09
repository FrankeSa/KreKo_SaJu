"use strict";
var soundMotion;
(function (soundMotion) {
    const socket = new WebSocket("wss://soundmotion.herokuapp.com/");
    window.addEventListener("load", handleLoad);
    let audio = new Audio();
    let sad1;
    let sad2;
    let sad3;
    let sadSend1;
    let sadSend2;
    let sadSend3;
    function handleLoad(_event) {
        sad1 = document.querySelector("#sad1");
        sad2 = document.querySelector("#sad2");
        sad3 = document.querySelector("#sad3");
        sadSend1 = document.querySelector("#sad1 button");
        sadSend2 = document.querySelector("#sad2 button");
        sadSend3 = document.querySelector("#sad3 button");
        sad1.addEventListener("click", function () { play("./assets/sounds/sad/just_a_sad_song_V2.mp3"); });
        sad2.addEventListener("click", function () { play("./assets/sounds/sad/sad_situation.mp3"); });
        sad3.addEventListener("click", function () { play("./assets/sounds/sad/nobody_knows.mp3"); });
        sadSend1.addEventListener("click", function (e) { console.log("sending song1"); sendSound("./assets/sounds/sad/just_a_sad_song_V2.mp3"); e.stopImmediatePropagation(); });
        sadSend2.addEventListener("click", function (e) { sendSound("./assets/sounds/sad/sad_situation.mp3"); e.stopImmediatePropagation(); });
        sadSend3.addEventListener("click", function (e) { sendSound("./assets/sounds/sad/nobody_knows.mp3"); e.stopImmediatePropagation(); });
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
                console.log("following song was received", textMessage.text);
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
        console.log("following song has been sent", textCarrier.data);
    }
    socket.addEventListener("open", () => {
        console.log("We are connected");
    });
})(soundMotion || (soundMotion = {}));
//# sourceMappingURL=sad_client.js.map
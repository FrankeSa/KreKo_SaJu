"use strict";
var soundMotion;
(function (soundMotion) {
    // const socket: WebSocket = new WebSocket("ws://localhost:5000");
    const socket = new WebSocket("wss://soundmotion.herokuapp.com/");
    window.addEventListener("load", handleLoad);
    let inputField;
    let loginBtn;
    let username;
    let audio = new Audio();
    let love1;
    let love2;
    let love3;
    let loveSend1;
    let loveSend2;
    let loveSend3;
    function handleLoad(_event) {
        // Category Love ******
        love1 = document.querySelector("#love1");
        love2 = document.querySelector("#love2");
        love3 = document.querySelector("#love3");
        loveSend1 = document.querySelector("#love1 button");
        loveSend2 = document.querySelector("#love2 button");
        loveSend3 = document.querySelector("#love3 button");
        //Play the Sound
        love1.addEventListener("click", function () { play("./assets/sounds/love/hey_im_in_love.mp3"); });
        love2.addEventListener("click", function () { play("./assets/sounds/love/I_want_ur_stupid_love.mp3"); });
        love3.addEventListener("click", function () { play("./assets/sounds/love/keep_on_falling_in_love.mp3"); });
        // Send the Sound 
        loveSend1.addEventListener("click", function (e) { console.log("sendLove1 pushed"); sendSound("./assets/sounds/love/hey_im_in_love.mp3"); e.stopImmediatePropagation(); });
        loveSend2.addEventListener("click", function (e) { sendSound("./assets/sounds/love/I_want_ur_stupid_love.mp3"); e.stopImmediatePropagation(); });
        loveSend3.addEventListener("click", function (e) { sendSound("./assets/sounds/love/keep_on_falling_in_love.mp3"); e.stopImmediatePropagation(); });
    }
    let messageList; //= null; ?????
    // get div element
    // const messageListDiv: HTMLDivElement = <HTMLInputElement>document.getElementById("chatArea");
    function play(soundpiece) {
        audio.pause();
        audio.src = soundpiece;
        audio.play();
    }
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
                play(textMessage.text);
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
    // function getUsername(_event: Event): void {
    //     username = inputField.value;
    //     console.log(username);
    //     // alert("dein Nutzername ist:" + username);
    // }
    socket.addEventListener("open", () => {
        console.log("We are connected");
    });
})(soundMotion || (soundMotion = {})); //Ende Namespance
//# sourceMappingURL=client.js.map
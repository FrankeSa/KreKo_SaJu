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
    function handleLoad(_event) {
        // inputField = <HTMLInputElement>document.querySelector("#inputField");
        loginBtn = document.querySelector("#loginBtn");
        // loginBtn.addEventListener("click", getUsername);
        love1 = document.querySelector("#love1");
        love2 = document.querySelector("#love2");
        love3 = document.querySelector("#love3");
        loveSend1 = document.querySelector("#loveSend1");
        // loveSend1.addEventListener("click", function () { sendSound("./assets/sounds/love/hey_im_in_love.mp3") });
        loveSend1.addEventListener("click", test);
        love1.addEventListener("click", function () { sendSound("./assets/sounds/love/hey_im_in_love.mp3"); });
        love2.addEventListener("click", function () { play("./assets/sounds/love/I_want_ur_stupid_love.mp3"); });
        love3.addEventListener("click", function () { play("./assets/sounds/love/keep_on_falling_in_love.mp3"); });
    }
    let messageList; //= null; ?????
    // get div element
    // const messageListDiv: HTMLDivElement = <HTMLInputElement>document.getElementById("chatArea");
    function play(soundpiece) {
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
        let soundToSend = _soundpeace;
        const message = {
            text: soundToSend
        };
        const textCarrier = {
            selector: "text-message",
            data: JSON.stringify(message)
        };
        console.log(message);
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
    function test(_event) {
        console.log("SendSoundBtn clicked");
    }
})(soundMotion || (soundMotion = {})); //Ende Namespance
//# sourceMappingURL=client.js.map
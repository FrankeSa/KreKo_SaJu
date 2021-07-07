"use strict";
var soundMotion;
(function (soundMotion) {
    const socket = new WebSocket("ws://localhost:5000");
    // const socket: WebSocket = new WebSocket("wss://soundmotion.herokuapp.com/");
    window.addEventListener("load", handleLoad);
    let inputField;
    let loginBtn;
    let username;
    function handleLoad(_event) {
        inputField = document.querySelector("#inputField");
        loginBtn = document.querySelector("#loginBtn");
        loginBtn.addEventListener("click", getUsername);
    }
    let messageList; //= null; ?????
    // get div element
    const messageListDiv = document.getElementById("chatArea");
    socket.addEventListener("open", () => {
        console.log("We are connected");
    });
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
                // displayListUserNames();
                break;
            }
        }
    });
    function getUsername(_event) {
        username = inputField.value;
        console.log(username);
        // alert("dein Nutzername ist:" + username);
    }
})(soundMotion || (soundMotion = {})); //Ende Namespance
//# sourceMappingURL=client.js.map
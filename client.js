"use strict";
var soundMotion;
(function (soundMotion) {
    const socket = new WebSocket("ws://localhost:5000");
    // const socket: WebSocket = new WebSocket("wss://soundmotion.herokuapp.com/");
    window.addEventListener("load", handleLoad);
    let inputField;
    let loginBtn;
    function handleLoad(_event) {
        inputField = document.querySelector("#inputField");
        loginBtn = document.querySelector("#loginBtn");
        loginBtn.addEventListener("click", getUsername);
    }
    function getUsername(_event) {
        let username = inputField.value;
        console.log(username);
        // alert("dein Nutzername ist:" + username);
    }
    socket.addEventListener("open", (event) => {
        console.log("We are connected");
    });
})(soundMotion || (soundMotion = {})); //Ende Namespance
//# sourceMappingURL=client.js.map
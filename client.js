"use strict";
var soundMotion;
(function (soundMotion) {
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
})(soundMotion || (soundMotion = {})); //Ende Namespance
//# sourceMappingURL=client.js.map
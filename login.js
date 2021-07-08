"use strict";
var soundMotion;
(function (soundMotion) {
    let inputField;
    let loginBtn;
    let username;
    window.addEventListener("load", handleLoad);
    function handleLoad(_event) {
        inputField = document.querySelector("#inputField");
        loginBtn = document.querySelector("#loginBtn");
        loginBtn.addEventListener("click", getUsername);
    }
    function getUsername(_event) {
        username = inputField.value;
        console.log(username);
        // alert("dein Nutzername ist:" + username);
    }
})(soundMotion || (soundMotion = {}));
//# sourceMappingURL=login.js.map
"use strict";
var soundMotion;
(function (soundMotion) {
    const socket = new WebSocket("wss://soundmotion.herokuapp.com/");
    let audio = new Audio();
    window.addEventListener("click", handleLoad);
    function handleLoad(_event) {
        function play(_textMessage) {
            audio.pause();
            audio.src = _textMessage;
            audio.play();
        }
        console.log("Hier bist du im Chat");
        let messageList; //= null; ?????
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
                    // audio.src = textMessage.text;
                    // audio.play(); 
                    play(textMessage.text);
                    console.log(textMessage.text);
                    // displayListUserNames();
                    break;
                }
            }
        });
    }
    socket.addEventListener("open", () => {
        console.log("We are connected in Chat");
    });
})(soundMotion || (soundMotion = {}));
//# sourceMappingURL=chat.js.map
"use strict";
var soundMotion;
(function (soundMotion) {
    window.addEventListener("load", handleLoad);
    let audio = new Audio();
    let love1;
    let love2;
    let love3;
    function handleLoad(_event) {
        //category happy
        love1 = document.querySelector("#love1");
        love1.addEventListener("click", function () { play("hey_im_in_love.mp3"); });
        love2 = document.querySelector("#love2");
        love2.addEventListener("click", function () { play("I_want_ur_stupid_love.mp3"); });
        love3 = document.querySelector("#love3");
        love3.addEventListener("click", function () { play("keep_on_falling_in_love.mp3"); });
    }
    function play(soundpiece) {
        audio.src = "./assets/sounds/love/" + soundpiece;
        audio.play();
    }
})(soundMotion || (soundMotion = {}));
//# sourceMappingURL=love_handleSound.js.map
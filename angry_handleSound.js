"use strict";
var soundMotion;
(function (soundMotion) {
    window.addEventListener("load", handleLoad);
    let audio = new Audio();
    let angry1;
    let angry2;
    let angry3;
    function handleLoad(_event) {
        //category happy
        angry1 = document.querySelector("#angry1");
        angry1.addEventListener("click", function () { play("fk_you_very_much.mp3"); });
        angry2 = document.querySelector("#angry2");
        angry2.addEventListener("click", function () { play("i_hate_u_so_much_right_now.mp3"); });
        angry3 = document.querySelector("#angry3");
        angry3.addEventListener("click", function () { play("im_t_n_t.mp3"); });
    }
    function play(soundpiece) {
        audio.src = "./assets/sounds/angry/" + soundpiece;
        audio.play();
    }
})(soundMotion || (soundMotion = {}));
//# sourceMappingURL=angry_handleSound.js.map
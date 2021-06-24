"use strict";
var soundMotion;
(function (soundMotion) {
    window.addEventListener("load", handleLoad);
    let happy1;
    let happy2;
    let happy3;
    let audio = new Audio();
    function handleLoad(_event) {
        happy1 = document.querySelector("#happy1");
        happy1.addEventListener("click", function () { play("cant_stop_smilin.mp3"); });
        happy2 = document.querySelector("#happy2");
        happy2.addEventListener("click", function () { play("because_im_happy.mp3"); });
        happy3 = document.querySelector("#happy3");
        happy3.addEventListener("click", function () { play("heute_hab_ich_gute_laune.mp3"); });
    }
    function play(soundpiece) {
        audio.src = "./assets/sounds/happy/" + soundpiece;
        audio.play();
    }
    // function handleLoad(_event: Event): void {
    //     happy1 = <HTMLDivElement>document.querySelector("#happy1");
    //     happy1.addEventListener("click", (event) => {
    //         let sound: HTMLAudioElement = new Audio("assets/" + "cant_stop_smilin.mp3");
    //         sound.play();
    //     }
    // }
})(soundMotion || (soundMotion = {}));
//# sourceMappingURL=handleSound.js.map
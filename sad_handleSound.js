"use strict";
var soundMotion;
(function (soundMotion) {
    window.addEventListener("load", handleLoad);
    let audio = new Audio();
    let sad1;
    let sad2;
    let sad3;
    function handleLoad(_event) {
        sad1 = document.querySelector("#sad1");
        sad1.addEventListener("click", function () { play("just_a_sad_song_V2.mp3"); });
        sad2 = document.querySelector("#sad2");
        sad2.addEventListener("click", function () { play("sad_situation.mp3"); });
        sad3 = document.querySelector("#sad3");
        sad3.addEventListener("click", function () { play("nobody_knows.mp3"); });
    }
    function play(soundpiece) {
        audio.src = "./assets/sounds/sad/" + soundpiece;
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
//# sourceMappingURL=sad_handleSound.js.map
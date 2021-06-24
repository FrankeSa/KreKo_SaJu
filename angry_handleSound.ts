namespace soundMotion {

    window.addEventListener("load", handleLoad);
    let audio: HTMLAudioElement = new Audio();
    let angry1: HTMLDivElement;
    let angry2: HTMLDivElement;
    let angry3: HTMLDivElement;




    function handleLoad(_event: Event): void {

        angry1 = <HTMLDivElement>document.querySelector("#angry1");
        angry1.addEventListener("click", function () { play("fk_you_very_much.mp3") });
        angry2 = <HTMLDivElement>document.querySelector("#angry2");
        angry2.addEventListener("click", function () { play("i_hate_u_so_much_right_now.mp3") });
        angry3 = <HTMLDivElement>document.querySelector("#angry3");
        angry3.addEventListener("click", function () { play("im_t_n_t.mp3") });
    }


    function play(soundpiece: string): void {
        audio.src = "./assets/sounds/angry/" + soundpiece;
        audio.play();
    }

}
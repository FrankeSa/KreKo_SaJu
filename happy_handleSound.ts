namespace soundMotion {

    window.addEventListener("load", handleLoad);
    let audio: HTMLAudioElement = new Audio();
    let happy1: HTMLDivElement;
    let happy2: HTMLDivElement;
    let happy3: HTMLDivElement;

    function handleLoad(_event: Event): void {
        happy1 = <HTMLDivElement>document.querySelector("#happy1");
        happy1.addEventListener("click", function () { play("cant_stop_smilin.mp3") });
        happy2 = <HTMLDivElement>document.querySelector("#happy2");
        happy2.addEventListener("click", function () { play("because_im_happy.mp3") });
        happy3 = <HTMLDivElement>document.querySelector("#happy3");
        happy3.addEventListener("click", function () { play("sunshine_in_my_pocket_V2.mp3") });
    }


    function play(soundpiece: string): void {
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









}
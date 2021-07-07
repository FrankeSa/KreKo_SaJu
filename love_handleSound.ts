namespace soundMotion {

    window.addEventListener("load", handleLoad);
    let audio: HTMLAudioElement = new Audio();
    let love1: HTMLDivElement;
    let love2: HTMLDivElement;
    let love3: HTMLDivElement;
   


    function handleLoad(_event: Event): void {
        
        love1 = <HTMLDivElement>document.querySelector("#love1");
        love1.addEventListener("click", function () { play("./assets/sounds/love/hey_im_in_love.mp3") });
        love2 = <HTMLDivElement>document.querySelector("#love2");
        love2.addEventListener("click", function () { play("./assets/sounds/love/I_want_ur_stupid_love.mp3") });
        love3 = <HTMLDivElement>document.querySelector("#love3");
        love3.addEventListener("click", function () { play("./assets/sounds/love/keep_on_falling_in_love.mp3") });
        
    }

    function play(soundpiece: string): void {
        audio.src = soundpiece;
        audio.play();
    }

}
namespace soundMotion {
    const socket: WebSocket = new WebSocket("ws://localhost:5000");
    // const socket: WebSocket = new WebSocket("wss://soundmotion.herokuapp.com/");

    window.addEventListener("load", handleLoad);
    let inputField: HTMLInputElement;
    let loginBtn: HTMLButtonElement;


    function handleLoad(_event: Event): void {

        inputField = <HTMLInputElement>document.querySelector("#inputField");
        loginBtn = <HTMLButtonElement>document.querySelector("#loginBtn");
        loginBtn.addEventListener("click", getUsername);
    }
    function getUsername(_event: Event): void {
        let username: string = inputField.value;
        console.log(username);
        // alert("dein Nutzername ist:" + username);
    }

    socket.addEventListener("open", (event) => {
        console.log("We are connected");

    });















}//Ende Namespance
namespace soundMotion {

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
        alert("dein Nutzername ist:" + username);
    }





















}//Ende Namespance
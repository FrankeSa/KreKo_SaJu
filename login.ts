namespace soundMotion {
    let inputField: HTMLInputElement;
    let loginBtn: HTMLButtonElement;
    let username: string;

    window.addEventListener("load", handleLoad);

    function handleLoad(_event: Event): void {

        inputField = <HTMLInputElement>document.querySelector("#inputField");
        loginBtn = <HTMLButtonElement>document.querySelector("#loginBtn");
        loginBtn.addEventListener("click", getUsername);



    }
    
    function getUsername(_event: Event): void {
        username = inputField.value;
        console.log(username);
        // alert("dein Nutzername ist:" + username);
    }






}
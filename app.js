let bouton = document.getElementById("btnEnvoyer");

bouton.addEventListener("click", envoyerMessage);

function envoyerMessage() {
    let input = document.getElementById("messageInput");
    let message = input.value.trim();

    let zone = document.getElementById("messages");

    if (message !== "") {
        let nouveau = document.createElement("p");
        nouveau.textContent = message;

        zone.appendChild(nouveau);

        input.value = "";

        zone.scrollTop = zone.scrollHeight;
    }
}
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Messagerie</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <header>
        <h1>Messagerie</h1>
    </header>
    <main>
        <section class="conversations">
            <h2>Conversations</h2>
            <ul id="liste-conversations">
                <!-- Les conversations seront affichées ici -->
            </ul>
        </section>
        <section class="messages">
            <h2>Messages</h2>
            <div id="messages-container">
                <!-- Les messages seront affichés ici -->
            </div>
            <form id="form-message">
                <input type="text" id="message-input" placeholder="Écrire un message...">
                <button type="submit">Envoyer</button>
            </form>
        </section>
    </main>
    <script src="script.js"></script>
</body>
</html>
let messages = JSON.parse(localStorage.getItem("messages")) || [];

// Afficher les messages
function displayMessages() {
  const list = document.getElementById("messages");
  list.innerHTML = "";

  messages.forEach((m) => {
    const li = document.createElement("li");
    li.innerHTML = "<b>" + m.pseudo + ":</b> " + m.text;
    list.appendChild(li);
  });
}

// Envoyer un message
function sendMessage() {
  const pseudo = document.getElementById("pseudo").value;
  const msg = document.getElementById("msg").value;

  if (pseudo === "" || msg === "") {
    alert("Remplis tous les champs !");
    return;
  }

  const message = {
    pseudo: pseudo,
    text: msg,
    time: new Date().toLocaleTimeString()
  };

  messages.push(message);

  // Sauvegarder
  localStorage.setItem("messages", JSON.stringify(messages));

  document.getElementById("msg").value = "";

  displayMessages();
}

// Charger au début
displayMessages();

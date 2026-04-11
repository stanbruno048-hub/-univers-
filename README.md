<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8">
<title>MyChat</title>

<style>
body {
  margin: 0;
  font-family: Arial, sans-serif;
  background: #111b21;
  color: white;
}

/* WELCOME SCREEN */
#welcome {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #00a884, #202c33);
}

#welcome h1 {
  font-size: 32px;
  margin-bottom: 20px;
}

#welcome button {
  padding: 12px 20px;
  border: none;
  border-radius: 20px;
  background: white;
  color: #00a884;
  font-size: 16px;
}

/* HEADER */
.header {
  background: #202c33;
  padding: 15px;
  font-size: 20px;
}

/* CONTACT LIST */
.contacts {
  height: 90vh;
  overflow-y: auto;
}

.contact {
  padding: 15px;
  border-bottom: 1px solid #2a3942;
  cursor: pointer;
}

.contact:hover {
  background: #2a3942;
}

/* CHAT SCREEN */
.chat-screen {
  display: none;
  flex-direction: column;
  height: 100vh;
}

.chat-header {
  background: #202c33;
  padding: 15px;
}

/* MESSAGES */
.chat-box {
  flex: 1;
  padding: 10px;
  overflow-y: auto;
  background: #0b141a;
}

.message {
  max-width: 70%;
  padding: 10px;
  margin: 5px;
  border-radius: 10px;
}

.sent {
  background: #005c4b;
  margin-left: auto;
}

.received {
  background: #202c33;
}

/* INPUT */
.input-area {
  display: flex;
  padding: 10px;
  background: #202c33;
}

input {
  flex: 1;
  padding: 10px;
  border-radius: 20px;
  border: none;
}

button {
  margin-left: 10px;
  padding: 10px;
  border-radius: 50%;
  border: none;
  background: #00a884;
  color: white;
}
</style>
</head>

<body>

<!-- WELCOME -->
<div id="welcome">
  <h1>🌍 Bien sûr Univers</h1>
  <button onclick="enterApp()">Entrer</button>
</div>

<!-- HOME -->
<div id="home" style="display:none;">
  <div class="header">MyChat 💬</div>

  <div class="contacts">
    <div class="contact" onclick="openChat('Alice')">Alice</div>
    <div class="contact" onclick="openChat('Bob')">Bob</div>
    <div class="contact" onclick="openChat('Charlie')">Charlie</div>
  </div>
</div>

<!-- CHAT -->
<div id="chatScreen" class="chat-screen">
  <div class="chat-header">
    <button onclick="goBack()">⬅</button>
    <span id="chatName"></span>
  </div>

  <div id="chatBox" class="chat-box"></div>

  <div class="input-area">
    <input type="text" id="msg" placeholder="Message...">
    <button onclick="sendMessage()">➤</button>
  </div>
</div>

<script>
function enterApp() {
  document.getElementById("welcome").style.display = "none";
  document.getElementById("home").style.display = "block";
}

let currentChat = "";

function openChat(name) {
  currentChat = name;
  document.getElementById("home").style.display = "none";
  document.getElementById("chatScreen").style.display = "flex";
  document.getElementById("chatName").innerText = name;
  document.getElementById("chatBox").innerHTML = "";
}

function goBack() {
  document.getElementById("home").style.display = "block";
  document.getElementById("chatScreen").style.display = "none";
}

function sendMessage() {
  let input = document.getElementById("msg");
  let text = input.value;

  if(text.trim() === "") return;

  let chatBox = document.getElementById("chatBox");

  let div = document.createElement("div");
  div.className = "message sent";
  div.innerText = text;

  chatBox.appendChild(div);

  input.value = "";

  chatBox.scrollTop = chatBox.scrollHeight;

  setTimeout(() => {
    let reply = document.createElement("div");
    reply.className = "message received";
    reply.innerText = "Salut 👋";

    chatBox.appendChild(reply);
    chatBox.scrollTop = chatBox.scrollHeight;
  }, 1000);
}
</script>

</body>
</html>

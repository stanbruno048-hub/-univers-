<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8">
<title>Univers Chat</title>

<style>
body {
  margin: 0;
  font-family: Arial;
  background: #111b21;
  color: white;
}

/* LOGIN */
#login {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #00a884, #202c33);
}

#login input {
  margin: 10px;
  padding: 12px;
  width: 250px;
  border-radius: 20px;
  border: none;
}

#login button {
  padding: 12px 20px;
  border-radius: 20px;
  border: none;
  background: white;
  color: #00a884;
}

/* HEADER */
.header {
  background: #202c33;
  padding: 15px;
  font-size: 18px;
}

/* CONTACTS */
.contacts {
  height: 90vh;
  overflow-y: auto;
}

.contact {
  padding: 15px;
  border-bottom: 1px solid #2a3942;
  cursor: pointer;
}

/* CHAT */
.chat-screen {
  display: none;
  flex-direction: column;
  height: 100vh;
}

.chat-box {
  flex: 1;
  padding: 10px;
  overflow-y: auto;
  background: #0b141a;
}

.message {
  padding: 10px;
  margin: 5px;
  border-radius: 10px;
  max-width: 70%;
}

.sent {
  background: #005c4b;
  margin-left: auto;
}

.received {
  background: #202c33;
}

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

<!-- LOGIN -->
<div id="login">
  <h2>🌍 Bien sûr Univers</h2>
  <input type="text" id="name" placeholder="Ton nom">
  <input type="number" id="phone" placeholder="Ton numéro">
  <button onclick="login()">Entrer</button>
</div>

<!-- HOME -->
<div id="home" style="display:none;">
  <div class="header" id="userName"></div>

  <div class="contacts">
    <div class="contact" onclick="openChat('Alice')">Alice</div>
    <div class="contact" onclick="openChat('Bob')">Bob</div>
  </div>
</div>

<!-- CHAT -->
<div id="chatScreen" class="chat-screen">
  <div class="header">
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
let currentUser = "";
let currentChat = "";

// LOGIN
function login() {
  let name = document.getElementById("name").value;
  let phone = document.getElementById("phone").value;

  if(name === "" || phone === "") {
    alert("Remplis les champs !");
    return;
  }

  currentUser = name;

  localStorage.setItem("userName", name);
  localStorage.setItem("userPhone", phone);

  document.getElementById("login").style.display = "none";
  document.getElementById("home").style.display = "block";

  document.getElementById("userName").innerText = "👤 " + name;
}

// OPEN CHAT
function openChat(name) {
  currentChat = name;

  document.getElementById("home").style.display = "none";
  document.getElementById("chatScreen").style.display = "flex";
  document.getElementById("chatName").innerText = name;

  loadMessages();
}

// BACK
function goBack() {
  document.getElementById("home").style.display = "block";
  document.getElementById("chatScreen").style.display = "none";
}

// SEND MESSAGE
function sendMessage() {
  let input = document.getElementById("msg");
  let text = input.value;

  if(text.trim() === "") return;

  let messages = JSON.parse(localStorage.getItem(currentChat)) || [];

  messages.push({text: text, type: "sent"});

  localStorage.setItem(currentChat, JSON.stringify(messages));

  input.value = "";
  loadMessages();

  // simulation réponse
  setTimeout(() => {
    messages.push({text: "Salut 👋", type: "received"});
    localStorage.setItem(currentChat, JSON.stringify(messages));
    loadMessages();
  }, 1000);
}

// LOAD MESSAGES
function loadMessages() {
  let chatBox = document.getElementById("chatBox");
  chatBox.innerHTML = "";

  let messages = JSON.parse(localStorage.getItem(currentChat)) || [];

  messages.forEach(msg => {
    let div = document.createElement("div");
    div.className = "message " + msg.type;
    div.innerText = msg.text;
    chatBox.appendChild(div);
  });

  chatBox.scrollTop = chatBox.scrollHeight;
}
</script>

</body>
</html>
<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8">
<title>Univers Chat</title>

<style>
body {
  margin: 0;
  font-family: Arial;
  background: #111b21;
  color: white;
}

/* LOGIN */
#login {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #00a884, #202c33);
}

#login input {
  margin: 10px;
  padding: 12px;
  width: 250px;
  border-radius: 20px;
  border: none;
}

#login button {
  padding: 12px;
  border-radius: 20px;
  border: none;
  background: white;
  color: #00a884;
}

/* HEADER */
.header {
  background: #202c33;
  padding: 15px;
  font-size: 18px;
}

/* CONTACTS */
.contacts {
  height: 60vh;
  overflow-y: auto;
}

.contact {
  padding: 15px;
  border-bottom: 1px solid #2a3942;
  cursor: pointer;
}

/* ADD CONTACT */
.add-contact {
  padding: 10px;
  background: #202c33;
}

.add-contact input {
  width: 40%;
  padding: 10px;
  margin: 5px;
  border-radius: 20px;
  border: none;
}

/* CHAT */
.chat-screen {
  display: none;
  flex-direction: column;
  height: 100vh;
}

.chat-box {
  flex: 1;
  padding: 10px;
  overflow-y: auto;
  background: #0b141a;
}

.message {
  padding: 10px;
  margin: 5px;
  border-radius: 10px;
  max-width: 70%;
}

.sent {
  background: #005c4b;
  margin-left: auto;
}

.received {
  background: #202c33;
}

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
  margin-left: 5px;
  padding: 10px;
  border-radius: 20px;
  border: none;
  background: #00a884;
  color: white;
}
</style>
</head>

<body>

<!-- LOGIN -->
<div id="login">
  <h2>🌍 Bien sûr Univers</h2>
  <input type="text" id="name" placeholder="Ton nom">
  <input type="number" id="phone" placeholder="Ton numéro">
  <button onclick="login()">Entrer</button>
</div>

<!-- HOME -->
<div id="home" style="display:none;">
  <div class="header" id="userName"></div>

  <!-- ADD CONTACT -->
  <div class="add-contact">
    <input type="text" id="contactName" placeholder="Nom contact">
    <input type="number" id="contactPhone" placeholder="Numéro">
    <button onclick="addContact()">Ajouter</button>
  </div>

  <!-- CONTACT LIST -->
  <div id="contactsList" class="contacts"></div>
</div>

<!-- CHAT -->
<div id="chatScreen" class="chat-screen">
  <div class="header">
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
let currentChat = "";

// LOGIN
function login() {
  let name = document.getElementById("name").value;
  let phone = document.getElementById("phone").value;

  if(name === "" || phone === "") {
    alert("Remplis les champs !");
    return;
  }

  localStorage.setItem("userName", name);

  document.getElementById("login").style.display = "none";
  document.getElementById("home").style.display = "block";

  document.getElementById("userName").innerText = "👤 " + name;

  loadContacts();
}

// ADD CONTACT
function addContact() {
  let name = document.getElementById("contactName").value;
  let phone = document.getElementById("contactPhone").value;

  if(name === "" || phone === "") return;

  let contacts = JSON.parse(localStorage.getItem("contacts")) || [];

  contacts.push({name, phone});
  localStorage.setItem("contacts", JSON.stringify(contacts));

  document.getElementById("contactName").value = "";
  document.getElementById("contactPhone").value = "";

  loadContacts();
}

// LOAD CONTACTS
function loadContacts() {
  let list = document.getElementById("contactsList");
  list.innerHTML = "";

  let contacts = JSON.parse(localStorage.getItem("contacts")) || [];

  contacts.forEach(contact => {
    let div = document.createElement("div");
    div.className = "contact";
    div.innerText = contact.name + " (" + contact.phone + ")";
    div.onclick = () => openChat(contact.name);
    list.appendChild(div);
  });
}

// OPEN CHAT
function openChat(name) {
  currentChat = name;

  document.getElementById("home").style.display = "none";
  document.getElementById("chatScreen").style.display = "flex";
  document.getElementById("chatName").innerText = name;

  loadMessages();
}

// BACK
function goBack() {
  document.getElementById("home").style.display = "block";
  document.getElementById("chatScreen").style.display = "none";
}

// SEND MESSAGE
function sendMessage() {
  let input = document.getElementById("msg");
  let text = input.value;

  if(text.trim() === "") return;

  let messages = JSON.parse(localStorage.getItem(currentChat)) || [];

  messages.push({text: text, type: "sent"});

  localStorage.setItem(currentChat, JSON.stringify(messages));

  input.value = "";
  loadMessages();

  setTimeout(() => {
    messages.push({text: "OK 👍", type: "received"});
    localStorage.setItem(currentChat, JSON.stringify(messages));
    loadMessages();
  }, 1000);
}

// LOAD MESSAGES
function loadMessages() {
  let chatBox = document.getElementById("chatBox");
  chatBox.innerHTML = "";

  let messages = JSON.parse(localStorage.getItem(currentChat)) || [];

  messages.forEach(msg => {
    let div = document.createElement("div");
    div.className = "message " + msg.type;
    div.innerText = msg.text;
    chatBox.appendChild(div);
  });

  chatBox.scrollTop = chatBox.scrollHeight;
}
</script>

</body>
</html>

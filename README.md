🌍 Univers Chat - Application de Messagerie

📱 Description

Cette application est une messagerie simple avec :

- Écran de bienvenue
- Identification (nom + numéro)
- Ajout de contacts
- Discussion avec contacts
- Compartiment secret avec code 🔐

---

🚀 Installation

1. Ouvre une app comme Acode ou Spck Editor
2. Crée un fichier :

index.html

3. Copie le code ci-dessous
4. Lance le fichier dans ton navigateur

---

💻 Code complet

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

/* WELCOME */
#welcome, #login, #secretLock {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #00a884, #202c33);
}

input {
  margin: 10px;
  padding: 12px;
  width: 250px;
  border-radius: 20px;
  border: none;
}

button {
  padding: 10px 15px;
  border-radius: 20px;
  border: none;
  background: white;
  color: #00a884;
  margin: 5px;
}

/* HEADER */
.header {
  background: #202c33;
  padding: 15px;
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
</style>
</head>

<body>

<!-- WELCOME -->
<div id="welcome">
  <h1>🌍 Bien sûr Univers</h1>
  <button onclick="goLogin()">Entrer</button>
</div>

<!-- LOGIN -->
<div id="login" style="display:none;">
  <h2>Identification</h2>
  <input id="name" placeholder="Nom">
  <input id="phone" placeholder="Numéro">
  <button onclick="login()">Continuer</button>
</div>

<!-- HOME -->
<div id="home" style="display:none;">
  <div class="header" id="userName"></div>

  <div>
    <input id="contactName" placeholder="Nom contact">
    <input id="contactPhone" placeholder="Numéro contact">
    <button onclick="addContact()">Ajouter</button>
  </div>

  <button onclick="openSecret()">🔐 Secret</button>

  <div id="contactsList" class="contacts"></div>
</div>

<!-- SECRET LOCK -->
<div id="secretLock" style="display:none;">
  <h2>Entrer le code secret</h2>
  <input id="secretCode" placeholder="Code">
  <button onclick="checkCode()">Entrer</button>
</div>

<!-- SECRET AREA -->
<div id="secretArea" style="display:none;">
  <div class="header">🔐 Zone secrète</div>
  <p style="padding:20px;">Messages cachés ici 👀</p>
  <button onclick="backHome()">Retour</button>
</div>

<!-- CHAT -->
<div id="chatScreen" class="chat-screen">
  <div class="header">
    <button onclick="backHome()">⬅</button>
    <span id="chatName"></span>
  </div>

  <div id="chatBox" class="chat-box"></div>

  <div class="input-area">
    <input id="msg" placeholder="Message...">
    <button onclick="sendMessage()">➤</button>
  </div>
</div>

<script>
function hideAll() {
  document.querySelectorAll("body > div").forEach(d => d.style.display="none");
}

function goLogin() {
  hideAll();
  document.getElementById("login").style.display = "flex";
}

function login() {
  let name = document.getElementById("name").value;
  let phone = document.getElementById("phone").value;

  if(name === "" || phone === "") return alert("Remplis tout");

  localStorage.setItem("user", name);
  localStorage.setItem("secret", "1234");

  hideAll();
  document.getElementById("home").style.display = "block";
  document.getElementById("userName").innerText = "👤 " + name;

  loadContacts();
}

function addContact() {
  let name = document.getElementById("contactName").value;
  let phone = document.getElementById("contactPhone").value;

  let contacts = JSON.parse(localStorage.getItem("contacts")) || [];
  contacts.push({name, phone});
  localStorage.setItem("contacts", JSON.stringify(contacts));

  loadContacts();
}

function loadContacts() {
  let list = document.getElementById("contactsList");
  list.innerHTML = "";

  let contacts = JSON.parse(localStorage.getItem("contacts")) || [];

  contacts.forEach(c => {
    let div = document.createElement("div");
    div.className = "contact";
    div.innerText = c.name + " ("+c.phone+")";
    div.onclick = () => openChat(c.name);
    list.appendChild(div);
  });
}

let currentChat = "";

function openChat(name) {
  currentChat = name;
  hideAll();
  document.getElementById("chatScreen").style.display = "flex";
  document.getElementById("chatName").innerText = name;
  loadMessages();
}

function sendMessage() {
  let text = document.getElementById("msg").value;

  let msgs = JSON.parse(localStorage.getItem(currentChat)) || [];
  msgs.push({text, type:"sent"});
  localStorage.setItem(currentChat, JSON.stringify(msgs));

  document.getElementById("msg").value="";
  loadMessages();

  setTimeout(()=>{
    msgs.push({text:"OK 👍", type:"received"});
    localStorage.setItem(currentChat, JSON.stringify(msgs));
    loadMessages();
  },1000);
}

function loadMessages() {
  let box = document.getElementById("chatBox");
  box.innerHTML="";

  let msgs = JSON.parse(localStorage.getItem(currentChat)) || [];

  msgs.forEach(m=>{
    let div = document.createElement("div");
    div.className="message "+m.type;
    div.innerText=m.text;
    box.appendChild(div);
  });

  box.scrollTop = box.scrollHeight;
}

function openSecret() {
  hideAll();
  document.getElementById("secretLock").style.display = "flex";
}

function checkCode() {
  let code = document.getElementById("secretCode").value;
  if(code === localStorage.getItem("secret")) {
    hideAll();
    document.getElementById("secretArea").style.display="block";
  } else {
    alert("Code incorrect");
  }
}

function backHome() {
  hideAll();
  document.getElementById("home").style.display="block";
}
</script>

</body>
</html>

---

🔐 Code secret par défaut

1234

---

⚠️ Important

- Cette app fonctionne sans internet
- Les contacts sont ajoutés manuellement
- Les messages sont stockés sur ton téléphone

---

🔥 Prochaine amélioration possible

- Chat réel avec internet 🌐
- Envoi d’images 📷
- Notifications 🔔
- Version APK Android 📱

---

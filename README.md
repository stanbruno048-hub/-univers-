<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Chat</title>
</head>

<body style="font-family: Arial; background:#111; color:white;">

<!-- WELCOME -->
<div id="welcome">
  <h2>🌍 Bien sûr Univers</h2>
  <button onclick="showLogin()">Entrer</button>
</div>

<!-- LOGIN -->
<div id="login" style="display:none;">
  <h3>Connexion</h3>
  <input id="name" placeholder="Nom"><br><br>
  <input id="phone" placeholder="Numéro"><br><br>
  <button onclick="login()">Continuer</button>
</div>

<!-- HOME -->
<div id="home" style="display:none;">
  <h3 id="user"></h3>

  <h4>Ajouter contact</h4>
  <input id="cname" placeholder="Nom"><br>
  <input id="cphone" placeholder="Numéro"><br>
  <button onclick="addContact()">Ajouter</button>

  <h4>Contacts</h4>
  <div id="list"></div>

  <button onclick="secret()">🔐 Secret</button>
</div>

<!-- CHAT -->
<div id="chat" style="display:none;">
  <button onclick="back()">⬅</button>
  <h3 id="chatName"></h3>

  <div id="messages"></div>

  <input id="msg" placeholder="Message">
  <button onclick="send()">Envoyer</button>
</div>

<!-- SECRET -->
<div id="lock" style="display:none;">
  <h3>Code secret</h3>
  <input id="code">
  <button onclick="check()">Entrer</button>
</div>

<div id="secretArea" style="display:none;">
  <h3>Zone secrète 🔐</h3>
  <button onclick="back()">Retour</button>
</div>

<script>
function hideAll() {
  let divs = document.querySelectorAll("body > div");
  divs.forEach(d => d.style.display = "none");
}

function showLogin() {
  hideAll();
  document.getElementById("login").style.display = "block";
}

function login() {
  let name = document.getElementById("name").value;
  if(name=="") return alert("Entre ton nom");

  localStorage.setItem("user", name);
  localStorage.setItem("secret", "1234");

  hideAll();
  document.getElementById("home").style.display = "block";
  document.getElementById("user").innerText = name;

  loadContacts();
}

function addContact() {
  let name = document.getElementById("cname").value;

  let contacts = JSON.parse(localStorage.getItem("contacts")) || [];
  contacts.push(name);
  localStorage.setItem("contacts", JSON.stringify(contacts));

  loadContacts();
}

function loadContacts() {
  let list = document.getElementById("list");
  list.innerHTML = "";

  let contacts = JSON.parse(localStorage.getItem("contacts")) || [];

  contacts.forEach(c => {
    let div = document.createElement("div");
    div.innerText = c;
    div.onclick = () => openChat(c);
    list.appendChild(div);
  });
}

let current = "";

function openChat(name) {
  current = name;

  hideAll();
  document.getElementById("chat").style.display = "block";
  document.getElementById("chatName").innerText = name;

  loadMessages();
}

function send() {
  let text = document.getElementById("msg").value;

  let msgs = JSON.parse(localStorage.getItem(current)) || [];
  msgs.push(text);

  localStorage.setItem(current, JSON.stringify(msgs));

  document.getElementById("msg").value = "";
  loadMessages();
}

function loadMessages() {
  let box = document.getElementById("messages");
  box.innerHTML = "";

  let msgs = JSON.parse(localStorage.getItem(current)) || [];

  msgs.forEach(m => {
    let p = document.createElement("p");
    p.innerText = m;
    box.appendChild(p);
  });
}

function secret() {
  hideAll();
  document.getElementById("lock").style.display = "block";
}

function check() {
  let code = document.getElementById("code").value;
  if(code === "1234") {
    hideAll();
    document.getElementById("secretArea").style.display = "block";
  } else {
    alert("Faux code");
  }
}

function back() {
  hideAll();
  document.getElementById("home").style.display = "block";
}
</script>

</body>
</html>

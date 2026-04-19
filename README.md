const SUPABASE_URL = "TON_URL";
const SUPABASE_KEY = "TA_CLE";

const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

let currentUser = null;
let currentContact = null;

// INSCRIPTION
async function signup() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const { data, error } = await client.auth.signUp({
    email,
    password
  });

  if (error) alert(error.message);
  else alert("Compte créé !");
}

// CONNEXION
async function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const { data, error } = await client.auth.signInWithPassword({
    email,
    password
  });

  if (error) {
    alert(error.message);
  } else {
    currentUser = data.user;
    document.getElementById("auth").style.display = "none";
    document.getElementById("app").style.display = "block";
    loadContacts();
  }
}

// CONTACTS (tous les utilisateurs sauf toi)
async function loadContacts() {
  const { data } = await client.auth.admin.listUsers(); // ⚠️ simplifié

  const list = document.getElementById("contacts");
  list.innerHTML = "";

  data.users.forEach(user => {
    if (user.id !== currentUser.id) {
      const li = document.createElement("li");
      li.textContent = user.email;
      li.onclick = () => selectContact(user);
      list.appendChild(li);
    }
  });
}

// Sélection contact
function selectContact(user) {
  currentContact = user;
  loadMessages();
}

// ENVOYER MESSAGE
async function sendMessage() {
  const text = document.getElementById("message").value;

  await client.from("messages").insert([{
    sender: currentUser.id,
    receiver: currentContact.id,
    text
  }]);

  document.getElementById("message").value = "";
  loadMessages();
}

// CHARGER MESSAGES
async function loadMessages() {
  const { data } = await client
    .from("messages")
    .select("*");

  const chat = document.getElementById("chat");
  chat.innerHTML = "";

  data.forEach(msg => {
    if (
      (msg.sender === currentUser.id && msg.receiver === currentContact.id) ||
      (msg.sender === currentContact.id && msg.receiver === currentUser.id)
    ) {
      const div = document.createElement("div");
      div.textContent = msg.text;
      chat.appendChild(div);
    }
  });
}

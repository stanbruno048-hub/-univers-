import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm";

// COLLE ICI TES CLÉS SUPABASE
const supabaseUrl = "https://TON-PROJET.supabase.co";
const supabaseKey = "TA_ANON_KEY";

const supabase = createClient(supabaseUrl, supabaseKey);

let pseudo = "";
let phone = "";

// Éléments DOM
const loginScreen = document.getElementById("loginScreen");
const chatScreen = document.getElementById("chatScreen");
const pseudoInput = document.getElementById("pseudoInput");
const phoneInput = document.getElementById("phoneInput");
const btnConnexion = document.getElementById("btnConnexion");
const btnDeconnexion = document.getElementById("btnDeconnexion");
const btnEnvoyer = document.getElementById("btnEnvoyer");
const messageInput = document.getElementById("messageInput");
const messagesWrapper = document.getElementById("messagesWrapper");
const userInfo = document.getElementById("userInfo");

// Connexion
btnConnexion.addEventListener("click", async () => {
  pseudo = pseudoInput.value.trim();
  phone = phoneInput.value.trim();
  
  if (pseudo === "" || phone === "") {
    alert("Remplis ton pseudo et ton numéro");
    return;
  }
  
  // Basculer vers le chat
  loginScreen.classList.remove("active");
  chatScreen.classList.add("active");
  userInfo.textContent = pseudo;
  
  // Charger les anciens messages puis écouter les nouveaux
  await chargerMessages();
  ecouterMessages();
});

// Déconnexion
btnDeconnexion.addEventListener("click", () => {
  chatScreen.classList.remove("active");
  loginScreen.classList.add("active");
  messagesWrapper.innerHTML = "";
  messageInput.value = "";
});

// Envoyer message avec Entrée
btnEnvoyer.addEventListener("click", envoyerMessage);
messageInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") envoyerMessage();
});

// Envoyer un message dans Supabase
async function envoyerMessage() {
  const texte = messageInput.value.trim();
  if (texte === "") return;

  const { error } = await supabase.from("messages").insert([
    { pseudo: pseudo, phone: phone, texte: texte }
  ]);

  if (error) {
    console.error("Erreur envoi:", error);
    alert("Erreur envoi message");
    return;
  }

  messageInput.value = "";
}

// Charger les 50 derniers messages au démarrage
async function chargerMessages() {
  const { data, error } = await supabase
    .from("messages")
    .select("*")
    .order("created_at", { ascending: true })
    .limit(50);
  
  if (error) {
    console.error("Erreur chargement:", error);
    return;
  }
  
  messagesWrapper.innerHTML = "";
  data.forEach(afficherMessage);
}

// Écouter les nouveaux messages en temps réel
function ecouterMessages() {
  supabase
    .channel("room1")
    .on("postgres_changes", 
      { event: "INSERT", schema: "public", table: "messages" }, 
      (payload) => afficherMessage(payload.new)
    )
    .subscribe();
}

// Afficher un message dans le chat
function afficherMessage(data) {
  const div = document.createElement("div");
  div.className = "message";
  
  // Si c'est mon message, on le met à droite en vert
  if (data.pseudo === pseudo) {
    div.classList.add("moi");
  }
  
  // Formater l'heure HH:MM
  const date = new Date(data.created_at);
  const heure = `${date.getHours().toString().padStart(2,"0")}:${date.getMinutes().toString().padStart(2,"0")}`;
  
  div.innerHTML = `
    <div class="pseudo">${data.pseudo}</div>
    <div class="message-text">${data.texte}</div>
    <span class="message-time">${heure}</span>
  `;
  
  messagesWrapper.appendChild(div);
  messagesWrapper.scrollTop = messagesWrapper.scrollHeight;
}
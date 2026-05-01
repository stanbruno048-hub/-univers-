<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>WhatsApp Style Chat</title>
<style>
    * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  }

  body {
    background: #111b21;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #e9edef;
  }

  ### Conteneur principal style WhatsApp
  .chat-app {
    width: 100%;
    max-width: 450px;
    height: 100vh;
    max-height: 900px;
    background: #0b141a;
    display: flex;
    flex-direction: column;
    box-shadow: 0 6px 18px rgba(0,0,0,0.3);
    position: relative;
    overflow: hidden;
  }

  ### Header
  .chat-header {
    background: #202c33;
    padding: 10px 16px;
    display: flex;
    align-items: center;
    gap: 12px;
    border-bottom: 1px solid #2a3942;
    z-index: 10;
  }

  .avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: linear-gradient(135deg, #25d366, #128c7e);
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    font-size: 16px;
  }

  .contact-info {
    flex: 1;
  }

  .contact-name {
    font-size: 16px;
    font-weight: 500;
  }

  .contact-status {
    font-size: 12px;
    color: #8696a0;
  }

  ### Zone de fond avec motif WhatsApp
  .chat-background {
    flex: 1;
    background-color: #0b141a;
    background-image: url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M50 0 L100 50 L50 100 L0 50 Z' fill='%23182227' fill-opacity='0.4'/%3E%3C/svg%3E");
    background-repeat: repeat;
    background-size: 200px;
    overflow-y: auto;
    padding: 20px 12px 10px;
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  ### Bulles de messages avec animation
  .message {
    max-width: 70%;
    padding: 8px 12px 6px 12px;
    border-radius: 7.5px;
    position: relative;
    word-wrap: break-word;
    animation: messagePop 0.18s ease-out;
    box-shadow: 0 1px 0.5px rgba(0,0,0,0.13);
  }

  @keyframes messagePop {
    0% {
      opacity: 0;
      transform: scale(0.9) translateY(8px);
    }
    100% {
      opacity: 1;
      transform: scale(1) translateY(0);
    }
  }

  .message.sent {
    align-self: flex-end;
    background: #005c4b;
    border-top-right-radius: 2px;
  }

  .message.sent::after {
    content: '';
    position: absolute;
    top: 0;
    right: -8px;
    width: 0;
    height: 0;
    border: 8px solid transparent;
    border-left-color: #005c4b;
    border-top: 0;
    border-bottom: 0;
  }

  .message.received {
    align-self: flex-start;
    background: #202c33;
    border-top-left-radius: 2px;
  }

  .message.received::after {
    content: '';
    position: absolute;
    top: 0;
    left: -8px;
    width: 0;
    height: 0;
    border: 8px solid transparent;
    border-right-color: #202c33;
    border-top: 0;
    border-bottom: 0;
  }

  .message-content {
    font-size: 14.2px;
    line-height: 1.4;
    padding-right: 45px;
  }

  .message-meta {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 4px;
    margin-top: 2px;
    font-size: 11px;
    color: #8696a0;
  }

  .message.sent .message-meta {
    color: #53bdeb;
  }

  ### Check double style WhatsApp
  .ticks::before {
    content: '✓';
    font-size: 12px;
  }

  ### Zone de saisie
  .input-container {
    background: #202c33;
    padding: 8px 12px;
    display: flex;
    align-items: flex-end;
    gap: 8px;
  }

  .input-wrapper {
    flex: 1;
    background: #2a3942;
    border-radius: 20px;
    padding: 8px 14px;
    display: flex;
    align-items: center;
  }

  .input-wrapper input {
    flex: 1;
    background: transparent;
    border: none;
    outline: none;
    color: #e9edef;
    font-size: 15px;
    padding: 4px 0;
  }

  .input-wrapper input::placeholder {
    color: #8696a0;
  }

  .send-btn {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background: #25d366;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: transform 0.1s ease;
  }

  .send-btn:active {
    transform: scale(0.92);
  }

  .send-btn svg {
    width: 24px;
    height: 24px;
    fill: #111b21;
  }

  ### Scrollbar custom
  .chat-background::-webkit-scrollbar {
    width: 6px;
  }
  .chat-background::-webkit-scrollbar-thumb {
    background: #374045;
    border-radius: 3px;
  }
</style>
</head>
<body>

<div class="chat-app">
  <div class="chat-header">
    <div class="avatar">JD</div>
    <div class="contact-info">
      <div class="contact-name">John Doe</div>
      <div class="contact-status">en ligne</div>
    </div>
  </div>

  <div class="chat-background" id="chat">
    <div class="message received">
      <div class="message-content">Salut ! Tu as vu le nouveau design ?</div>
      <div class="message-meta">
        <span>10:30</span>
      </div>
    </div>
    <div class="message sent">
      <div class="message-content">Oui c'est exactement comme WhatsApp 🔥</div>
      <div class="message-meta">
        <span>10:31</span>
        <span class="ticks"></span>
      </div>
    </div>
  </div>

  <div class="input-container">
    <div class="input-wrapper">
      <input type="text" id="messageInput" placeholder="Message" />
    </div>
    <button class="send-btn" onclick="sendMessage()">
      <svg viewBox="0 0 24 24">
        <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"></path>
      </svg>
    </button>
  </div>
</div>

<script>
  const chat = document.getElementById('chat')
  const input = document.getElementById('messageInput')

  function sendMessage() {
    const text = input.value.trim()
    if (!text) return

    const time = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
    
    const messageEl = document.createElement('div')
    messageEl.className = 'message sent'
    messageEl.innerHTML = `
      <div class="message-content">${escapeHtml(text)}</div>
      <div class="message-meta">
        <span>${time}</span>
        <span class="ticks"></span>
      </div>
    `
    
    chat.appendChild(messageEl)
    input.value = ''
    chat.scrollTop = chat.scrollHeight

    // Simulation réponse avec délai et animation
    setTimeout(() => {
      const replyEl = document.createElement('div')
      replyEl.className = 'message received'
      replyEl.innerHTML = `
        <div class="message-content">Reçu : ${escapeHtml(text)}</div>
        <div class="message-meta">
          <span>${time}</span>
        </div>
      `
      chat.appendChild(replyEl)
      chat.scrollTop = chat.scrollHeight
    }, 800)
  }

  // Empêcher les injections HTML
  function escapeHtml(text) {
    const div = document.createElement('div')
    div.textContent = text
    return div.innerHTML
  }

  input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage()
  })

  // Auto scroll au démarrage
  chat.scrollTop = chat.scrollHeight
</script>

</body>
</html>
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
}// db.js - Module de connexion à la base de données
// Installe la lib avec: npm install @supabase/supabase-js
// ou via CDN dans le HTML: <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>

import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm'

// === COLLE ICI TES INFOS SUPABASE ===
const SUPABASE_URL = 'TON_URL_ICI' // ex: https://abcxyz.supabase.co
const SUPABASE_ANON_KEY = 'TA_CLE_ICI' // ex: eyJhbGciOiJ...
// =====================================

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

// ### Envoyer un message
export async function sendMessage(conversationId, senderId, content) {
  const { data, error } = await supabase
   .from('messages')
   .insert([
      {
        conversation_id: conversationId,
        sender_id: senderId,
        content: content,
        sent_at: new Date().toISOString()
      }
    ])
   .select()

  if (error) {
    console.error('Erreur envoi message:', error)
    return null
  }
  return data[0]
}

// ### Charger l'historique des messages
export async function getMessages(conversationId, limit = 50) {
  const { data, error } = await supabase
   .from('messages')
   .select('*')
   .eq('conversation_id', conversationId)
   .order('sent_at', { ascending: true })
   .limit(limit)

  if (error) {
    console.error('Erreur chargement messages:', error)
    return []
  }
  return data
}

// ### Écouter les nouveaux messages en temps réel
export function subscribeToMessages(conversationId, onNewMessage) {
  const channel = supabase
   .channel(`conversation:${conversationId}`)
   .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'messages',
        filter: `conversation_id=eq.${conversationId}`
      },
      (payload) => {
        onNewMessage(payload.new) // payload.new = le nouveau message
      }
    )
   .subscribe()

  return channel // garde ça pour pouvoir te désabonner plus tard avec channel.unsubscribe()
}

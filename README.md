!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>univers</title>
<style>
    * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  }
  
  body {
    background: #0f1115;
    color: #fff;
    height: 100vh;
    display: flex;
    flex-direction: column;
  }

  ### En-tête
  .header {
    padding: 14px 16px;
    background: #1a1d23;
    border-bottom: 1px solid #2a2d33;
    font-weight: 600;
    font-size: 16px;
  }

  ### Zone des messages
  .chat-container {
    flex: 1;
    overflow-y: auto;
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .message {
    max-width: 75%;
    padding: 10px 14px;
    border-radius: 18px;
    line-height: 1.4;
    word-wrap: break-word;
  }

  .message.sent {
    align-self: flex-end;
    background: #2f81f7;
    border-bottom-right-radius: 6px;
  }

  .message.received {
    align-self: flex-start;
    background: #2a2d33;
    border-bottom-left-radius: 6px;
  }

  .message-time {
    font-size: 11px;
    opacity: 0.6;
    margin-top: 4px;
  }

  ### Zone de saisie
  .input-area {
    display: flex;
    padding: 10px 12px;
    background: #1a1d23;
    border-top: 1px solid #2a2d33;
    gap: 8px;
  }

  .input-area input {
    flex: 1;
    padding: 12px 16px;
    border-radius: 20px;
    border: none;
    outline: none;
    background: #2a2d33;
    color: #fff;
    font-size: 15px;
  }

  .input-area button {
    padding: 12px 18px;
    border-radius: 20px;
    border: none;
    background: #2f81f7;
    color: #fff;
    font-weight: 600;
    cursor: pointer;
  }

  .input-area button:active {
    opacity: 0.8;
  }
</style>
</head>
<body>

<div class="chat-container">
  <div class="message-row received">
    <div class="message-bubble received">
      Salut, ça va ?
      <span class="message-meta">10:42</span>
    </div>
  </div>
  
  <div class="message-row sent">
    <div class="message-bubble sent">
      Oui ça va bien et toi ?
      <span class="message-meta read">10:43</span>
    </div>
  </div>
</div>
<div class="input-area">
  <input type="text" id="messageInput" placeholder="Écris un message..." />
  <button onclick="sendMessage()">Envoyer</button>
</div><script type="module">
  import { supabase, sendMessage, getMessages, subscribeToMessages } from './db.js'

  const chat = document.getElementById('chat')
  const input = document.getElementById('messageInput')
  const conversationId = '1' // ID de ta conversation
  const currentUserId = 'user123' // ID de l'utilisateur connecté

  // 1. Charger l'historique au démarrage
  async function loadChat() {
    const messages = await getMessages(conversationId)
    messages.forEach(msg => displayMessage(msg, msg.sender_id === currentUserId))
  }

  // 2. Afficher un message dans le chat
  function displayMessage(msg, isSent) {
    const time = new Date(msg.sent_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
    const messageEl = document.createElement('div')
    messageEl.className = `message ${isSent? 'sent' : 'received'}`
    messageEl.innerHTML = `${msg.content}<div class="message-time">${time}</div>`
    chat.appendChild(messageEl)
    chat.scrollTop = chat.scrollHeight
  }

  // 3. Envoyer un message
  window.sendMessage = async function() {
    const text = input.value.trim()
    if (!text) return

    await sendMessage(conversationId, currentUserId, text)
    input.value = ''
  }

  // 4. Écouter les nouveaux messages en live
  subscribeToMessages(conversationId, (newMsg) => {
    displayMessage(newMsg, newMsg.sender_id === currentUserId)
  })

  loadChat()

  input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') window.sendMessage()
  })
</script>  

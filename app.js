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
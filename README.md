# Mini Chat App

Une application de messagerie en temps réel simple et responsive, construite en HTML/CSS/JS avec Supabase comme backend.

## Fonctionnalités

- **Chat en temps réel** : les messages s'affichent instantanément sans recharger la page
- **Interface responsive** : adaptée mobile et desktop avec design sombre
- **Historique des messages** : chargement des 50 derniers messages à l'ouverture
- **Envoi avec Entrée** : UX fluide pour l'envoi rapide

## Stack technique

- **Frontend** : HTML5, CSS3, JavaScript ES6 Modules
- **Backend / Base de données** : Supabase [PostgreSQL + Realtime]
- **Temps réel** : Supabase Realtime via WebSockets

## Installation

### 1. Cloner le projet
```bash
git clone https://github.com/ton-username/mini-chat-app.git
cd mini-chat-app-- Table des messages
CREATE TABLE messages (
  id BIGSERIAL PRIMARY KEY,
  conversation_id TEXT NOT NULL,
  sender_id TEXT NOT NULL,
  content TEXT NOT NULL,
  sent_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index pour optimiser les requêtes par conversation
CREATE INDEX idx_messages_conversation ON messages(conversation_id, sent_at);const SUPABASE_URL = 'https://xxxxx.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'mini-chat-app/
├── index.html      # Interface du chat
├── db.js           # Connexion et logique Supabase
└── README.md       # DocumentationALTER TABLE messages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view messages" 
ON messages FOR SELECT 
USING (auth.uid()::text = sender_id);
**Conseil** : Ajoute une section "Démo" avec un lien Netlify ou Vercel quand tu déploies. Ça rend le repo bien plus attractif.

Tu veux que j’ajoute aussi une section pour déployer sur Vercel en 1 clic ?

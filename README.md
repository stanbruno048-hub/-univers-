<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Messagerie</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <header>
        <h1>Messagerie</h1>
    </header>
    <main>
        <section class="conversations">
            <h2>Conversations</h2>
            <ul id="liste-conversations">
                <!-- Les conversations seront affichées ici -->
            </ul>
        </section>
        <section class="messages">
            <h2>Messages</h2>
            <div id="messages-container">
                <!-- Les messages seront affichés ici -->
            </div>
            <form id="form-message">
                <input type="text" id="message-input" placeholder="Écrire un message...">
                <button type="submit">Envoyer</button>
            </form>
        </section>
    </main>
    <script src="script.js"></script>
</body>
</html>

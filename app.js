// Configure Firebase
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    databaseURL: "https://YOUR_PROJECT_ID.firebaseio.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

const app = firebase.initializeApp(firebaseConfig);
const database = firebase.database(app);

// Get elements
const messageForm = document.getElementById('messageForm');
const messageInput = document.getElementById('messageInput');
const messagesContainer = document.getElementById('messagesContainer');

// Submit message to Firebase
messageForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const messageText = messageInput.value;
    if (messageText) {
        const newMessageRef = database.ref('messages').push();
        newMessageRef.set({
            message: messageText,
            approved: false
        });
        messageInput.value = ''; // Clear the input field
    }
});

// Listen for new messages
database.ref('messages').on('child_added', (snapshot) => {
    const message = snapshot.val();
    if (message.approved) {
        const messageDiv = document.createElement('div');
        messageDiv.textContent = message.message;
        messagesContainer.appendChild(messageDiv);
    }
});
body {
    font-family: Arial, sans-serif;
    text-align: center;
}

h1 {
    color: #f39c12;
}

textarea {
    width: 300px;
    height: 100px;
}

button {
    padding: 10px 20px;
    background-color: #f39c12;
    border: none;
    color: white;
    cursor: pointer;
}

#messagesContainer {
    margin-top: 20px;
}

#messagesContainer div {
    margin: 10px 0;
    padding: 10px;
    background-color: #f0f0f0;
    border-radius: 5px;
}

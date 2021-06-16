const socket = io('http://localhost:3000');

const form = document.getElementById('form');
const messageContainer = document.getElementById('message-container');
const input = document.getElementById('input');
const button = document.getElementById('button');

let name = prompt('What is your name?');
while(name === '' || name === null) {
    name = prompt('What is your name?');
}
displayMessage('<span>You joined</span>');

socket.emit('new-user', name);

socket.on('user-connected', name => {
    displayMessage(`<span>${name} joined</span>`);
    messageContainer.scrollTop = messageContainer.scrollHeight;
});
socket.on('user-disconnected', name => {
    displayMessage(`<span>${name} disconnected</span>`);
    messageContainer.scrollTop = messageContainer.scrollHeight;
});

socket.on('send-chat-message', data => {
    displayMessage(`<span>${data.name}:</span> <br> ${data.message}`);
    messageContainer.scrollTop = messageContainer.scrollHeight;
});

form.addEventListener('submit', e => {
    e.preventDefault();
    const message = input.value;
    if(message === '') return
    socket.emit('send-message', message);
    displayMessage(`<span>You:</span> <br> ${message}`);
    messageContainer.scrollTop = messageContainer.scrollHeight;
    input.value = '';
});

function displayMessage(message) {
    const div = document.createElement('div');
    div.innerHTML = message;
    messageContainer.appendChild(div);
}
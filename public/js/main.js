const socket = io();
const chat_msg = document.getElementsByClassName("chat-messages")[0];

const { username, state, city } = Qs.parse(location.search, {
  ignoreQueryPrefix: true,
});

document.getElementById("room-name").innerHTML = city;
document.getElementById("users").innerHTML = `<li>${username}</li>`;
console.log(username, state, city);

socket.emit("join-room", { username, state, city });

socket.on("message", ({ msg, username }) => {
  const el = document.createElement("div");
  el.classList.add("message");
  el.innerHTML = `<p class="meta">${username} <span>${new Date().toLocaleTimeString()}</span></p>
            <p class="text">
            ${msg}
            </p>`;
  chat_msg.appendChild(el);
  chat_msg.scrollTop = chat_msg.scrollHeight;
});

const send = document.getElementById("chat-form");
send.addEventListener("submit", (e) => {
  e.preventDefault();
  msg = document.getElementById("msg").value;

  document.getElementById("msg").value = "";
  socket.emit("message", { msg, username, city });
});

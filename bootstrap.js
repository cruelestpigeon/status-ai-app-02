/* -----------------------------------
   STORAGE
----------------------------------- */
function loadData() {
  let d = localStorage.getItem("statusApp");
  if (d) return JSON.parse(d);
  return { posts: [], characters: [], lore: "" };
}

function saveData(d) {
  localStorage.setItem("statusApp", JSON.stringify(d));
}

function escapeHtml(s) {
  return (s || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

/* -----------------------------------
   FEED
----------------------------------- */
function generateCharacterComments(text, data) {
  return (data.characters || []).map((c) => ({
    name: c.displayName || c.username || "Character",
    text: `${c.personality || ""} reacts to: ${text}`
  }));
}

function renderFeed() {
  let data = loadData();
  const page = document.getElementById("page");

  page.innerHTML = `
    <h2>Feed</h2>
    <textarea id="newPost" placeholder="Write a post..." style="width:100%;height:80px"></textarea>
    <button id="postBtn">Post</button>
    <div id="posts"></div>
  `;

  document.getElementById("postBtn").onclick = () => {
    let text = document.getElementById("newPost").value.trim();
    if (!text) return;

    data.posts.unshift({
      text,
      comments: generateCharacterComments(text, data)
    });

    saveData(data);
    renderFeed();
  };

  renderPosts(data);
}

function renderPosts(data) {
  const container = document.getElementById("posts");
  container.innerHTML = "";

  data.posts.forEach((p) => {
    let commentsHTML = (p.comments || [])
      .map(
        (c) =>
          `<div class="comment"><b>${escapeHtml(c.name)}:</b> ${escapeHtml(
            c.text
          )}</div>`
      )
      .join("");

    container.innerHTML += `
      <div class="post">
        <p>${escapeHtml(p.text)}</p>
        ${commentsHTML}
      </div>
    `;
  });
}

/* -----------------------------------
   CHARACTERS
----------------------------------- */
function renderCharacters() {
  let data = loadData();
  const page = document.getElementById("page");

  page.innerHTML = `
    <h2>Characters</h2>
    <button id="addChar">Add Character</button>
    <div id="charList"></div>
  `;

  document.getElementById("addChar").onclick = () => {
    let name = prompt("Character display name:");
    if (!name) return;

    data.characters.push({
      displayName: name,
      username: name.toLowerCase().replace(/\s+/g, "_"),
      personality: "",
      messages: [],
      img: ""
    });

    saveData(data);
    renderCharacters();
  };

  const list = document.getElementById("charList");
  list.innerHTML = "";

  data.characters.forEach((c, i) => {
    list.innerHTML += `
      <div class="charCard">
        <b>${escapeHtml(c.displayName)}</b> (@${escapeHtml(c.username)})<br>
        <button onclick="editCharacter(${i})">Edit</button>
        <button onclick="openChat(${i})">DM</button>
      </div>
    `;
  });
}

function editCharacter(i) {
  let data = loadData();
  let char = data.characters[i];

  let p = prompt("Edit personality / description:", char.personality || "");
  if (p !== null) char.personality = p;

  saveData(data);
  renderCharacters();
}

/* -----------------------------------
   DMs
----------------------------------- */
function renderDM() {
  let data = loadData();
  const page = document.getElementById("page");

  page.innerHTML = `
    <h2>Direct Messages</h2>
    <div id="charList"></div>
    <div id="chatBox"></div>
  `;

  const list = document.getElementById("charList");
  data.characters.forEach((c, i) => {
    list.innerHTML += `
      <button onclick="openChat(${i})">${escapeHtml(c.displayName)}</button>
    `;
  });
}

function openChat(i) {
  let data = loadData();
  let char = data.characters[i];

  const chat = document.getElementById("chatBox");

  chat.innerHTML = `
    <h3>${escapeHtml(char.displayName)}</h3>
    <div id="msgs"></div>
    <input id="msgInput" placeholder="Type a message...">
    <button id="sendMsg">Send</button>
  `;

  char.messages = char.messages || [];

  const msgsDiv = document.getElementById("msgs");
  msgsDiv.innerHTML = char.messages
    .map((m) => `<div>${escapeHtml(m)}</div>`)
    .join("");

  document.getElementById("sendMsg").onclick = () => {
    let t = document.getElementById("msgInput").value.trim();
    if (!t) return;

    char.messages.push("You: " + t);
    char.messages.push(char.displayName + ": " + autoReply(t));

    saveData(data);
    openChat(i);
  };
}

function autoReply(input) {
  return "I see you said: " + input;
}

/* -----------------------------------
   UNIVERSE LORE
----------------------------------- */
function renderLore() {
  let data = loadData();
  const page = document.getElementById("page");

  page.innerHTML = `
    <h2>Universe Lore</h2>
    <textarea id="loreText" style="width:100%;height:200px">${escapeHtml(
      data.lore || ""
    )}</textarea>
    <button id="saveLore">Save</button>
  `;

  document.getElementById("saveLore").onclick = () => {
    data.lore = document.getElementById("loreText").value;
    saveData(data);
    alert("Lore saved!");
  };
}

/* -----------------------------------
   MAIN APP UI
----------------------------------- */
(function init() {
  const app = document.getElementById("app");

  app.innerHTML = `
    <div class="nav">
      <button id="navFeed">Feed</button>
      <button id="navDM">DMs</button>
      <button id="navChar">Characters</button>
      <button id="navLore">Lore</button>
    </div>
    <div id="page" style="padding:20px;"></div>
  `;

  document.getElementById("navFeed").onclick = renderFeed;
  document.getElementById("navDM").onclick = renderDM;
  document.getElementById("navChar").onclick = renderCharacters;
  document.getElementById("navLore").onclick = renderLore;

  // Default page
  renderFeed();
})();

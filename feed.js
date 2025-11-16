
function showFeed(){
  const posts = load("posts", []);
  const screen = document.getElementById("screen");
  let html = `
    <h2>Feed</h2>
    <textarea id="newPost" placeholder="What's happening?" style="width:100%;height:60px;"></textarea>
    <button onclick="addPost()">Post</button>
    <hr>
  `;
  posts.slice().reverse().forEach((p)=>{
    html += `<div class="tweet">${p.text}</div>`;
  });
  screen.innerHTML = html;
}

function addPost(){
  const text=document.getElementById("newPost").value.trim();
  if(!text)return;
  const posts=load("posts",[]);
  posts.push({text});
  save("posts",posts);
  showFeed();
}

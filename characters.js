
function showCharacters(){
  const chars = load("characters", []);
  const screen = document.getElementById("screen");
  let html = `<h2>Characters</h2><button onclick="editCharacter(-1)">+ New Character</button><hr>`;
  chars.forEach((c,i)=>{
    html += `
      <div class="charCard" onclick="editCharacter(${i})">
        <img src="${c.img || ''}">
        <div>
          <b>${c.displayName}</b><br>@${c.username}
        </div>
      </div>
    `;
  });
  screen.innerHTML = html;
}

function editCharacter(i){
  const chars = load("characters", []);
  const c = i>=0 ? chars[i] : {displayName:"",username:"",bio:"",desc:"",rel:"",img:""};
  const screen=document.getElementById("screen");
  screen.innerHTML = `
    <h2>${i>=0?"Edit":"New"} Character</h2>
    <div class="editor">
      <label>Profile Image: <input type="file" id="imgFile" accept="image/*"></label><br>
      <img id="preview" src="${c.img||""}" style="width:100px;height:100px;border-radius:50%;object-fit:cover;"><br><br>
      <input id="displayName" placeholder="Display Name" value="${c.displayName}">
      <input id="username" placeholder="Username" value="${c.username}">
      <textarea id="bio" placeholder="Bio">${c.bio}</textarea>
      <textarea id="desc" placeholder="Personality / Description">${c.desc}</textarea>
      <textarea id="rel" placeholder="Relationships">${c.rel}</textarea>
      <button onclick="saveCharacter(${i})">Save</button>
    </div>
  `;

  document.getElementById("imgFile").onchange = function(e){
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = function(){
      document.getElementById("preview").src = reader.result;
    }
    reader.readAsDataURL(file);
  }
}

function saveCharacter(i){
  const chars = load("characters", []);
  const data={
    displayName:document.getElementById("displayName").value,
    username:document.getElementById("username").value,
    bio:document.getElementById("bio").value,
    desc:document.getElementById("desc").value,
    rel:document.getElementById("rel").value,
    img:document.getElementById("preview").src
  };
  if(i>=0) chars[i]=data;
  else chars.push(data);
  save("characters", chars);
  showCharacters();
}

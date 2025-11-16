
function showSettings(){
  const screen=document.getElementById("screen");
  const s=load("settings", {bg:"#ffffff", text:"#000000", accent:"#1d9bf0", font:"Arial"});
  screen.innerHTML = `
    <h2>Settings</h2>
    <label>Background color: <input id="bg" type="color" value="${s.bg}"></label><br><br>
    <label>Text color: <input id="text" type="color" value="${s.text}"></label><br><br>
    <label>Accent color: <input id="accent" type="color" value="${s.accent}"></label><br><br>
    <label>Font:
      <select id="font">
        <option ${s.font==="Arial"?"selected":""}>Arial</option>
        <option ${s.font==="Georgia"?"selected":""}>Georgia</option>
        <option ${s.font==="Courier New"?"selected":""}>Courier New</option>
      </select>
    </label><br><br>
    <button onclick="saveSettings()">Save</button>
  `;
}

function saveSettings(){
  const newSet={
    bg:document.getElementById("bg").value,
    text:document.getElementById("text").value,
    accent:document.getElementById("accent").value,
    font:document.getElementById("font").value
  };
  save("settings", newSet);
  applySettings();
  alert("Saved!");
}

function applySettings(){
  const s=load("settings",{bg:"#ffffff",text:"#000000",accent:"#1d9bf0",font:"Arial"});
  document.documentElement.style.setProperty("--bg", s.bg);
  document.documentElement.style.setProperty("--text", s.text);
  document.documentElement.style.setProperty("--accent", s.accent);
  document.documentElement.style.setProperty("--font", s.font);
}

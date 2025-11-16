
function save(key, value){
  localStorage.setItem(key, JSON.stringify(value));
}
function load(key, fallback){
  const v = localStorage.getItem(key);
  return v ? JSON.parse(v) : fallback;
}

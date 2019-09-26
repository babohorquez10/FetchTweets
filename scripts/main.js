
const url = "https://gist.githubusercontent.com/john-guerra/5a1452f7b833b350ff156ecab4bfcec0/raw/905577da56e6fc7355e5fa6d9d3b6629880a1992/gananLosCorruptos.json";
let i = 0;
let pag = 0;
let data;
let numTweets = 5;

function agregarTweet(tweet) {
  let nuevo = document.createElement("li");

  nuevo.textContent = tweet.text;
  nuevo.addEventListener("mouseover", () => {
    let divNombre = document.getElementById("valNombre");
    let divLugar = document.getElementById("valLugar");
    let divHora = document.getElementById("valHora");

    divNombre.textContent = tweet.user.name;
    divLugar.textContent = tweet.user.location;
    divHora.textContent = tweet.created_at;
  });

  document.getElementById("listTweets").append(nuevo);
}

function renderData() {

  document.getElementById("listTweets").textContent = "";

  data.slice(i, i + numTweets).forEach(item => {
    agregarTweet(item);
  });

  i += numTweets;
  pag++;
  document.getElementById("numPag").textContent = "Página: " + pag;

  let divNombre = document.getElementById("valNombre");
  let divLugar = document.getElementById("valLugar");
  let divHora = document.getElementById("valHora");

  divNombre.textContent = "";
  divLugar.textContent = "";
  divHora.textContent = "";
}

function clearData() {
  i = 0;
  pag = 0;
  renderData();
}

function cambiarNumTweets() {
  i -= numTweets;
  pag--;
  let dropDown = document.getElementById("dropNumTweets");
  numTweets = Number(dropDown.value);

  renderData();
}

async function loadData(url) {

  try {
    const response = await fetch(url);
    data = await response.json();

    document.getElementById("loading").textContent = "";
    
    renderData();

  } catch(err) {
    console.log("Error;" + err);
  }
  
}

function agregarEventos( ) {
  let btnAdd = document.getElementById("btnAdd");
  let btnClear = document.getElementById("btnClear");
  let dropDown = document.getElementById("dropNumTweets");

  btnAdd.addEventListener("click", renderData);
  btnClear.addEventListener("click", clearData);
  dropDown.addEventListener("change", cambiarNumTweets);
}

agregarEventos();
loadData(url);
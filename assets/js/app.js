const procesarFetch = async (link) => {
    try {
        const respuesta = await fetch(link);
        const info = await respuesta.json();
        return info;
    } catch (error) {
        console.log("Hubo un error");
    }
};

let currentPage = 1;
let memeCount = 0; // Contador de memes mostrados
const memesPerPage = 10; // Número de memes a mostrar por carga

async function fetchCharacters() {
  const url = `https://api.imgflip.com/get_memes`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    const memesToDisplay = data.data.memes.slice(memeCount, memeCount + memesPerPage); // Obtener solo los memes necesarios
    displayCharacters(memesToDisplay);
    memeCount += memesPerPage; // Actualizar el contador
    currentPage++;
    adjustCardEffects(); 
    return data.data.memes;
  } catch (error) {
    console.error("Error fetching characters:", error);
  }
}

function displayCharacters(data) {
  const container = document.getElementById("characters");
  data.forEach((meme) => {
    const characterElement = document.createElement("div");
    characterElement.classList.add("character"); // Agregar clase para efectos
    characterElement.innerHTML = `
            <img src="${meme.url}" alt="${meme.name}">
            <h3>${meme.name}</h3>
            <p>ID: ${meme.id}</p>
        `;
    container.appendChild(characterElement);
  });
}

function adjustCardEffects() {
  document.querySelectorAll(".character").forEach((item) => {
    item.addEventListener("mousemove", function (e) {
      let rect = e.target.getBoundingClientRect();
      let x = e.clientX - rect.left;
      let y = e.clientY - rect.top;
      let dx = (x / rect.width - 0.5) * 10; // Ángulo reducido para movimiento sutil
      let dy = (y / rect.height - 0.5) * 10; // Ángulo reducido para movimiento sutil
      item.style.transform = `rotateY(${dx}deg) rotateX(${-dy}deg)`;
    });
    item.addEventListener("mouseout", function () {
      item.style.transform = "rotateY(0deg) rotateX(0deg)"; // Resetear la rotación
    });
  });
}

document.getElementById("loadMore").addEventListener("click", fetchCharacters);

fetchCharacters(); // Carga inicial de personajes

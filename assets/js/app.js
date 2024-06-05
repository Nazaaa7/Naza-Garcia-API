

let currentPage = 1;
let memeCount = 0; // Contador de memes mostrados
const memesPerPage = 10; // Número de memes a mostrar por carga

async function fetchMemes() {
  const url = `https://api.imgflip.com/get_memes`; //link de la API
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    const memesToDisplay = data.data.memes.slice(memeCount, memeCount + memesPerPage); // Obtener solo los memes necesarios
    displayMemes(memesToDisplay);
    memeCount += memesPerPage; // Actualizar el contador
    currentPage++;
    adjustCardEffects(); 
    return data.data.memes;
  } catch (error) {
    console.error("Error fetching memes:", error);
  }
}

function displayMemes(data) {
  const container = document.getElementById("memes");
  data.forEach((meme) => {
    const memesElement = document.createElement("div");
    memesElement.classList.add("meme"); // Agregar clase para agregarle styles
   
    memesElement.innerHTML = `
            <img src="${meme.url}" alt="${meme.name}"> 
            <h3>${meme.name}</h3>
           
        `;//mostrar las imagenes y el nombre dl meme
    container.appendChild(memesElement);
  });
}


document.getElementById("cargar").addEventListener("click", fetchMemes); //boton para vargar más memes

fetchMemes(); // Carga inicial de personajes


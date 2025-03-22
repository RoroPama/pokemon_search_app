const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
const pokemonName = document.getElementById("pokemon-name");
const pokemonId = document.getElementById("pokemon-id");
const weight = document.getElementById("weight");
const height = document.getElementById("height");
const types = document.getElementById("types");
const hp = document.getElementById("hp");
const attack = document.getElementById("attack");
const defense = document.getElementById("defense");
const specialAttack = document.getElementById("special-attack");
const specialDefense = document.getElementById("special-defense");
const speed = document.getElementById("speed");
const pokemonImage = document.querySelector(".pokemon-image");

const API_URL = "https://pokeapi.co/api/v2/pokemon/";

async function fetchPokemonData(pokemonNameOrId) {
  try {
    if (pokemonNameOrId.toString().toLowerCase() === "red") {
      alert("Pokémon not found");
      return null;
    }
    const query = pokemonNameOrId.toString().toLowerCase();
    const response = await fetch(`${API_URL}${query}`);

    if (!response.ok) {
      throw new Error("Pokémon not found");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    alert("Pokémon not found");
    return null;
  }
}

function updateStatBars(statsData) {
  const maxStat = 255;

  const hpFill = document.querySelector(".stat-fill.hp");
  hpFill.style.width = `${(statsData.hp / maxStat) * 100}%`;

  const attackFill = document.querySelector(".stat-fill.attack");
  attackFill.style.width = `${(statsData.attack / maxStat) * 100}%`;

  const defenseFill = document.querySelector(".stat-fill.defense");
  defenseFill.style.width = `${(statsData.defense / maxStat) * 100}%`;

  const specialAttackFill = document.querySelector(".stat-fill.special-attack");
  specialAttackFill.style.width = `${
    (statsData.specialAttack / maxStat) * 100
  }%`;

  const specialDefenseFill = document.querySelector(
    ".stat-fill.special-defense"
  );
  specialDefenseFill.style.width = `${
    (statsData.specialDefense / maxStat) * 100
  }%`;

  const speedFill = document.querySelector(".stat-fill.speed");
  speedFill.style.width = `${(statsData.speed / maxStat) * 100}%`;
}

function displayPokemonData(data) {
  if (!data) return;

  pokemonName.textContent = data.name.toUpperCase();

  pokemonId.textContent = `#${data.id}`;

  weight.textContent = `Weight: ${data.weight}`;
  height.textContent = `Height: ${data.height}`;

  types.innerHTML = "";
  data.types.forEach((typeInfo) => {
    const typeElement = document.createElement("span");
    typeElement.textContent = typeInfo.type.name.toUpperCase();
    typeElement.classList.add(typeInfo.type.name.toUpperCase());
    types.appendChild(typeElement);
  });

  const statsData = {
    hp: 0,
    attack: 0,
    defense: 0,
    specialAttack: 0,
    specialDefense: 0,
    speed: 0,
  };

  data.stats.forEach((stat) => {
    const statValue = stat.base_stat;
    switch (stat.stat.name) {
      case "hp":
        hp.textContent = statValue;
        statsData.hp = statValue;
        break;
      case "attack":
        attack.textContent = statValue;
        statsData.attack = statValue;
        break;
      case "defense":
        defense.textContent = statValue;
        statsData.defense = statValue;
        break;
      case "special-attack":
        specialAttack.textContent = statValue;
        statsData.specialAttack = statValue;
        break;
      case "special-defense":
        specialDefense.textContent = statValue;
        statsData.specialDefense = statValue;
        break;
      case "speed":
        speed.textContent = statValue;
        statsData.speed = statValue;
        break;
    }
  });

  updateStatBars(statsData);

  pokemonImage.innerHTML = "";
  if (data.sprites && data.sprites.front_default) {
    const spriteImg = document.createElement("img");
    spriteImg.id = "sprite";
    spriteImg.src = data.sprites.front_default;
    spriteImg.alt = data.name;
    pokemonImage.appendChild(spriteImg);
  }
}

async function searchPokemon() {
  const searchTerm = searchInput.value.trim();

  if (!searchTerm) return;

  const pokemonData = await fetchPokemonData(searchTerm);
  displayPokemonData(pokemonData);
}

searchButton.addEventListener("click", searchPokemon);

searchInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    searchPokemon();
  }
});

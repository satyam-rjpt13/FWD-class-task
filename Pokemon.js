let api = "https://pokeapi.co/api/v2/pokemon";
let container = document.querySelector(".container");

// const getPokemonData = () => {
//     fetch(api)
//     .then((res) => res.json())
//     .then((data) => {
//         console.log(data);

//     }).catch((error) => {
//         // console.log(error);
//         // console.log("Bhai kuchh gadbad hai");
//         container.textContent="Kuchh problem aa gya";

//     });
// };

const renderPokemonData = (allPokemons) => {
  allPokemons.forEach((pokemon) => {
    let card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
      <img src="${pokemon.image}" alt="${pokemon.name}" width="100" />
      <p><strong>${pokemon.name}</strong></p>
      <i>Height: ${pokemon.height}</i><br>
      <i>Weight: ${pokemon.weight}</i><br>
      <p>Type: ${pokemon.types.join(", ")}</p>
      <p>
        ${pokemon.stats.map((stat) => `${stat.stat} :- ${stat.base_stat}`).join("<br>")}
      </p>
    `;
    container.appendChild(card);
  });
};

const getPokemonData = async () => {
  const response = await fetch(api);
  // console.log(response);             //1]
  const data = await response.json();
  // console.log(data);                 //2]

  const promises = data?.results?.map((ele) => {
    return fetch(ele.url)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        return {
          name: data?.name,
          height: data?.height,
          weight: data?.weight,
          base_experience: data?.base_experience,
          types: data?.types?.map((el) => {
            return el?.type.name;
            // if(!types.includes(el?.type.name))
          }),
          stats: data?.stats.map((el) => {
            return { ...el, ["stat"]: el?.stat.name };
          }),
          image: data?.sprites?.other?.dream_world?.front_default,
        };
      });
  });
  const pokemonData = await Promise.all(promises);
  // console.log(pokemonData);

  renderPokemonData(pokemonData);
};

getPokemonData();
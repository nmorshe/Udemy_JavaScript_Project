

const poke = {
    method: "GET",
    headers: {
        'Accept': "applications/json"
    }
}

let pokemonName = '';
const pokeToken = `https://pokeapi.co/api/v2/pokemon/`;
let pokeUrl = pokeToken + `${pokemonName}`

const getPokemonInfo = () => {
    pokemonName = (getByID("pokemonSearch").value.toLowerCase());
    pokeUrl = pokeToken + `${pokemonName}`;
    searchPokemon(pokeUrl, poke);
}

const setPokemonElements = (data) => {

    const imgUrl = JSON.stringify(data.sprites.other.dream_world.front_default);

    const pokeImage = `url(${imgUrl})`;

    //Background Image
    getByID("pokemon").style.backgroundImage = pokeImage;

    //ID and name
    getByID("pokemonId").innerText = data.id;
    getByID("pokemonName").innerText = data.name;

    //Physical Attributes
    getByID("pokemonHeight").innerText = data.height;
    getByID("pokemonWeight").innerText = data.weight;

    //Stats
    getByID("pokemonHp").innerText = data.stats[0].base_stat;
    getByID("pokemonType").innerText = data.types[0].type.name;
    getByID("pokemonAtk").innerText = data.stats[1].base_stat;
    getByID("pokemonDef").innerText = data.stats[2].base_stat;
}

const searchPokemon = (url, data) => {

    fetch(url, data).then(d => {

        d.json().then(res =>

            setPokemonElements(res)

        ).catch(err => console.log(err));

    }).catch(err => console.log(err));
}


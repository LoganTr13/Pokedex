const pokeApi = {};

function ModelTransform(Poke){
    const pokemon = new Pokemon()
    pokemon.name = Poke.name;
    pokemon.id = Poke.id;
    const types = Poke.types.map((typeSlots) => typeSlots.type.name);
    const [ type ] = types;
    pokemon.types = types;
    pokemon.type = type;
    pokemon.img = Poke.sprites.front_default;
    const baseStat = Poke.stats.map((statsSlot) => statsSlot.base_stat)

    pokemon.hp = baseStat[0]
    pokemon.atk = baseStat[1]
    pokemon.def = baseStat[2]
    pokemon.spAtk = baseStat[3]
    pokemon.spDef = baseStat[4]
    pokemon.spd = baseStat[5]

    return pokemon
}

pokeApi.getDetails = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(ModelTransform)

}

pokeApi.getPokemons = (offset = 0, limit = 5) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemonsInfo) => pokemonsInfo.map(pokeApi.getDetails))
        .then((dataRequests) => Promise.all(dataRequests))
        .then((dataConclusion) => dataConclusion)
}
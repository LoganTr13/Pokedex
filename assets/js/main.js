const pokedexTable = document.getElementById('pokedexList')
const morePoke = document.getElementById('MPokemon')
const maxRecords = 151;

const limit = 15;
let offset = 0;

function renderPokemon(pokemon)
{
    return `
    <li class="pokemon ${pokemon.type}">
        <span class="number">#${pokemon.id}</span>
        <span class="name">${pokemon.name}</span>
        
        <div class="detail">
            <ol class="types">
                ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
            </ol>
        
            <img src="${pokemon.img}"
                    alt="${pokemon.name}">
        </div>
        <div class="baseStat">
            <ul>
                <li>HP: ${pokemon.hp}</li>
                <li>Atk: ${pokemon.atk}</li>
                <li>Def: ${pokemon.def}</li>
                <li>Sp.Atk: ${pokemon.spAtk}</li>
                <li>Sp.Def: ${pokemon.spDef}</li>
                <li>Speed: ${pokemon.spd}</li>
            </ul>
        <div>
    </li>
`
}
console.log(pokeApi.getPokemons(0,5))
function loadPokedex(offset,limit)
{
    pokeApi.getPokemons(offset,limit).then((pokemons = []) => {
        pokedexTable.innerHTML += pokemons.map(renderPokemon).join('');
    })

}

loadPokedex(offset,limit)

morePoke.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokedex(offset,limit)

        morePoke.parentElement.removeChild(morePoke)
    } else {
        loadPokedex(offset,limit)
    }
    
})

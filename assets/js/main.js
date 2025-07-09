const pokedexTable = document.getElementById('pokedexList')
const morePoke = document.getElementById('MPokemon')
const maxRecords = 151;

const limit = 15;
let offset = 0;

function renderPokemon(pokemon)
{
    return `
    <li class="pokemon">
          <header class="headerPokemon">
            <span class="name">${pokemon.name}</span>
            <span class="number">#${pokemon.id}</span>
          </header>

          <div class="detail">
            <img src="${pokemon.img}" alt="${pokemon.name}" />
            <ol class="types">
                ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
            </ol>
          </div>
          <div class="baseStat">
            <ul>
              <li>HP: <i>${pokemon.hp}</i></li>
                <li>Atk: <i>${pokemon.atk}</i></li>
                <li>Def: <i>${pokemon.def}</i></li>
                <li>Sp.Atk: <i>${pokemon.spAtk}</i></li>
                <li>Sp.Def: <i>${pokemon.spDef}</i></li>
                <li>Speed: <i>${pokemon.spd}</i></li>
            </ul>
          </div>
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

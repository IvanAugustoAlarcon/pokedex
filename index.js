const pokeName = document.querySelector('[data-poke-name]')
const pokeId = document.querySelector('[data-poke-id]')
const pokeImg = document.querySelector('[data-poke-img]')
const pokeTypes = document.querySelector('[data-poke-types]')
const pokeStats = document.querySelector('[data-poke-stats]')

const typeColors = {
    electric: '#FFEA70',
    normal: '#B09398',
    fire: '#FF675C',
    water: '#0596C7',
    ice: '#AFEAFD',
    rock: '#999799',
    flying: '#7AE7C7',
    grass: '#4A9681',
    psychic: '#FFC6D9',
    ghost: '#561D25',
    bug: '#A2FAA3',
    poison: '#795663',
    ground: '#D2B074',
    dragon: '#DA627D',
    steel: '#1D8A99',
    fighting: '#2F2F2F',
    default: '#2A1A1F',
};

const searchPokemon = event => {
    event.preventDefault();
    const {value} = event.target.pokemon 
    fetch(`https://pokeapi.co/api/v2/pokemon/${value.toLowerCase()}`)
        .then(data => data.json())
        .then(response => renderPokemonData(response))
        .catch(error => renderNotFound())
    document.getElementById('poke-input').value = ''
        
}

const firsLeterUpper = (PokeName) => {
    const firstCharacter = PokeName[0].toUpperCase();
    const secondCharacter = PokeName.substring(1, PokeName.length)
    return firstCharacter.concat(secondCharacter)
}

const renderPokemonData = data => {
    const sprite = data.sprites.front_default
    const {stats, types}= data

    pokeName.textContent = firsLeterUpper(data.name)
    pokeImg.setAttribute('src', sprite)
    pokeImg.style.width = '15rem'
    pokeImg.style.height = '15rem'
    pokeId.textContent = `Nº ${data.id}`
    setCardColor(types)
    renderPokemonTypes(types)
    renderPokemonStats(stats)
}

const setCardColor = types => {
    const colorOne = typeColors[types[0].type.name]
    const colorTwo = types[1] ? typeColors[types[1].type.name] : typeColors.default
    pokeImg.style.background = `radial-gradient(${colorTwo} 33%, ${colorOne} 33%`
    pokeImg.style.backgroundSize = '0.5rem 0.5rem'
}

const renderPokemonTypes = types => {
    pokeTypes.innerHTML = ''
    types.forEach(type => {
        const typeTextElement = document.createElement('div')
        typeTextElement.style.color = typeColors[type.type.name]
        typeTextElement.textContent = type.type.name
        pokeTypes.appendChild(typeTextElement)
    })
}

const renderPokemonStats = stats => {
    pokeStats.innerHTML = ''
    stats.forEach(stat => {
        const statElement = document.createElement('div')
        const statElementName = document.createElement('div')
        const statElementAmount = document.createElement('div')
        statElementName.textContent = stat.stat.name
        statElementAmount.textContent = stat.base_stat
        statElement.appendChild(statElementName)
        statElement.appendChild(statElementAmount)
        pokeStats.appendChild(statElement)
    })
}

const renderNotFound = () => {
    pokeName.textContent = "Not Found"
    pokeImg.setAttribute("src",'notFound.jpg')
    pokeImg.style.width = '15rem'
    pokeImg.style.height = '15rem'
    pokeId.textContent = ''
    pokeTypes.innerHTML = ''
    pokeStats.innerHTML = ''
    

}
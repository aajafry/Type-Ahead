const searchInput = document.querySelector('.search');
const suggestions = document.querySelector('.suggestions');

const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

let cities = [];

(async function pushToCities () {
    let data = (await (await fetch(endpoint)).json())
    cities.push(...data);
})();

function findMatches(wordToMatch, cities) {
    return cities.filter ( place => {
        const regx = new RegExp(wordToMatch,'gi');
        return place.city.match(regx) || place.state.match(regx);
    })
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function displayMatches() {
    matchArray = findMatches(this.value, cities);
    const htmlTemp =  matchArray.map(place => {   
        const regx = new RegExp(this.value, 'gi');
        const cityName = place.city.replace(regx,  `<span class="hl">${this.value}</span>`);
        const stateName = place.state.replace(regx, `<span class="hl">${this.value}</span>`);

        return `
        <li>
            <span class="name">${cityName}, ${stateName}</span>
            <span class="population">${numberWithCommas(place.population)}</span>
        </li>
        `
    }).join('');
    
    suggestions.innerHTML = htmlTemp;
}


searchInput.addEventListener('change', displayMatches);
searchInput.addEventListener('keyup', displayMatches);
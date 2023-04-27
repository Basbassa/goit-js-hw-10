import { fetchCountries } from './fetchCountries.js';

const searchBox = document.querySelector('#search-box');
const regionSelect = document.querySelector('#region-select');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

function displayCountryList(countries) {
  countryList.innerHTML = '';
  countries.forEach(country => {
    const li = document.createElement('li');
    li.classList.add('country');
    li.innerHTML = `
      <div class="flag">
        <img src="${country.flags.svg}" alt="${country.name.official} Flag" />
      </div>
      <div class="details">
        <h2 class="country-name">${country.name.official}</h2>
        <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
        <p><strong>Region:</strong> ${country.region}</p>
        <p><strong>Capital:</strong> ${country.capital[0]}</p>
      </div>
    `;
    li.addEventListener('click', () => displayCountryInfo(country));
    countryList.appendChild(li);
  });
}

function displayCountryInfo(country) {
  countryInfo.innerHTML = '';
  const div = document.createElement('div');
  div.classList.add('details');
  div.innerHTML = `
    <button class="back-btn">Back</button>
    <div class="flag">
      <img src="${country.flags.svg}" alt="${country.name.official} Flag" />
    </div>
    <div class="info">
      <h2 class="country-name">${country.name.official}</h2>
      <p><strong>Native Name:</strong> ${country.name.nativeName}</p>
      <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
      <p><strong>Region:</strong> ${country.region}</p>
      <p><strong>Subregion:</strong> ${country.subregion}</p>
      <p><strong>Capital:</strong> ${country.capital[0]}</p>
      <p><strong>Top Level Domain:</strong> ${country.topLevelDomain}</p>
      <p><strong>Currencies:</strong> ${country.currencies.map(currency => currency.name).join(', ')}</p>
      <p><strong>Languages:</strong> ${country.languages.map(language => language.name).join(', ')}</p>
    </div>
  `;
  const backBtn = div.querySelector('.back-btn');
  backBtn.addEventListener('click', () => countryInfo.innerHTML = '');
  countryInfo.appendChild(div);
}

searchBox.addEventListener('input', () => {
  const name = searchBox.value.trim();
  if (name !== '') {
    fetchCountries(name)
      .then(data => displayCountryList(data))
      .catch(error => console.log(error));
  }
});

regionSelect.addEventListener('change', () => {
  const region = regionSelect.value;
  if (region !== '') {
    const url = `https://restcountries.com/v3.1/region/${region}?fields=name.official,capital,population,flags.svg,languages`;
    fetch(url)
      .then(response => response.json())
      .then(data => displayCountryList(data))

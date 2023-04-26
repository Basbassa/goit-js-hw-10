export { fetchCountries } from './fetchCountries.js';

const searchBox = document.getElementById('search-box');
const regionSelect = document.getElementById('region-select');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

searchBox.addEventListener('input', () => {
  const name = searchBox.value.trim();
  const region = regionSelect.value;

  if (name.length > 0) {
    fetchCountries(name, region)
      .then(countries => {
        renderCountryList(countries);
      })
      .catch(error => {
        console.error(error);
      });
  } else {
    countryList.innerHTML = '';
    countryInfo.innerHTML = '';
  }
});

regionSelect.addEventListener('change', () => {
  const name = searchBox.value.trim();
  const region = regionSelect.value;

  if (name.length > 0) {
    fetchCountries(name, region)
      .then(countries => {
        renderCountryList(countries);
      })
      .catch(error => {
        console.error(error);
      });
  } else {
    countryList.innerHTML = '';
    countryInfo.innerHTML = '';
  }
});

function renderCountryList(countries) {
  const html = countries
    .map(
      country => `
        <li class="country-list__item" data-name="${country.name}">
          <img src="${country.flag}" alt="${country.name} flag" />
          <div>
            <h2>${country.name}</h2>
            <p>
              <strong>Population:</strong> ${country.population.toLocaleString()}
            </p>
            <p>
              <strong>Region:</strong> ${country.region}
            </p>
            <p>
              <strong>Capital:</strong> ${country.capital}
            </p>
          </div>
        </li>
      `
    )
    .join('');

  countryList.innerHTML = html;
  countryInfo.innerHTML = '';
}

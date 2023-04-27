import { fetchCountries } from './fetchCountries.js';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const searchBox = document.getElementById('search-box');
const regionSelect = document.getElementById('region-select');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

// Funkcja wyświetlająca listę krajów
function displayCountries(countries) {
  countryList.innerHTML = '';
  if (countries.length > 10) {
    Notiflix.Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
  } else if (countries.length >= 2 && countries.length <= 10) {
    const ul = document.createElement('ul');
    ul.classList.add('countries');
    countries.forEach(country => {
      const li = document.createElement('li');
      li.innerHTML = `
        <div class="country">
          <img src="${country.flags.svg}" alt="${country.name.official}" />
          <h3>${country.name.official}</h3>
        </div>
      `;
      li.addEventListener('click', () => {
        displayCountryInfo(country);
      });
      ul.appendChild(li);
    });
    countryList.appendChild(ul);
  } else if (countries.length === 1) {
    displayCountryInfo(countries[0]);
  } else {
    Notiflix.Notify.failure('No matches found.');
  }
}

// Funkcja wyświetlająca szczegóły kraju
function displayCountryInfo(country) {
  countryInfo.innerHTML = `
    <h2>${country.name.official}</h2>
    <img src="${country.flags.svg}" alt="${country.name.official}" />
    <p><strong>Population:</strong> ${country.population}</p>
    <p><strong>Capital:</strong> ${country.capital.join(', ')}</p>
    <p><strong>Languages:</strong> ${country.languages
      .map(language => language.name)
      .join(', ')}</p>
  `;
}

// Obsługa zdarzeń wyszukiwania kraju i filtru regionu
const handleSearch = debounce(() => {
  const searchTerm = searchBox.value.trim();
  if (searchTerm !== '') {
    fetchCountries(searchTerm)
      .then(countries => {
        displayCountries(countries);
        countryInfo.innerHTML = '';
      })
      .catch(error => {
        if (error.response && error.response.status === 404) {
          Notiflix.Notify.failure('Oops, there is no country with that name.');
        } else {
          Notiflix.Notify.failure('Oops, there is no country with that name.');
          console.log('Error:', error);
        }
      });
  } else {
    countryList.innerHTML = '';
    countryInfo.innerHTML = '';
  }
}, 300);

searchBox.addEventListener('input', handleSearch);

regionSelect.addEventListener('change', () => {
  const selectedRegion = regionSelect.value.trim();
  if (selectedRegion !== '') {
    fetchCountries(`region/${selectedRegion}`)
      .then(countries => {
        displayCountries(countries);
        countryInfo.innerHTML = '';
      })
      .catch(error => console.log('Error:', error));
  } else {
    countryList.innerHTML = '';
    countryInfo.innerHTML = '';
  }
});

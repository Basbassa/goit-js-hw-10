import { fetchCountries } from './fetchCountries.js';

const searchBox = document.getElementById('search-box');
const regionSelect = document.getElementById('region-select');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

// Funkcja wyświetlająca listę krajów
function displayCountries(countries) {
  countryList.innerHTML = '';
  countries.forEach(country => {
    const li = document.createElement('li');
    li.innerHTML = `
      <div class="country">
        <img src="${country.flags.svg}" alt="${country.name.official}" />
        <div class="country-details">
          <h3>${country.name.official}</h3>
          <p><strong>Population:</strong> ${country.population}</p>
          <p><strong>Capital:</strong> ${country.capital.join(', ')}</p>
          <p><strong>Languages:</strong> ${country.languages
            .map(language => language.name)
            .join(', ')}</p>
        </div>
      </div>
    `;
    li.addEventListener('click', () => {
      displayCountryInfo(country);
    });
    countryList.appendChild(li);
  });
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
searchBox.addEventListener('input', () => {
  const searchTerm = searchBox.value;
  if (searchTerm.trim() !== '') {
    fetchCountries(searchTerm)
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

regionSelect.addEventListener('change', () => {
  const selectedRegion = regionSelect.value;
  if (selectedRegion.trim() !== '') {
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

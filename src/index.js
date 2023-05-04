import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import { debounce } from 'lodash';
import { Notify } from 'notiflix';

const DEBOUNCE_DELAY = 300;

const countrySearch = document.getElementById('search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

countrySearch.addEventListener(
  'input',
  debounce(async ev => {
    // Usunięcie listy i szczegółów kraju
    const countryName = ev.target.value;
    if (countryName === '') {
      countryList.innerHTML = '';
      countryInfo.innerHTML = '';
      return;
    }

    const countries = await fetchCountries(countryName.trim());

    // Stworzenie listy krajów
    if (countries.length > 10) {
      Notify.info('Too many matches found. Please enter a more specific name.');
    } else if (countries.length <= 10) {
      countryList.innerHTML = countries
        .map(
          country =>
            `<li><img height="16" width="24" class="country__Flag" src="${country.flags.png}" />${country.name.common}</li>`
        )
        .join('');
    }

    // Utworzenie szczegółów kraju
    if (countries.length === 1) {
      const country = countries[0];
      const languages = Object.values(country.languages).join(', ');
      const { capital, population } = country;
      countryInfo.innerHTML = `
        <p><strong>Capital:</strong> ${capital}</p>
        <p><strong>Population:</strong> ${population}</p>
        <p><strong>Languages:</strong> ${languages}</p>
      `;
    }

    if (!countries.length) {
      Notify.failure('No matches found.');
    }
  }, DEBOUNCE_DELAY)
);

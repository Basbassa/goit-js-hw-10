const queryParams = new URLSearchParams({
  fields: 'name,capital,population,flags,languages',
});

const API_URL = 'https://restcountries.com/v3.1/name';

export const fetchCountries = name => {
  return fetch(`${API_URL}/${name}?${queryParams.toString()}`).then(
    response => {
      return response.json();
    }
  );
};

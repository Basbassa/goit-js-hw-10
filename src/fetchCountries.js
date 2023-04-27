export function fetchCountries(searchTerm) {
  const endpoint = `https://restcountries.com/v3.1/name/${searchTerm}`;
  return fetch(endpoint)
    .then(response => {
      if (!response.ok) {
        throw new Error('Unable to fetch countries.');
      }
      return response.json();
    })
    .then(data => {
      const countries = data.map(country => {
        return {
          name: country.name,
          population: country.population,
          capital: country.capital,
          languages: Object.values(country.languages),
          flags: country.flags,
        };
      });
      return countries;
    });
}

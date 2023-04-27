export function fetchCountries(name) {
  const fields = 'name.official;flag;population;region;capital';
  const url = `https://restcountries.com/v3.1/name/${name}?fields=${fields}`;
  return fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error('Could not fetch countries');
      }
      return response.json();
    })
    .then(data => {
      const countries = data.map(country => ({
        name: country.name.official,
        capital: country.capital[0],
        population: country.population,
        flag: country.flags.svg,
        region: country.region,
      }));
      return countries;
    })
    .catch(error => {
      console.error('Error fetching countries:', error);
      throw error;
    });
}

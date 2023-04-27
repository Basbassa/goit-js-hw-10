function fetchCountries(name, region) {
  let url = `https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags.svg,languages`;

  if (region) {
    url += `&region=${region}`;
  }

  return fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error('Could not fetch countries');
      }
      return response.json();
    })
    .then(data => {
      const countries = data.map(country => ({
        name: country.name.common,
        capital: country.capital?.[0],
        population: country.population,
        flag: country.flags.svg,
        languages: Object.values(country.languages).map(lang => lang.name),
      }));
      return countries;
    })
    .catch(error => {
      console.error('Error fetching countries:', error);
      throw error;
    });
}

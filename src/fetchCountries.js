export function fetchCountries(name) {
  const url = `https://restcountries.com/v3.1/name/${name}?fields=name.official,capital,population,flags.svg,languages`;
  return fetch(url)
    .then(response => response.json())
    .then(data => data)
    .catch(error => console.log(error));
}

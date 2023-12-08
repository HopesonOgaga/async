'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////

const render_error = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
  // countriesContainer.style.opacity = 1;
};

const renderCountry = function (data, className = '') {
  const html = `
    <article class="country ${className}">
      <img class="country__img" src="${data.flags.png}" />
      <div class="country__data">
        <h3 class="country__name">${data.name.common}</h3>
        <h4 class="country__region">${data.region}</h4>
        <p class="country__row"><span>👫</span>${+data.population} people</p>
        <p class="country__row"><span>🗣️</span>${data.languages.por}</p>
        <p class="country__row"><span>💰</span>${data.currencies[0]}</p>
      </div>
    </article>
    `;
  countriesContainer.insertAdjacentHTML('beforeend', html);
  // countriesContainer.style.opacity = 1;
};

const get_country_data = function (country) {
  const request = fetch(`https://restcountries.com/v3.1/name/${country}`)
    .then(reponse => reponse.json())
    .then(data => {
      renderCountry(data[0]);
      const neighbour = data[0].borders[0];
      if (!neighbour) return;

      // country 2
      return fetch(`https://restcountries.com/v3.1/name/${neighbour}`);
    })
    .then(response => {
      // response section

      if (!response.ok) {
        throw new Error(`country not found ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      // data section
      renderCountry(data[0], 'neighbour');
      const neighbour = data[0].borders[0];
      return fetch(`https://restcountries.com/v3.1/name/${neighbour}`);
    })
    .then(response => {
      console.log(response);
      if (!response.ok) {
        throw new Error(`neighbour not found ${response.status}`);
      }

      return response.json();
    })
    .then(data => renderCountry(data[0], 'neighbour'))
    .catch(err =>
      render_error(`Something went wrong 💥💥 ${err.message}. Try again!`)
    )
    .finally(() => (countriesContainer.style.opacity = 1));
};

btn.addEventListener('click', function (e) {
  get_country_data('palestine');
});

// (`https://restcountries.com/v3.1/name/${country}`)

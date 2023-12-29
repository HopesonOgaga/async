'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////

const render_error = function (msg) {
  countriesContainer.insert('beforeend', msg);
  countriesContainer.style.opacity = 1;
};

const renderCountry = function (data, className = '') {
  const html = `
    <article class="country ${className}">
      <img class="country__img" src="${data.flags.png}" />
      <div class="country__data">
        <h3 class="country__name">${data.name.common}</h3>
        <h4 class="country__region">${data.region}</h4>
        <p class="country__row"><span>👫</span>${(
          +data.population / 1000
        ).toFixed(1)}m people</p>
        <p class="country__row"><span>🗣️</span>${data.languages.eng}</p>
        <p class="country__row"><span>💰</span>${data.currencies[0]}</p>
      </div>
    </article>
    `;
  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};
const get_country = function (country) {
  fetch(`https://restcountries.com/v3.1/name/${country}`)
    .then(
      response => response.json(),
    )
    .then(data => {
      renderCountry(data[0]);
      console.log(data);
      const borders = data[0].borders;
      if (!borders || borders.length === 0) {
        return;
      }
      const neighbour = borders[0];
      return fetch(`https://restcountries.com/v3.1/name/${neighbour}`)
        .then(response => response.json())
        .then(neighbourData => renderCountry(neighbourData[0], 'neighbour'));
    })
    .catch(err => alert(err));
};

btn.addEventListener('click', function (e) {
  get_country('usa');
});

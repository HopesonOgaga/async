'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////
/*
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
*/
// const get_country = function (country) {
//   fetch(`https://restcountries.com/v3.1/name/${country}`)
//     .then(response => response.json())
//     .then(data => {
//       renderCountry(data[0]);
//       console.log(data);
//       const borders = data[0].borders;
//       if (!borders || borders.length === 0) {
//         return;
//       }
//       const neighbour = borders[0];
//       return fetch(`https://restcountries.com/v3.1/name/${neighbour}`)
//         .then(response => response.json())
//         .then(neighbourData => renderCountry(neighbourData[0], 'neighbour'));
//     })
//     .catch(err => alert(err));
// };

// btn.addEventListener('click', function (e) {
//   get_country('usa');
// });

// gealocation

/* 
In this challenge you will build a function 'whereAmI' which renders a country ONLY based on GPS coordinates. For that, you will use a second API to geocode coordinates.

Here are your tasks:

PART 1
1. Create a function 'whereAmI' which takes as inputs a latitude value (lat) and a longitude value (lng) (these are GPS coordinates, examples are below).
2. Do 'reverse geocoding' of the provided coordinates. Reverse geocoding means to convert coordinates to a meaningful location, like a city and country name. Use this API to do reverse geocoding: https://geocode.xyz/api.
The AJAX call will be done to a URL with this format: https://geocode.xyz/52.508,13.381?geoit=json. Use the fetch API and promises to get the data. Do NOT use the getJSON function we created, that is cheating 😉
3. Once you have the data, take a look at it in the console to see all the attributes that you recieved about the provided location. Then, using this data, log a messsage like this to the console: 'You are in Berlin, Germany'
4. Chain a .catch method to the end of the promise chain and log errors to the console
5. This API allows you to make only 3 requests per second. If you reload fast, you will get this error with code 403. This is an error with the request. Remember, fetch() does NOT reject the promise in this case. So create an error to reject the promise yourself, with a meaningful error message.

PART 2
6. Now it's time to use the received data to render a country. So take the relevant attribute from the geocoding API result, and plug it into the countries API that we have been using.
7. Render the country and catch any errors, just like we have done in the last lecture (you can even copy this code, no need to type the same code)

TEST COORDINATES 1: 52.508, 13.381 (Latitude, Longitude)
TEST COORDINATES 2: 19.037, 72.873
TEST COORDINATES 2: -33.933, 18.474

GOOD luck */

/*

function where_am_i(lat, lng) {
  fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`)
    .then(reponse => reponse.json())
    .then(data => {
      console.log(`youre in ${data.city} ${data.country}`);
      return fetch(`https://restcountries.com/v3.1/name/${data.country}`)
        .then(response => response.json())
        .then(data => {
          console.log(data);
          renderCountry(data[0]);
        });
    })
    .catch(err => alert(err));
}

where_am_i(52.508, 13.381);

*/

// event looping in javascript

console.log('test start');
setTimeout(() => console.log('0 sec timer'), 0);
Promise.resolve('resolved promise 1').then(res => console.log(res));
console.log('test end');

// promise

const lottery_promse = new Promise(function (resolve, reject) {
  console.log('lottery drawl');
  setTimeout(function () {
    if (Math.random() >= 0.5) {
      resolve('you win');
    } else {
      reject('you loose');
    }
  }, 2000);
});

lottery_promse.then(res => console.log(res)).catch(err => console.error(err));

// promisfying set timeout
// const wait = function (seconds) {
//   return new Promise(function (resolve) {
//     setTimeout(resolve, seconds * 1000);
//   });
// };
// wait(2).then(() => {
//   console.log('i waited for 2 secs');
//   return wait(2);
// });

// promise the geolocation api

// console.log('getting location');

// const get_position = function () {
//   return new Promise(function (resolve, reject) {
//     navigator.geolocation.getCurrentPosition(
//       function (position) {
//         resolve(position);
//       },
//       err => reject(err)
//     );
//   });
// };
// upgrade of code

// function where_am_i(lat, lng) {
//   get_position()
//     .then(pos => {
//       const { latitude: lat, longitude: lng } = pos.coords;
//       return fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
//     })
//     .then(reponse => reponse.json())
//     .then(data => {
//       console.log(`youre in ${data.city} ${data.country}`);
//       return fetch(`https://restcountries.com/v3.1/name/${data.country}`)
//         .then(response => response.json())
//         .then(data => {
//           console.log(data);
//           renderCountry(data[0]);
//         });
//     })
//     .catch(err => alert(err));
// }

// btn.addEventListener('click', where_am_i);

// Coding Challenge #2

/* 
Build the image loading functionality that I just showed you on the screen.

Tasks are not super-descriptive this time, so that you can figure out some stuff on your own. Pretend you're working on your own 😉

PART 1
1. Create a function 'createImage' which receives imgPath as an input. This function returns a promise which creates a new
 image (use document.createElement('img')) and sets the .src attribute to the provided image path. When the image is done loading, append it to the DOM element with the
 'images' class, and resolve the promise. The fulfilled value should be the image element itself. 
 In case there is an error loading the image ('error' event), reject the promise.

If this part is too tricky for you, just watch the first part of the solution.

PART 2
2. Comsume the promise using .then and also add an error handler;
3. After the image has loaded, pause execution for 2 seconds using the wait function we created earlier;
4. After the 2 seconds have passed, hide the current image (set display to 'none'), and load a second image (HINT: Use the image element returned by the createImage promise to hide the current image. You will need a global variable for that 😉);
5. After the second image has loaded, pause execution for 2 seconds again;
6. After the 2 seconds have passed, hide the current image.
*/

// const wait = function (seconds) {
//   return new Promise(function (resolve) {
//     setTimeout(resolve, seconds * 1000);
//   });
// };

// const imgContainer = document.querySelector('.images');

// function createImage(imgPath) {
//   return new Promise(function (resolve, reject) {
//     const img = document.createElement('img');
//     img.src = imgPath;

//     img.addEventListener('load', function () {
//       imgContainer.append(img);
//       resolve(img);
//     });
//     img.addEventListener('error', function () {
//       reject(new Error('image not found'));
//     });
//   });
// }
// let current_img;
// createImage('img/img-1.jpg')
//   .then(img => {
//     current_img = img;
//     console.log('mage 1 ');
//     return wait(2);
//   })
//   .then(() => {
//     current_img.style.display = 'none';
//   })
//   .catch(err => console.error(err));

// btter way of consuming promises

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

// const where_am_i = async function (country) {
//   try {
//     const res = await fetch(`https://restcountries.com/v3.1/name/${country}`);
//     console.log(res);
//     const data = await res.json();
//     console.log(data);
//     renderCountry(data[0]);
//   } catch {
//     err => console.log(err);
//   }
// };

const get_3_countries = async function (c1, c2, c3) {
  try {
    let arr = [];

    const res = await fetch(`https://restcountries.com/v3.1/name/${c1}`);
    const data = await res.json();
    arr.push(data);

    const res_2 = await fetch(`https://restcountries.com/v3.1/name/${c2}`);
    const data2 = await res_2.json();
    arr.push(data2);

    const res_3 = await fetch(`https://restcountries.com/v3.1/name/${c3}`);
    const data3 = await res_3.json();
    arr.push(data3);

    console.log(arr.map(d => d[0].capital));
  } catch (err) {
    console.log(err);
  }
};

get_3_countries('portugal', 'canada', 'nigeria');

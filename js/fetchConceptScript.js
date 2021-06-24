'use strict';

let inputValue;
let searchButton = document.getElementById('search');
let section = document.getElementById('outputSection');
let input = document.getElementById('inputField');

searchButton.addEventListener('click', function(evt) {
  inputValue = document.getElementById('inputField').value;
  fetchComics(inputValue);
});

searchButton.click(function() {
  inputValue = document.getElementById('inputfield').value;
  fetchComics(inputValue);
});

input.addEventListener('keyup', function(evt) {
  evt.preventDefault();
  if (evt.keyCode === 13) {
    searchButton.click();
  }
});

// -----------------------------FETCHING------------------------------------//
let proxyUrl = 'https://cors-anywhere.herokuapp.com/',
    targetUrl = `https://comicvine.gamespot.com/api/`;

function fetchComics(data) {
  fetch(proxyUrl + targetUrl + `search/?api_key=${config.API_KEY}&format=json&query=${data}&resources=concept`).
      then(function(response) {
        return response.json();
      }).
      then(function(json) {
        console.log(json);
        // Printing the data from the for-loop
        printComicInformation(json);
      }).
      catch(function(error) {
        console.log('Error: ' + error);
      });
}

function printComicInformation(data) {

  section.innerHTML = "";

  for (let i = 0; i <= data.results.length; i++) {

    if(data.results[i].deck == null){
      data.results[i].deck = "No deck found.";
    }

    section.innerHTML += `<section class="comicInfo">
          <img src="${data.results[i].image.medium_url}" alt="${data.results[i].name}">
          <h1>${data.results[i].name}</h1>
          <p>${data.results[i].deck}</p>
          <p>For more details about this concept visit:</p>
          <a href="${data.results[i].site_detail_url}" target="_blank">${data.results[i].site_detail_url}</a>
          </section>`;

  }
}
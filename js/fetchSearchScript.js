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
  fetch(proxyUrl + targetUrl + `search/?api_key=ee41526160ae9968da980fa835fe8f869cfce78f&format=json&query=${data}&resources=creators`).
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

    if (data.results[i].first_issue.name == null) {
      data.results[i].first_issue.name = "No name found";
    }

    if (data.results[i].last_issue.name == null) {
      data.results[i].last_issue.name = "No name found";
    }

    if (data.results[i].description == null &&
        data.results[i].first_issue.name == data.results[i].last_issue.name) {
      section.innerHTML += `<section class="comicInfo">
            <img src="${data.results[i].image.medium_url}" alt="${data.results[i].name}">
            <h1>${data.results[i].name}</h1>
            <p>Issues: ${data.results[i].count_of_issues}</p>
            <p>Publisher: ${data.results[i].publisher.name}</p>
            </section>`;
    } else if (data.results[i].description == null) {
      section.innerHTML += `<section class="comicInfo">
            <img src="${data.results[i].image.medium_url}" alt="${data.results[i].name}">
            <h1>${data.results[i].name}</h1>
            <p>Issues: ${data.results[i].count_of_issues}</p>
            <p>First issue: ${data.results[i].first_issue.name}</p>
            <p>Last issue: ${data.results[i].last_issue.name}</p>
            <p>Publisher: ${data.results[i].publisher.name}</p>
            </section>`;
    } else if (data.results[i].first_issue.name ==
        data.results[i].last_issue.name) {
      section.innerHTML += `<section class="comicInfo">
            <img src="${data.results[i].image.medium_url}" alt="${data.results[i].name}">
            <h1>${data.results[i].name}</h1>
            <div class="summary">${data.results[i].description}</div>
            <p>Issues: ${data.results[i].count_of_issues}</p>
            <p>Publisher: ${data.results[i].publisher.name}</p>
            </section>`;
    } else {
      section.innerHTML += `<section class="comicInfo">
            <img src="${data.results[i].image.medium_url}" alt="${data.results[i].name}">
            <h1>${data.results[i].name}</h1>
            <div class="summary">${data.results[i].description}</div>
            <p>Issues: ${data.results[i].count_of_issues}</p>
            <p>First issue: ${data.results[i].first_issue.name}</p>
            <p>Last issue: ${data.results[i].last_issue.name}</p>
            <p>Publisher: ${data.results[i].publisher.name}</p>
            </section>`;
    }
  }
}
'use strict';

let inputValue;
let searchButton = document.getElementById('search');
let section = document.getElementById('outputSection');
let input = document.getElementById('inputField');

searchButton.addEventListener('click', function(evt) {
  inputValue = document.getElementById('inputfield').value;
  console.log(inputValue);
  fetchComics(inputValue);
});

// -----------------------------FETCHING------------------------------------//
function fetchComics(data) {
  fetch(``).
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

function printComicInformation() {
  section.innerHTML = "";

}

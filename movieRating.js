'use strict'

let sortCriteria;

$('form').on('submit', function(e) {
  e.preventDefault();
  const movie = $('input[type=text]').val();
  const rating = $('input[type=number]').val();
  if (movie.length < 2) {
    $('input[type=text]').val('');
    $('input[type=number]').val('');
    return Alert.render(`The movie title must have at least two characters in it. Please try again.`);
  } else {
    $('ol').append(`<li>${movie} (${rating}) <button class='removeButton btn btn-dark btn-sm'>Remove</button></li>`);
    $('input[type=text]').val('');
    $('input[type=number]').val('');
  }

  const listLength = $('ol').children().length;
  // If list is empty, make heading an empty string. Else, include a heading.
  listLength === 0 ? $('h4').empty() : $('h4').text('Movie Ratings') ;
});

$('ol').on('click', 'button', function(e) {
  $(e.target).parent().remove();

  const listLength = $('ol').children().length;
  // If list is empty, make heading an empty string. Else, include a heading.
  listLength === 0 ? $('h4').empty() : $('h4').text('Movie Ratings') ;
})

$('.dropdown-menu').on('click','li a',function(e) {
  e.target.innerHTML === 'Movie Title' 
  ? sortCriteria = "title"
  : sortCriteria = "rating";
});

$('.sort-btn').on('click', '[data-sort]', function(e) {
  e.preventDefault();
  
  /** $this is the .sort-btn button */
  let $this = $(this), sortDir = 'desc';
  
  /** if 'sort' is not 'asc', set to 'asc' */
  if ($this.data('sort') !== 'asc') sortDir = 'asc';

  $this.data('sort', sortDir).find('.fa').attr('class', 'fa fa-sort-' + sortDir);

  if (!sortCriteria) return Alert.render(`Please select movie title or rating from the dropdown menu before choosing a sort direction.`);
  else if (sortCriteria === "title" && sortDir === "asc") sortAlphaAsc('ol');
  else if (sortCriteria === "title" && sortDir === "desc") sortAlphaDesc('ol');
  else if (sortCriteria === "rating" && sortDir === "asc") sortNumAsc('ol');
  else sortNumDesc('ol');
});

/** sorts selector in ascending alphabetical order */
function sortAlphaAsc(selector) {
const arr = [];
for (let child of $(selector).children()) {
  arr.push(child.innerHTML);
}
arr.sort();
$(selector).empty();

for (let html of arr) {
  $(selector).append(`<li>${html}</li>`);
}
}

/** sorts selector in descending alphabetical order */
function sortAlphaDesc(selector) {
const arr = [];
for (let child of $(selector).children()) {
  arr.push(child.innerHTML);
}
arr.sort((a, b) => a < b ? 1 : a > b ? -1 : 0);
$(selector).empty();

for (let html of arr) {
  $(selector).append(`<li>${html}</li>`);
}
}

/** sorts selector in ascending alphabetical order */
// The sort function doesn't work if the regEx below has single quotes. I get the error "TypeError: Cannot read property '1' of null at Array.sort". Why is this?  
function sortNumAsc(selector) {
const arr = [];
for (let child of $(selector).children()) {
  arr.push(child.innerHTML);
}
arr.sort((a, b) => {
  let regXRating = /\w+\s\((\d+)\)\s<button class="removeButton btn btn-dark btn-sm">Remove<\/button>/;
  // let regXRating = /\w+\s\((\d+)\)\s<button class='removeButton btn btn-dark btn-sm'>Remove<\/button>/;    
  let aRating = regXRating.exec(a);
  let bRating = regXRating.exec(b);
  return aRating[1] - bRating[1];
});
$(selector).empty();

for (let html of arr) {
  $(selector).append(`<li>${html}</li>`);
}
}

/** sorts selector in dscending alphabetical order */
// The sort function doesn't work if the regEx below has single quotes. I get the error "TypeError: Cannot read property '1' of null at Array.sort". Why is this? 
function sortNumDesc(selector) {
const arr = [];
for (let child of $(selector).children()) {
  arr.push(child.innerHTML);
}
arr.sort((a, b) => {
  let regXRating = /\w+\s\((\d+)\)\s<button class="removeButton btn btn-dark btn-sm">Remove<\/button>/;
  // let regXRating = /\w+\s\((\d+)\)\s<button class='removeButton btn btn-dark btn-sm'>Remove<\/button>/;
  let aRating = regXRating.exec(a);
  let bRating = regXRating.exec(b);
  return bRating[1] - aRating[1];
});
$(selector).empty();

for (let html of arr) {
  $(selector).append(`<li>${html}</li>`);
}
}

// custom alert box
class CustomAlert {
  render (msg) {
    const winW = window.innerWidth;
    const winH = window.innerHeight;
    const dialogoverlay = document.querySelector('#dialogoverlay');
    const dialogbox = document.querySelector('#dialogbox');
    dialogoverlay.style.display = 'block';
    dialogoverlay.style.height = winH * 2 + 'px';
    dialogbox.style.left = (winW / 4) + 'px';
    dialogbox.style.top = (winH / 5) + 'px';
    dialogbox.style.display = 'block';

    document.querySelector('#dialogboxhead').innerHTML = `<img class='image-center' src='https://i.ibb.co/v3T6fSz/favorite-movies.png' alt='Two stars on a film roll'>`;
    document.querySelector('#dialogboxbody').innerHTML = msg;
    document.querySelector('#dialogboxfoot').innerHTML = '<button style="color: white; background-color: black;" onclick="Alert.ok()">OK</button>';
  }
  ok = function () {
    document.querySelector('#dialogbox').style.display = 'none';
    document.querySelector('#dialogoverlay').style.display = 'none';
  }
}

const Alert = new CustomAlert();

/*
References:

https://getbootstrap.com/docs/5.0/examples/cheatsheet/

https://getbootstrap.com/docs/5.0/components/button-group/#nesting

https://getbootstrap.com/docs/5.0/components/buttons/#examples

https://getbootstrap.com/docs/5.0/components/dropdowns/

https://getbootstrap.com/docs/4.0/getting-started/javascript/#data-attributes

https://api.jquery.com/data/#data-html5: 
.data(key) returns: Object
Description: Return arbitrary data associated with the first element in the jQuery collection, as set by data() or by an HTML5 data-* attribute.

https://codepen.io/jasongardner/pen/VKxgZv: Bootstrap sort button
*/

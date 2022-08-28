import { movies } from './data.js';

render(movies);

const formElement = document.querySelector('#search-box');
const yearElement = document.querySelector('#year');
const countElement = document.querySelector('#count');
const searchElement = document.querySelector('#search');

formElement.addEventListener('submit', (e) => {
   e.preventDefault();

   const searchQuery = searchElement.value;
   const year = yearElement.value;
   const wows = countElement.value;

   let result = movies;

   if (searchQuery) {
      result = result.filter((movie) => movie.movie.toLowerCase().includes(searchQuery.toLowerCase()));
   }

   if (year !== 'any') {
      result = result.filter((movie) => movie.year == year);
   }
  
   if (wows !== 'any') {
      result = result.filter((movie) => movie.total_wows_in_movie == wows);
   }

   render(result);
});

function render(movies) {
   let html;

   if (movies.length === 0) {
      html = '<p>No results found.</p>';
   } else {
      html = `
         <ol>
            ${movies.map((movie) => `
               <li class="movie">
                  <img src="${movie.poster}" alt="${movie.poster}">
               </li>
            `).join('')}
         </ol>
      `;
   }

   document.querySelector('main').innerHTML = html;
}
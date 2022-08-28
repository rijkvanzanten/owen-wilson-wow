import { movies } from './data.js';

const mainElement = document.querySelector('main');
const formElement = document.querySelector('#search-box');
const yearElement = document.querySelector('#year');
const countElement = document.querySelector('#count');
const searchElement = document.querySelector('#search');
const dialogElement = document.querySelector('dialog');

render(movies);

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
      if (wows === '5+') {
         result = result.filter((movie) => movie.total_wows_in_movie >= 5);
      } else {
         result = result.filter((movie) => movie.total_wows_in_movie == wows);
      }
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
               <li class="movie" data-movie="${movie.movie}">
                  <img src="${movie.poster}" alt="${movie.movie}">
               </li>
            `).join('')}
         </ol>
      `;
   }

   mainElement.innerHTML = html;

   const movieElements = document.querySelectorAll('.movie');
   movieElements.forEach((movieElement) => movieElement.addEventListener('click', onMovieClick));
}

function onMovieClick(event) {
   const movieTitle = event.currentTarget.dataset.movie;
   const movie = movies.find((movie) => movie.movie === movieTitle);

   dialogElement.innerHTML = `
      <div id="info">
         <h2>${movie.movie}</h2>
         <img src="${movie.poster}" alt="${movie.movie}">
         <dl>
            <dt>Character</dt>
            <dd>${movie.character}</dd>
            <dt>Number of Wows</dt>
            <dd>${movie.total_wows_in_movie}</dd>
            <dt>Director</dt>
            <dd>${movie.director}</dd>
            <dt>Release Date</dt>
            <dd>${movie.release_date}</dd>
            <dt>Duration</dt>
            <dd>${movie.movie_duration}</dd>
         </dl>

         <form method="dialog">
            <button>OK</button>
         </form>
      </div>
      <div id="movies">
         ${movie.wows.map((wow) => `
            <video loop src="${wow.video['360p']}"></video>
         `).join('')}
      </div>
   `;

   const videoElements = dialogElement.querySelectorAll('video');

   videoElements.forEach(videoEl => videoEl.addEventListener('pointerenter', (e) => {
      e.currentTarget.play();
   }))

   videoElements.forEach(videoEl => videoEl.addEventListener('pointerleave', (e) => {
      e.currentTarget.pause();
      e.currentTarget.currentTime = 0;
   }))

   dialogElement.open = true;
}
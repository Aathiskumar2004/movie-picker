import { moviesData } from "./data.js";

const moodRadios = document.getElementById("mood-radios");
const getMovieBtn = document.getElementById("get-movie-btn");
const classicsOnlyOption = document.getElementById("classics-only-option");
const movieModalInner = document.getElementById("movie-modal-inner");
const movieModal = document.getElementById("movie-modal");
const movieModalCloseBtn = document.getElementById("movie-modal-close-btn");

moodRadios.addEventListener("change", highlightCheckOption);

getMovieBtn.addEventListener("click", renderMovie);

function renderMovie() {
  const movieObject = getSingleMovieObject();
 console.log(movieObject);
  movieModalInner.innerHTML = `<div>
  <img class="movie-poster" src="${movieObject.poster}"/>
  <h2 class="movie-title">${movieObject.title}</h2>
  <div class="movie-details">
  <p>Year: ${movieObject.year}</p>
  <p>Rating:${movieObject.rating}</p>
  </div>
  <p class="movie-genre">${movieObject.genre}</p>

  
  </div>`
  console.log(movieObject.year);
  
  movieModal.style.display = "flex";
}


function getSingleMovieObject() {
  const matchingMovies = getMatchingArray();
  if (matchingMovies.length === 1) {
    return matchingMovies[0];
  } else{
    const randomNumber = Math.floor(Math.random()*matchingMovies.length);
    console.log(matchingMovies[randomNumber]);
    
   return matchingMovies[randomNumber];
  }
}


function getMatchingArray() {
  if (document.querySelector(`input[type="radio"]:checked`)){
    const isclassic  = classicsOnlyOption.checked;
     const selectedRadio = document.querySelector(`input[type="radio"]:checked`);
  const matchingArray = moviesData.filter(function(movie){
 if (isclassic) {
      return movie.moodTags.includes(selectedRadio.value) && movie.year<2000;
    } else {
      return movie.moodTags.includes(selectedRadio.value);
    }

  });
  
  return matchingArray
  }
 }


function highlightCheckOption(e) {
  const radios = document.getElementsByClassName("radio");
  for (let radio of radios) {
    radio.classList.remove("highlight");
  }
  document.getElementById(e.target.id).parentElement.classList.add("highlight");
}

function getMoodArray(movies) {
  let moods = [];
  for (let movie of movies) {
    for (let mood of movie.moodTags) {
      if (!moods.includes(mood)) {
        moods.push(mood);
      }
    }
  }
  return moods;
}


function renderMoodRadios(movies) {
  let radioItems = "";
  const moods = getMoodArray(movies);
  for (let mood of moods) {
    radioItems += `
      <div class="radio">
        <input type="radio" id="${mood}" value="${mood}" name="Emotions"/>
        <label for="${mood}">${mood}</label>
      </div>
    `;
  }
  moodRadios.innerHTML = radioItems;
}


renderMoodRadios(moviesData);

movieModalCloseBtn.addEventListener("click", function () {
  movieModal.style.display = "none";
});

movieModal.addEventListener("click", function (e) {
  if (e.target === movieModal) {
    movieModal.style.display = "none";
  }
});


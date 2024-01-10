const apiKey = '1b1b60c0';

async function getMovieDetailsById(imdbID) {
    const response = await fetch(`https://www.omdbapi.com/?apikey=${apiKey}&i=${imdbID}`);
    const data = await response.json();
    return data.Response === 'True' ? data : null;
}

function displayMovieDetails(movie) {
    const movieDetailsContainer = document.getElementById('movieDetails');
    console.log(movie)
    movieDetailsContainer.innerHTML = `
        <div class="row flex-lg-row-reverse align-items-center g-5 py-5">
            <div class="col-10 col-sm-8 col-lg-6">
                <img src="${movie.Poster}" class="d-block mx-lg-auto img-fluid" alt="${movie.Title}" width="700" height="500" loading="lazy">
            </div>
            <div class="col-lg-6">
                <h1 class="display-5 fw-bold text-body-emphasis lh-1 mb-3">${movie.Title}</h1>
                <p class="lead">${movie.Plot}</p>
                <ul class="list-group">
                    <li class="list-group-item"><strong>Year:</strong> ${movie.Year}</li>
                    <li class="list-group-item"><strong>Actors:</strong> ${movie.Actors}</li>

                    <li class="list-group-item"><strong>Director:</strong> ${movie.Director}</li>
                    <li class="list-group-item"><strong>Genre:</strong> ${movie.Genre}</li>
                    <li class="list-group-item"><strong>Runtime:</strong> ${movie.Runtime}⌚</li>
                    <li class="list-group-item"><strong>IMDb Rating:</strong>  ${'⭐'.repeat(Math.floor(movie.imdbRating))}</li>
                    <!-- Add other movie details here -->
                </ul>
            </div>
    </div>`;
}

document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const imdbID = urlParams.get('id');

    if (imdbID) {
        getMovieDetailsById(imdbID)
            .then(movie => {
                if (movie) {
                    displayMovieDetails(movie);
                } else {
                    const movieDetailsContainer = document.getElementById('movieDetails');
                    movieDetailsContainer.innerHTML = '<p>Movie details not found.</p>';
                }
            })
            .catch(error => {
                console.error('Error fetching movie details:', error);
                const movieDetailsContainer = document.getElementById('movieDetails');
                movieDetailsContainer.innerHTML = '<p>Error fetching movie details.</p>';
            });
    }
});
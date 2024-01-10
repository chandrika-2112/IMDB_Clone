
// * Displays the list of favorite movies on the favorites.html page.

// * Displays the list of favorite movies on the favorites.html page.

function displayFavourites() {
    // Get the container for the favorites list
    const favouritesListContainer = document.getElementById('favouritesList');
    favouritesListContainer.innerHTML = '';

    // Retrieve the favorites list from localStorage
    const favouritesList = JSON.parse(localStorage.getItem('favourites')) || [];

    // Check if the favorites list is empty
    if (favouritesList.length === 0) {
        // Display a message when the favorites list is empty
        const emptyMessage = document.createElement('p');
        emptyMessage.textContent = 'Your favourites list is empty.';
        favouritesListContainer.appendChild(emptyMessage);
    } else {
        // Display each movie in the favorites list
        favouritesList.forEach(movie => {
            // Create a card element for the movie
            const movieCard = document.createElement('div');
            movieCard.classList.add('row', 'g-4', 'border', 'rounded', 'p-3'); // Added border and padding

            movieCard.innerHTML = `
                <div class="col-md-4">
                    <img src="${movie.Poster}" class="img-fluid rounded-start" alt="${movie.Title}">
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title">${movie.Title}</h5>
                        <p class="card-text">${movie.Plot}</p>
                        <button type="button" class="btn btn-outline-info">More</button>
                        <button type="button" class="btn btn-outline-danger remove-button" data-imdbid="${movie.imdbID}">Remove</button>
                    </div>
                </div>
            `;
            // Append the movie card to the container
            favouritesListContainer.appendChild(movieCard);
        });
    }

    // Add event listeners to the remove buttons
    const removeButtons = document.querySelectorAll('.remove-button');
    removeButtons.forEach(button => {
        button.addEventListener('click', removeFromFavourites);
    });
}

// ... (rest of the code remains the same)



// Removes a movie from the list of favorites.
function removeFromFavourites(event) {
    const imdbID = event.target.dataset.imdbid;
    const favouritesList = JSON.parse(localStorage.getItem('favourites')) || [];

    const updatedFavourites = favouritesList.filter(movie => movie.imdbID !== imdbID);

    localStorage.setItem('favourites', JSON.stringify(updatedFavourites));

    // Update the displayed favorites list
    displayFavourites();
}

// Call the displayFavourites function when the page loads
window.addEventListener('load', displayFavourites);

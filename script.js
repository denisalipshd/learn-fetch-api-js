// $(".search-btn").on("click", function () {
//   const keyword = $(".input-keyword").val();

//   $.ajax({
//     url: `http://www.omdbapi.com/?apikey=7663fde8&s=${keyword}`,
//     success: (result) => {
//       if (result.Response === "True") {
//         const movies = result.Search;
//         let cards = "";

//         // Loop untuk membuat setiap kartu film
//         movies.forEach((movie) => {
//           cards += showCards(movie);
//         });

//         // Masukkan kartu ke dalam kontainer
//         $(".movie-container").html(cards);

//         // Event handler untuk tombol Show Details
//         $(".modal-detail-btn").on("click", function () {
//           const imdbID = $(this).data("imdbid");
//           fetchMovieDetails(imdbID);
//         });
//       } else {
//         $(".movie-container").html(`<p class="text-center text-danger">Movies not found!</p>`);
//       }
//     },
//     error: (error) => {
//       console.error("Error fetching movies:", error.responseText);
//     },
//   });
// });

// Fungsi untuk mengambil detail film berdasarkan IMDb ID
// function fetchMovieDetails(imdbID) {
//   $.ajax({
//     url: `http://www.omdbapi.com/?apikey=7663fde8&i=${imdbID}`,
//     success: (movie) => {
//       const movieDetail = showMovieDetail(movie);

//       // Masukkan detail film ke dalam modal
//       $(".modal-body").html(movieDetail);
//     },
//     error: (error) => {
//       console.error("Error fetching movie details:", error.responseText);
//     },
//   });
// }

const btnSearch = document.querySelector(".search-btn");
btnSearch.addEventListener("click", function () {
  const inputKeyword = document.querySelector(".input-keyword");

  fetch("http://www.omdbapi.com/?apikey=7663fde8&s=" + inputKeyword.value)
    .then((response) => response.json())
    .then((response) => {
      const movies = response.Search;
      let cards = "";

      if (movies) {
        movies.forEach((m) => (cards += showCards(m)));
      } else {
        cards = `<div class="col"><p class="text-center">Movie not found!</p></div>`;
      }

      const movieContainer = document.querySelector(".movie-container");
      movieContainer.innerHTML = cards;

      const btnMovieDetail = document.querySelectorAll(".modal-detail-btn");
      btnMovieDetail.forEach((btn) => {
        btn.addEventListener("click", function () {
          const imdbid = this.dataset.imdbid;
          fetch("http://www.omdbapi.com/?apikey=7663fde8&i=" + imdbid)
            .then((response) => response.json())
            .then((m) => {
              const movieDetail = showMovieDetail(m);
              const modalBody = document.querySelector(".modal-body");
              modalBody.innerHTML = movieDetail;
            });
        });
      });
    });
});

// Fungsi untuk menampilkan kartu film
function showCards(m) {
  return `
  <div class="col-md-4 my-3">
    <div class="card h-100">
      <img src="${m.Poster}" class="card-img-top" alt="${m.Title}" />
      <div class="card-body d-flex flex-column">
        <h5 class="card-title">${m.Title}</h5>
        <h6 class="card-subtitle mb-2 text-body-secondary">${m.Year}</h6>
        <a 
          href="#" 
          class="btn btn-primary mt-auto modal-detail-btn" 
          data-bs-toggle="modal" 
          data-bs-target="#movieDetailModal" 
          data-imdbid="${m.imdbID}">
          Show Details
        </a>
      </div>
    </div>
  </div>`;
}

// Fungsi untuk menampilkan detail film
function showMovieDetail(m) {
  return `
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-3">
        <img src="${m.Poster}" class="img-fluid" alt="${m.Title}" />
      </div>
      <div class="col-md">
        <ul class="list-group">
          <li class="list-group-item">
            <h4>${m.Title} (${m.Year})</h4>
          </li>
          <li class="list-group-item">
            <strong>Director:</strong> ${m.Director}
          </li>
          <li class="list-group-item">
            <strong>Actors:</strong> ${m.Actors}
          </li>
          <li class="list-group-item">
            <strong>Writer:</strong> ${m.Writer}
          </li>
          <li class="list-group-item">
            <strong>Plot:</strong><br>${m.Plot}
          </li>
        </ul>
      </div>
    </div>
  </div>`;
}

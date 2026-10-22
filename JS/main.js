// let posts;
// function getAllPosts(){
//   return new Promise((callBack)=>{
//     let api = new XMLHttpRequest();
// api.open("GET", "https://jsonplaceholder.typicode.com/posts");
// api.send();

// api.addEventListener("readystatechange", function () {
//   if (api.status == 200 && api.readyState == 4) {
//     // عشان اتاكد انه الريكويست اجى صح
//     // console.log(api.response)
//     posts = JSON.parse(api.response);
//     callBack()
//     displayPosts(); //لازم نحول منjson لمصفوفة عشان اقدر اعمل for loop وكده
//      console.log(posts)

//   }
// });

//   })

// }
// function displayPosts() {
//   let data = "";
//   for (let i = 0; i < posts.length; i++) {
//     //   console.log(posts[i].title);
//     data += `
//          <div class="col-lg-4 col-md-6 col-sm-12">
//          <h2>
//          ${posts[i].title}</h2>
//          <p>${posts[i].body}</p>
//          </div>`;
//   }
//   document.querySelector(".row").innerHTML = data;
// }
// getAllPosts();
// console.log(api)

// get all movies from url using AJAX
let movies;
// function getMovies(url) {
// return new Promise((callback)=>{
//     let api = new XMLHttpRequest();
//   api.open("GET", url);
//   api.send();
//   api.addEventListener("readystatechange", function () {
//     if (api.status == 200 && api.readyState == 4) {
//       movies = JSON.parse(api.response).results;
//       callback()
//       displayMovies();
//       console.log(movies)
//     }
//   });
// })

// }
// get all movies from APIs using Fetch
async function getMovies(url) {
  try {
    let response = await fetch(url);
    let data = await response.json();
    movies = data.results;
     displayMovies();
  } catch (error) {
    console.log(error);
  }
}
// استدعينا الفانكشين بالاول عشان يعرض كل الافلام الترندي اول ما تفتح السايت
getMovies(
  "https://api.themoviedb.org/3/trending/movie/day?api_key=bd27fabd4f448617eb4ef4dd33c7b66a",
);
//فانكشن لعرض الافلام
function displayMovies() {
  let data = "";
  for (let i = 0; i < movies.length; i++) {
    // console.log(movies[i].backdrop_path)
    data += `
         <div class="col-lg-4 col-md-6 col-sm-12 d-flex flex-column">
         <div class="d-flex flex-column w-100">
                        <img 
                    src="https://image.tmdb.org/t/p/w500${movies[i].poster_path}" class='w-100'
                    alt="${movies[i].title}">
                         <h2 class='w-100'>
          ${movies[i].original_title}</h2>
          <p>${movies[i].overview.split(" ").slice(0, 15).join(" ")}</p>
          </div>
          <div class="d-flex justify-content-between w-100">
          <button class='btn btn-info py-2' onclick='movieDetailes(${movies[i].id})'>Details</button>
          <button class='btn' onclick="addToFavorites(${movies[i].id})">
${
  (JSON.parse(localStorage.getItem("favorites")) || []).some((fav) => {
    return fav.id === movies[i].id;
  })
    ? '<i class="fa-solid fa-heart text-danger"></i>'
    : '<i class="fa-regular fa-heart"></i>'
}
   
</button>
</div>
    
    </div>`;
    //  console.log(movies[i].overview.split(" ").slice(0, 15).join(" "))
  }
  document.querySelector(".row").innerHTML = data;
}
//دالة للبحث عن فيلم معين من خلال اسمه
const searchMovies = document.getElementById("searchMovies");
searchMovies.addEventListener("input", () => {
  searchMoviesFun(searchMovies.value);
});
// add to faviorites Function
function addToFavorites(id) {
  let movie = movies.find((movie) => {
    return movie.id === id;
  });
  let favoritesMovies = JSON.parse(localStorage.getItem("favorites")) || [];
  let exist = favoritesMovies.find((fav) => {
    return fav.id === id;
  });
  if (!exist) {
    favoritesMovies.push(movie);
    console.log("Movie added to favorites ❤️");
  } else {
    favoritesMovies = favoritesMovies.filter((movie) => {
      return movie.id !== id;
    });
    console.log("Movie remove from favorites");
  }
  localStorage.setItem("favorites", JSON.stringify(favoritesMovies));
  displayMovies();
}
function displayFavorites() {
  let favoritesMovies = JSON.parse(localStorage.getItem("favorites")) || [];
  let data = "";
  for (let i = 0; i < favoritesMovies.length; i++) {
    data += `
         <div class="col-lg-4 col-md-6 col-sm-12 d-flex flex-column">
         <div class="d-flex flex-column w-100">
                        <img 
                    src="https://image.tmdb.org/t/p/w500${favoritesMovies[i].poster_path}" class='w-100'
                    alt="${favoritesMovies[i].title}">
                         <h2 class='w-100'>
          ${favoritesMovies[i].original_title}</h2>
         <p>${(favoritesMovies[i].overview || "No overview available")
  .split(" ")
  .slice(0, 15)
  .join(" ")}</p>
          </div>
          <div class="d-flex justify-content-between w-100">
          <button class='btn btn-info py-2' onclick='movieDetailes(${favoritesMovies[i].id})'>Details</button>
<button class="btn" onclick="removeFavorites(${favoritesMovies[i].id})">
  <i class="fa-solid fa-heart text-danger"></i>
</button>
</div>
    
    </div>`;
    //  console.log(movies[i].overview.split(" ").slice(0, 15).join(" "))
  }
  document.querySelector(".row").innerHTML = data;
}
function removeFavorites(id) {
  let favoritesMovies = JSON.parse(localStorage.getItem("favorites")) || [];
  favoritesMovies = favoritesMovies.filter((movie) => {
    return movie.id !== id;
  });
  localStorage.setItem("favorites", JSON.stringify(favoritesMovies));
  displayFavorites();
}
async function searchMoviesFun(movie) {
  if (movie === "") {
    getMovies(
      "https://api.themoviedb.org/3/trending/movie/day?api_key=bd27fabd4f448617eb4ef4dd33c7b66a",
    );
  } else {
    let response = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=bd27fabd4f448617eb4ef4dd33c7b66a&query=${movie}`,
    );
    let data = await response.json();
    movies = data.results;

    displayMovies();
  }
}

// دالة لعرض تفاصيل الفيلم المعين
async function movieDetailes(id) {
  let movieData = "";
  document.querySelector("#movieDetails").style.display = "flex";
  let response = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=bd27fabd4f448617eb4ef4dd33c7b66a`,
  );
  let data = await response.json();
  let movieDetails = data;
  movieData += `
          <div class="details-card row g-4 align-items-center">
    <div class="col-md-5">
        <img 
            src="https://image.tmdb.org/t/p/w500${movieDetails.poster_path}" 
            class="w-100 rounded"
            alt="${movieDetails.title}"
        >
    </div>
          <div class="col-md-7 text-start">
        <h2 class="mb-3">${movieDetails.title}</h2>

        <p><strong>Overview:</strong>${movieDetails.overview}</p>

        <p><strong>Rating⭐:</strong> ${movieDetails.vote_average}</p>

        <p><strong>Release Date:</strong>${movieDetails.release_date} </p>

        <p><strong>Runtime:</strong>${movieDetails.runtime} min</p>

        <p><strong>Genres:</strong>${movieDetails.genres
          .map((genre) => {
            return genre.name;
          })
          .join(", ")}</p>
    </div>
    </div>`;
  const detailsContent = document.getElementById("detailsContent");
  detailsContent.innerHTML = movieData;
  // console.log(movieDetails.genres);
}
// console.log(`https://api.themoviedb.org/3/movie/${id}?api_key=bd27fabd4f448617eb4ef4dd33c7b66a`)

document.querySelector("#closeBtn").addEventListener("click", () => {
  document.querySelector("#movieDetails").style.display = "none";
});

document.querySelector("#home").addEventListener("click", () => {
  getMovies(
    "https://api.themoviedb.org/3/trending/movie/day?api_key=bd27fabd4f448617eb4ef4dd33c7b66a",
  );
});

document.querySelector("#popularMovies").addEventListener("click", () => {
  getMovies(
    "https://api.themoviedb.org/3/movie/popular?api_key=bd27fabd4f448617eb4ef4dd33c7b66a",
  );
});

document.querySelector("#topRatedMovies").addEventListener("click", () => {
  getMovies(
    `https://api.themoviedb.org/3/movie/top_rated?api_key=bd27fabd4f448617eb4ef4dd33c7b66a`,
  );
});
document.querySelector("#upcoming").addEventListener("click", () => {
  getMovies(
    `https://api.themoviedb.org/3/movie/upcoming?api_key=bd27fabd4f448617eb4ef4dd33c7b66a`,
  );
});
document.querySelector("#favorites").addEventListener("click", () => {
  displayFavorites();
});

// Async and await with promise
// function testFun(){
//   console.log('test')
// }
// console.log('Hello')
// // testFun()
// async function output(){
//   await getMovies(
//   "https://api.themoviedb.org/3/trending/movie/day?api_key=bd27fabd4f448617eb4ef4dd33c7b66a"
// );
// // await getAllPosts()
// testFun();
// }
// output();

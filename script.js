const API_KEY = "8ee85dfe8bd1583b6f33c83e7b52317c";

function getMovies() {
    const genre = document.getElementById("genre").value;
    fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${genre}`)
        .then(res => res.json())
        .then(data => displayMovies(data.results));
}

function getUnderrated() {
    fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&vote_average.gte=7&sort_by=vote_count.asc`)
        .then(res => res.json())
        .then(data => displayMovies(data.results));
}

function getUpcoming() {
    fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}`)
        .then(res => res.json())
        .then(data => displayMovies(data.results));
}

function getBlockbusters() {
    fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&sort_by=popularity.desc`)
        .then(res => res.json())
        .then(data => displayMovies(data.results));
}

function getInTheatres() {
    fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}`)
        .then(res => res.json())
        .then(data => displayMovies(data.results));
}

function searchMovie() {
    const q = document.getElementById("search").value;
    fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${q}`)
        .then(res => res.json())
        .then(data => displayMovies(data.results));
}

function displayMovies(movies) {
    const div = document.getElementById("movies");
    div.innerHTML = "";

    movies.forEach(movie => {
        const el = document.createElement("div");
        el.classList.add("movie");

        el.innerHTML = `
    <img src="https://image.tmdb.org/t/p/w300${movie.poster_path}" />
    <h3>${movie.title}</h3>
    <p>⭐ ${movie.vote_average}</p>
    <p class="desc">
        ${movie.overview ? movie.overview.substring(0, 100) : "No description available"}...
    </p>
            <button onclick="getTrailer(${movie.id})">▶ Trailer</button>
            <button onclick='addToFavorites(${JSON.stringify(movie)})'>❤️</button>
        `;

        div.appendChild(el);
        getPlatform(movie.id, movie.title);
    });
}

function getTrailer(id) {
    fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}`)
        .then(res => res.json())
        .then(data => {
            const trailer = data.results.find(v => v.type === "Trailer");

            if (trailer) {
                document.getElementById("trailerModal").style.display = "block";

                document.getElementById("trailerFrame").src =
                    `https://www.youtube.com/embed/${trailer.key}`;
            } else {
                alert("No trailer found 😢");
            }
        });
}

function closeTrailer() {
    document.getElementById("trailerModal").style.display = "none";
    document.getElementById("trailerFrame").src = "";
}
window.onclick = function(e) {
    const modal = document.getElementById("trailerModal");
    if (e.target === modal) {
        closeTrailer();
    }
}

function getPlatform(id, title) {
    fetch(`https://api.themoviedb.org/3/movie/${id}/watch/providers?api_key=${API_KEY}`)
        .then(r => r.json())
        .then(d => {
            const el = document.getElementById(`p-${id}`);

            if (!d.results || !d.results.IN || !d.results.IN.flatrate) {
                el.innerHTML = "<p class='not-available'>Not available</p>";
                return;
            }

            const platforms = d.results.IN.flatrate;

            const logos = {
                "Netflix": "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg",
                "Amazon Prime Video": "https://upload.wikimedia.org/wikipedia/commons/f/f1/Prime_Video.png",
                "JioHotstar": "https://upload.wikimedia.org/wikipedia/commons/1/1e/Disney%2B_Hotstar_logo.svg",
                "SonyLIV": "https://upload.wikimedia.org/wikipedia/en/0/0e/SonyLIV_logo.png",
                "ZEE5": "https://upload.wikimedia.org/wikipedia/en/8/8e/ZEE5_logo.png"
            };

            const links = {
                "Netflix": "https://www.netflix.com/search?q=",
                "Amazon Prime Video": "https://www.primevideo.com/search?phrase=",
                "JioHotstar": "https://www.hotstar.com/in/search?q=",
                "SonyLIV": "https://www.sonyliv.com/search?q=",
                "ZEE5": "https://www.zee5.com/search?q="
            };

            let logosHTML = "";
            let namesHTML = "";

            platforms.forEach(p => {
                if (logos[p.provider_name]) {
                    logosHTML += `
                        <a href="${links[p.provider_name] + encodeURIComponent(title)}" target="_blank">
                            <img src="${logos[p.provider_name]}" class="ott-logo">
                        </a>
                    `;
                    namesHTML += `<span>${p.provider_name}</span>`;
                }
            });

            el.innerHTML = `
                <div class="ott-logos">${logosHTML}</div>
                <div class="ott-names">${namesHTML}</div>
            `;
        });
}

function addToFavorites(movie) {
    let fav = JSON.parse(localStorage.getItem("favorites")) || [];
    if (!fav.find(m => m.id === movie.id)) {
        fav.push(movie);
        localStorage.setItem("favorites", JSON.stringify(fav));
        alert("Added ❤️");
    }
}
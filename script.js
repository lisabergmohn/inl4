"use strict";

const searchForm = document.getElementById("search-form");
const inputVal = document.getElementById("input-value");
const result = document.getElementById("result");
const apiKey = "41059430";
let movie = "";

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  movie = inputVal.value;

  if (movie === "") {
      result.innerHTML = "Enter movie title!";
  } else {
    getData(movie);
  }
});

async function getData(movie) {
  const url = `https://www.omdbapi.com/?apikey=${apiKey}&s=${movie}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    const movieItem = json.Search;

    if(!movieItem || movieItem === 0) {
      result.innerHTML = `No results found for ${movie}!`;
      return;
    }

    fetchMovie(movieItem);
  } catch (error) {
    console.error(error.message);
  }
}

function fetchMovie(movieItem) {
  result.innerHTML = "";
    movieItem.forEach((item) => {
      const para = document.createElement("p");
      para.textContent = `🟡 ${item.Title}: (${item.Year})`;
      result.appendChild(para);
    });
}

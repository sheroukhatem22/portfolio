// =========================
// Part 1: Get Elements from the Page
// =========================
let searchBtn = document.getElementById("search-btn");
let countryInp = document.getElementById("country-inp");
let result = document.getElementById("result");

// =========================
// Part 2: Handle Button Click
// =========================
searchBtn.addEventListener("click", () => {
  let countryName = countryInp.value.trim();

  // Check if input is empty
  if (countryName.length === 0) {
    result.innerHTML = `<h3>The input field cannot be empty</h3>`;
    return;
  }

  // =========================
  // Part 3: Build API URL and Fetch Data
  // =========================
  let finalURL = `https://restcountries.com/v3.1/name/${countryName}`;
  console.log(finalURL); // Debugging

  fetch(finalURL)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Country not found");
      }
      return response.json();
    })

    // =========================
    // Part 4: Process and Organize Country Data
    // =========================
    .then((data) => {
      let country = data[0];

      let flag = country.flags?.svg || "";
      let name = country.name?.common || "N/A";
      let capital = country.capital?.[0] || "N/A";
      let continent = country.continents?.[0] || "N/A";
      let population = country.population?.toLocaleString() || "N/A";

      let currencyKey = Object.keys(country.currencies || {})[0];
      let currency = currencyKey
        ? `${country.currencies[currencyKey].name} - ${currencyKey}`
        : "N/A";

      let languages = country.languages
        ? Object.values(country.languages).join(", ")
        : "N/A";

      // =========================
      // Part 5: Display the Result on the Page
      // =========================
      result.innerHTML = `
        <img src="${flag}" class="flag-img" />
        <h2>${name}</h2>

        <div class="wrapper">
          <div class="data-wrapper">
            <h4>Capital:</h4>
            <span>${capital}</span>
          </div>
        </div>

        <div class="wrapper">
          <div class="data-wrapper">
            <h4>Continent:</h4>
            <span>${continent}</span>
          </div>
        </div>

        <div class="wrapper">
          <div class="data-wrapper">
            <h4>Population:</h4>
            <span>${population}</span>
          </div>
        </div>

        <div class="wrapper">
          <div class="data-wrapper">
            <h4>Currency:</h4>
            <span>${currency}</span>
          </div>
        </div>

        <div class="wrapper">
          <div class="data-wrapper">
            <h4>Common Languages:</h4>
            <span>${languages}</span>
          </div>
        </div>
      `;
    })

    // =========================
    // Part 6: Handle Errors Gracefully
    // =========================
    .catch((error) => {
      console.error(error); // Show error in the console
      result.innerHTML = `<h3>Please enter a valid country name.</h3>`;
    });
});

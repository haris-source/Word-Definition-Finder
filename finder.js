document.getElementById("searchBtn").addEventListener("click", getDefinition);

function getDefinition() {
  const word = document.getElementById("searchInput").value.trim();
  const resultDiv = document.getElementById("result");

  if (word === "") {
    resultDiv.style.display = "block"; // show box
    resultDiv.innerHTML = "<p>Please enter a word.</p>";
    return;
  }

  resultDiv.style.display = "block"; // show box once searching
  resultDiv.innerHTML = "<p>Loading...</p>";

  fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
    .then(response => response.json())
    .then(data => {
      if (data.title === "No Definitions Found") {
        resultDiv.innerHTML = `<p>No definition found for <b>${word}</b>.</p>`;
      } else {
        const meanings = data[0].meanings
          .map(
            meaning =>
              `<div>
                <h3>${meaning.partOfSpeech}</h3>
                <p>${meaning.definitions[0].definition}</p>
              </div>`
          )
          .join("<hr/>");

        resultDiv.innerHTML = `
          <h2>Word: ${data[0].word}</h2>
          ${meanings}
        `;
      }
    })
    .catch(error => {
      resultDiv.innerHTML = "<p>Error fetching definition. Try again.</p>";
      console.error(error);
    });
}

let lastScrollTop = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener("scroll", function() {
  let currentScroll = window.pageYOffset || document.documentElement.scrollTop;

  if (currentScroll > lastScrollTop) {
    // scrolling down → hide navbar
    navbar.style.top = "-80px";  // adjust based on navbar height
  } else {
    // scrolling up → show navbar
    navbar.style.top = "0";
  }

if (currentScroll <= 0) {
  lastScrollTop = 0;
} else {
  lastScrollTop = currentScroll;
}
});

function generateQuote() {
  const themeSelect = document.getElementById("themeSelect");
  const selectedTheme = themeSelect.value;

  // Make a request to the backend to get a quote
  fetch(`/quote?theme=${selectedTheme}`)
    .then((response) => response.json())
    .then((data) => {
      const quoteContainer = document.getElementById("quoteContainer");
      quoteContainer.innerText = data.quote;
    })
    .catch((error) => {
      console.error("Error fetching quote:", error);
    });
}

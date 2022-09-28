const selectElement = (selector) => {
    const element = document.querySelector(selector);
    if (element) return element;
    throw new Error(`Cannot find the element ${selector}`);
  };

let form = document.getElementById("form")
let input = document.getElementById("urlInput")
const result = selectElement(".result");
const shortLink = document.getElementById("shortLink")
// var urlBtn = document.getElementById("urlBtn")

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const url = input.value;
    shortenUrl(url);
  });

  async function shortenUrl(url) {
    try {
      const res = await fetch(`https://api.shrtco.de/v2/shorten?url=${url}`);
      const data = await res.json();
      shortLink.innerText = data.result.short_link;
      const copyBtn = document.getElementById("copyBtn");
      copyBtn.addEventListener("click", () => {
        navigator.clipboard.writeText(copyBtn.previousElementSibling.textContent);
      });
      input.value = "";
    } catch (err) {
      console.log(err);
    }
  }
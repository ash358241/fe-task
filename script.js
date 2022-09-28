const selectElement = (selector) => {
    const element = document.querySelector(selector);
    if (element) return element;
    throw new Error(`Cannot find the element ${selector}`);
  };

let form = document.getElementById("form")
let input = document.getElementById("urlInput")

const formTwo = document.getElementById("formTwo");
const inputTwo = document.getElementById("urlTwo");

const result = selectElement(".result");
const shortLink = document.getElementById("shortLink")
const longLink = document.getElementById("longLink")
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





  formTwo.addEventListener("submit", (e) => {
    e.preventDefault();
    const url = inputTwo.value;
    const code = url.split("/")[1]
    expandUrl(code);
  });

  async function expandUrl(code) {
    try {
      const res = await fetch(`https://api.shrtco.de/v2/info?code=${code}`);
      const data = await res.json();
      console.log(data);
      longLink.innerText = data.result.url;
      const copyBtnTwo = document.getElementById("copyBtnTwo");
      copyBtnTwo.addEventListener("click", () => {
        navigator.clipboard.writeText(copyBtnTwo.previousElementSibling.textContent);
      });
      inputTwo.value = "";
    } catch (err) {
      console.log(err);
    }
  }


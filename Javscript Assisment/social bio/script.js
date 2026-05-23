// ======================
// 📌 DOM
// ======================
const form = document.getElementById("linkForm");
const titleInput = document.getElementById("title");
const urlInput = document.getElementById("url");
const errorEl = document.getElementById("error");
const preview = document.getElementById("preview");
const themeToggle = document.getElementById("themeToggle");

// ======================
// 📌 DATA
// ======================
let links = JSON.parse(localStorage.getItem("links")) || [];
let theme = localStorage.getItem("theme") || "dark";

// ======================
// 📌 URL VALIDATION
// ======================
function isValidURL(url) {
  const pattern = /^https:\/\/[^\s]+$/;
  return pattern.test(url);
}

// ======================
// 📌 SAVE
// ======================
function saveLinks() {
  localStorage.setItem("links", JSON.stringify(links));
}

function saveTheme() {
  localStorage.setItem("theme", theme);
}

// ======================
// 📌 RENDER LINKS
// ======================
function renderLinks() {
  preview.innerHTML = "";

  links.forEach((link, index) => {
    const div = document.createElement("div");
    div.className = "link-card";

    div.innerHTML = `
      <a href="${link.url}" target="_blank">${link.title}</a>
      <button class="remove" data-index="${index}">✖</button>
    `;

    preview.appendChild(div);
  });
}

// ======================
// 📌 ADD LINK
// ======================
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const title = titleInput.value.trim();
  const url = urlInput.value.trim();

  if (!title || !url) {
    errorEl.textContent = "All fields are required";
    return;
  }

  if (!isValidURL(url)) {
    errorEl.textContent = "Enter valid URL (https://...)";
    return;
  }

  errorEl.textContent = "";

  links.push({ title, url });

  saveLinks();
  renderLinks();
  form.reset();
});

// ======================
// 📌 DELETE LINK
// ======================
preview.addEventListener("click", (e) => {
  if (e.target.classList.contains("remove")) {
    const index = e.target.dataset.index;

    links.splice(index, 1);
    saveLinks();
    renderLinks();
  }
});

// ======================
// 📌 THEME TOGGLE
// ======================
function applyTheme() {
  if (theme === "light") {
    document.body.classList.add("light");
    themeToggle.textContent = "🌞";
  } else {
    document.body.classList.remove("light");
    themeToggle.textContent = "🌙";
  }
}

themeToggle.addEventListener("click", () => {
  theme = theme === "dark" ? "light" : "dark";
  saveTheme();
  applyTheme();
});

// ======================
// 📌 INIT
// ======================
applyTheme();
renderLinks();
"use script";
const siteNameInput = document.querySelector(".site-name");
const siteURLInput = document.querySelector(".site-url");
const form = document.querySelector("form");
const submitBtn = document.querySelector(".submit-btn");
const table = document.querySelector("table");
const inValidNameElem = document.querySelector(".invalid-name");
const inValidURLElem = document.querySelector(".invalid-url");
let sites;

if (!localStorage.getItem("mySites")) {
  sites = [];
} else {
  sites = JSON.parse(localStorage.getItem("mySites"));
  addToTable(sites);
}

form.addEventListener("submit", function (e) {
  e.preventDefault();
  createNewObject();
});

function createNewObject() {
  let siteName = siteNameInput.value;
  let siteURL = siteURLInput.value;
  let site = {
    name: siteName,
    url: siteURL,
  };
  console.log(validateNameInput(sites, site));
  if (validateNameInput(sites, site) === true) {
    siteNameInput.classList.remove("is-invalid");
    siteURLInput.classList.remove("is-invalid");
    sites.push(site);
    addToTable(sites);
    updateLocalStorage();
    clearForm();
  } else if (validateNameInput(sites, site) === "required name") {
    siteNameInput.classList.add("is-invalid");
    inValidNameElem.innerHTML = "this name field is reuired";
  } else if (validateNameInput(sites, site) === "required url") {
    siteNameInput.classList.remove("is-invalid");
    inValidNameElem.innerHTML = "";
    siteURLInput.classList.add("is-invalid");
    inValidURLElem.innerHTML = "this URL field is reuired";
  } else {
    siteNameInput.classList.add("is-invalid");
    inValidNameElem.innerHTML = "this name already exists";
    siteURLInput.classList.remove("is-invalid");
    inValidURLElem.innerHTML = "";
  }
}

function addToTable(sites) {
  let container = "";

  for (let i = 0; i < sites.length; i++) {
    container += `<tr>
    <td>${sites[i].name}</td>
    <td>
      <a href="#" class="btn btn-primary" target="_blank" onclick="visitSite('${sites[i].url}')">Visit</a>
    </td>
    <td>
      <button class="btn btn-danger" onclick="deleteSite(${i})">Delete</button>
    </td>
  </tr>`;
  }

  table.innerHTML = container;
}

function deleteSite(index) {
  sites.splice(index, 1);
  updateLocalStorage();
  addToTable(sites);
}

function visitSite(url) {
  window.open(url);
}

function clearForm() {
  siteNameInput.value = "";
  siteURLInput.value = "";
}

function updateLocalStorage() {
  localStorage.setItem("mySites", JSON.stringify(sites));
}

function validateNameInput(sites, { name, url }) {
  if (name === "") return "required name";

  if (url === "") return "required url";

  for (let i = 0; i < sites.length; i++) {
    if (sites[i].name !== name) continue;
    else {
      return false;
    }
  }

  return true;
}

import { Medicine } from "./medicine.js";


const allProducts = [];


//BUTTONS
const addItemButton = document.querySelector(".add-and-search__addItem");
const closeOverlayButton = document.querySelector(".close-overlay-button");
const saveButton = document.querySelector(".save-button");
const cancleButton = document.querySelector(".cancel-button");

// CONTAINERS
const editPage = document.querySelector(".edit-page");
const listContainer = document.querySelector(".list");

// INPUTS
const nameInput = document.querySelector(".name");
const manufacturerInput = document.querySelector(".manufacturer");
const idInput = document.querySelector(".id");
const expirationInput = document.querySelector(".expiration");
const stockInput = document.querySelector(".stock");

const searchInput = document.querySelector(".search");

// EVENT LISTENERS
addItemButton.addEventListener("click", ()=> {
	editPage.style.display = "block";
	listContainer.style.display = "none"

});

closeOverlayButton.addEventListener("click", ()=> {
	editPage.style.display = "none";
	listContainer.style.display = "flex";
});

saveButton.addEventListener("click", (event)=> {
	event.preventDefault();
	const newMedicine = new Medicine(nameInput.value, manufacturerInput.value, idInput.value, expirationInput.value, stockInput.value);
	Medicine.addMedicine(newMedicine);
	console.log(window.localStorage.allProducts);
})





// EXPORTS
export default allProducts;
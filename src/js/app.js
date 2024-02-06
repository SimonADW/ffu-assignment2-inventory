import { Medicine } from "./medicine.js";


const allProducts = [];


// BUTTONS
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


// FORM VALIDATION
const validateForm = ()=> {
	const iso8601Regex = /^(\d{4})-(\d{2})-(\d{2})$/;

	if (nameInput.value === "") {
		document.querySelector(".name-error").style.display = "block";
		nameInput.focus()
	}	
	if (manufacturerInput.value === "") {
		document.querySelector(".manufacturer-error").style.display = "block";
		manufacturerInput.focus();
	}	
	if (idInput.value === "") {
		document.querySelector(".id-error").style.display = "block";
		idInput.focus();
	}	
	if (expirationInput.value === "" || !iso8601Regex.test(expirationInput.value)) {
		document.querySelector(".expiration-error").style.display = "block";
		expirationInput.focus();
	}	
	if (stockInput.value === "") {
		document.querySelector(".stock-error").style.display = "block";
		stockInput.focus();
	}			
};

nameInput.addEventListener("keydown", ()=> {
	document.querySelector(".name-error").style.display = "none";
})
manufacturerInput.addEventListener("keydown", ()=> {
	document.querySelector(".manufacturer-error").style.display = "none";
})
idInput.addEventListener("keydown", ()=> {
	document.querySelector(".id-error").style.display = "none";
})
expirationInput.addEventListener("keydown", ()=> {
	document.querySelector(".expiration-error").style.display = "none";
})
stockInput.addEventListener("keydown", ()=> {
	document.querySelector(".stock-error").style.display = "none";
})



// EVENT LISTENERS
addItemButton.addEventListener("click", ()=> {
	editPage.style.display = "block";
	listContainer.style.display = "none"
});

closeOverlayButton.addEventListener("click", ()=> {
	editPage.style.display = "none";
	listContainer.style.display = "flex";
});

// SAVE NEW MEDICINE
saveButton.addEventListener("click", (event)=> {
	event.preventDefault();
	validateForm();
	const newMedicine = new Medicine(nameInput.value, manufacturerInput.value, idInput.value, expirationInput.value, stockInput.value);
	Medicine.addMedicine(newMedicine);
	console.log(window.localStorage.allProducts);
})



// EXPORTS
export default allProducts;
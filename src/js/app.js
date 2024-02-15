import { Medicine, Capsule, Syrup } from "./medicine.js";
import {renderList} from "./renderList.js"

export const allProducts = getMedicineFromLocaleStorage();



// BUTTONS
const addItemButton = document.querySelector(".add-and-search__addItem");
const closeOverlayButton = document.querySelector(".close-overlay-button");
const saveButton = document.querySelector(".save-button");
const cancelButton = document.querySelector(".cancel-button");
export const confirmDelete = document.querySelector(".confirm-delete");
export const cancelDelete = document.querySelector(".cancel-delete")



// CONTAINERS
const editPage = document.querySelector(".edit-page");
export const listContainer = document.querySelector(".list");
const myForm = document.querySelector("form");
const confirmSaveContainer = document.querySelector(".save-confirmation");
export const confirmDeleteMessage = document.querySelector(".confirm-delete-message");

// INPUTS
const nameInput = document.querySelector(".name");
const manufacturerInput = document.querySelector(".manufacturer");
const expirationInput = document.querySelector(".expiration");
const stockInput = document.querySelector(".stock");
const prescriptionInput = document.querySelector(".prescription");
const dosageForm = document.querySelector(".dosage-form")
const dosagePcs = document.querySelector(".dosage-pcs")
const dosageMillilitres = document.querySelector(".dosage-ml")

const searchInput = document.querySelector(".search");


// DISABLE DOSAGE INPUT
dosageForm.addEventListener("change", ()=> {
	if(dosageForm.value === "Syrup") {
		dosageMillilitres.removeAttribute("Disabled");
		dosagePcs.setAttribute("Disabled", "Disabled");
	} else {
		dosageMillilitres.setAttribute("Disabled", "Disabled");
		dosagePcs.removeAttribute("Disabled");
	};
});

// FORM VALIDATION
const validateForm = ()=> {
	const iso8601Regex = /^(\d{4})-(\d{2})-(\d{2})$/;

	if (nameInput.value === "") {
		document.querySelector(".name-error").style.display = "block";
		nameInput.focus()
		return false
	}	
	if (manufacturerInput.value === "") {
		document.querySelector(".manufacturer-error").style.display = "block";
		manufacturerInput.focus();
		return false
	}	
	// CHECK FOR ISO8601 DATE FORMAT
	if (expirationInput.value === "" || !iso8601Regex.test(expirationInput.value)) {
		document.querySelector(".expiration-error").style.display = "block";
		expirationInput.focus();
		return false
	}	
	if (stockInput.value === "") {
		document.querySelector(".stock-error").style.display = "block";
		stockInput.focus();
		return false
	}		
	return true;	
};

nameInput.addEventListener("keydown", ()=> {
	document.querySelector(".name-error").style.display = "none";
})
manufacturerInput.addEventListener("keydown", ()=> {
	document.querySelector(".manufacturer-error").style.display = "none";
})
expirationInput.addEventListener("keydown", ()=> {
	document.querySelector(".expiration-error").style.display = "none";
})
stockInput.addEventListener("keydown", ()=> {
	document.querySelector(".stock-error").style.display = "none";
})

const closeEditPage = ()=> {
	myForm.reset();
	editPage.style.display = "none";
	listContainer.style.display = "flex";
}


// EVENT LISTENERS
addItemButton.addEventListener("click", ()=> {
	editPage.style.display = "block";
	listContainer.style.display = "none"
	nameInput.focus()
});

closeOverlayButton.addEventListener("click", closeEditPage);
cancelButton.addEventListener("click", closeEditPage);

// DISPLAY SAVE CONFIRMATION MESSAGE
const displaySaveConfirmation = (medicineName)=> {
	confirmSaveContainer.textContent = `${medicineName} added to inventory ✔︎`
	confirmSaveContainer.style.display = "flex";		
	setTimeout(()=>{
		confirmSaveContainer.style.display = "none";		
	}, 3000)
}


// SAVE NEW MEDICINE
saveButton.addEventListener("click", (event)=> {
	event.preventDefault();
	if (validateForm()) {
		if (dosageForm.value === "Capsule") {
			const newMedicine = new Capsule(nameInput.value, manufacturerInput.value, expirationInput.value, stockInput.value, prescriptionInput.checked, dosageForm.value, dosagePcs.value);
			Medicine.addMedicine(newMedicine);
		} else if(dosageForm.value === "Syrup") {
			const newMedicine = new Syrup(nameInput.value, manufacturerInput.value, expirationInput.value, stockInput.value, prescriptionInput.checked, dosageForm.value, dosageMillilitres.value);
			Medicine.addMedicine(newMedicine);
		} else {
			const newMedicine = new Medicine(nameInput.value, manufacturerInput.value, expirationInput.value, stockInput.value, prescriptionInput.checked, dosageForm.value);
			Medicine.addMedicine(newMedicine);
		}

		displaySaveConfirmation(nameInput.value);
		closeEditPage();
		renderList(getMedicineFromLocaleStorage());
	}
})


// GET ALL MEDICINES ARRAY
export function getMedicineFromLocaleStorage() {
	const medicineArrayJSON = window.localStorage.getItem("allProducts");
	const allProducts = JSON.parse(medicineArrayJSON) || []; // RETURNS AN EMPTY ARRAY IF JSON RETURNS NULL
	return allProducts;
};

// DEFAULT LIST CONTENT
console.log(allProducts);
renderList(getMedicineFromLocaleStorage());


// EXPORTS

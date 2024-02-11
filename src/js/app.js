import { Medicine, PrescriptionMedicine } from "./medicine.js";
import {renderList} from "./renderList.js"

export const allProducts = getMedicineFromLocaleStorage();



// BUTTONS
const addItemButton = document.querySelector(".add-and-search__addItem");
const closeOverlayButton = document.querySelector(".close-overlay-button");
const saveButton = document.querySelector(".save-button");
const cancelButton = document.querySelector(".cancel-button");
const generateIDButton = document.querySelector(".generateID");

// CONTAINERS
const editPage = document.querySelector(".edit-page");
export const listContainer = document.querySelector(".list");
const myForm = document.querySelector("form");
const confirmSaveContainer = document.querySelector(".save-confirmation");

// INPUTS
const nameInput = document.querySelector(".name");
const manufacturerInput = document.querySelector(".manufacturer");
const idInput = document.querySelector(".id");
const expirationInput = document.querySelector(".expiration");
const stockInput = document.querySelector(".stock");
const prescriptionInput = document.querySelector(".prescription");

const searchInput = document.querySelector(".search");

// UNIQUE ID 
const generateAndDisplayID = ()=> {
	const currentID = Date.now()
	idInput.value = currentID;	
}

//@TODO FIX UNIQUE CHECK
const checkIDIsUnique = (currentId) => {
    for (const product of allProducts) {
        if (currentId === product.id) {
            return false; // If currentId is found in any product's ID, it's not unique
        }
    }
    return true; // If currentId is not found in any product's ID, it's unique
}

generateIDButton.addEventListener("click", (event)=>{
	event.preventDefault();
	generateAndDisplayID();
})
	

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
	// CHECK FOR UNIQUE ID
	if (idInput.value === "" || !checkIDIsUnique(idInput.value)) {
		document.querySelector(".id-error").style.display = "block";
		idInput.focus();
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
idInput.addEventListener("keydown", ()=> {
	document.querySelector(".id-error").style.display = "none";
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
		if (prescriptionInput.checked) {
			const newMedicine = new PrescriptionMedicine(nameInput.value, manufacturerInput.value, idInput.value, expirationInput.value, stockInput.value, true);
			Medicine.addMedicine(newMedicine);
		} else {
			const newMedicine = new Medicine(nameInput.value, manufacturerInput.value, idInput.value, expirationInput.value, stockInput.value);
			Medicine.addMedicine(newMedicine);
		}

		displaySaveConfirmation(nameInput.value);
		closeEditPage();
		renderList(getMedicineFromLocaleStorage());
	}
})

// GET ALL MEDICINES ARRAY
function getMedicineFromLocaleStorage() {
	const medicineArrayJSON = window.localStorage.getItem("allProducts");
	const allProducts = JSON.parse(medicineArrayJSON) || []; // RETURNS AN EMPTY ARRAY IF JSON RETURNS NULL
	return allProducts;
};

// DEFAULT LIST CONTENT

renderList(getMedicineFromLocaleStorage());

// EXPORTS

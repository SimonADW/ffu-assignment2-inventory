
// BUTTONS
const addItemButton = document.querySelector(".add-and-search__addItem");
const closeOverlayButton = document.querySelector(".close-overlay-button");
const saveButton = document.querySelector(".save-button");
const cancelButton = document.querySelector(".cancel-button");
const confirmDelete = document.querySelector(".confirm-delete");
const cancelDelete = document.querySelector(".cancel-delete")

// CONTAINERS
const editPage = document.querySelector(".edit-page");
const listContainer = document.querySelector(".list");
const myForm = document.querySelector("form");
const confirmSaveContainer = document.querySelector(".save-confirmation");
const confirmDeleteMessage = document.querySelector(".confirm-delete-message");

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

// EDIT MODE
let currentMedicineIndex;
let editMode = false;

// MEDICINE - CONSTRUCTOR, ADD, DELETE
class Medicine {
	constructor(name, manufacturer, expiration, qty, prescription, dosageForm){
		this.name = name
		this.manufacturer = manufacturer
		this.id = Date.now()
		this.expiration = expiration
		this.qty = qty
		this.prescription = prescription
		this.dosageForm = dosageForm
	};

	static getMedicineFromLocaleStorage() {
		const medicineArrayJSON = window.localStorage.getItem("allProducts");
		const allProducts = JSON.parse(medicineArrayJSON) || []; // RETURNS AN EMPTY ARRAY IF JSON RETURNS NULL
		return allProducts;
	};

	static addMedicine(medicine){
		if(editMode){		
			allProducts.splice(currentMedicineIndex, 1, medicine);
			window.localStorage.setItem("allProducts", JSON.stringify(allProducts));			
		} else {
			allProducts.push(medicine);
			window.localStorage.setItem("allProducts", JSON.stringify(allProducts));		
		}
	};

	static deleteMedicine(ID, productsArray){
		const index = productsArray.findIndex(product => product.id.toString() === ID.toString());
		if(index !== -1) {
			allProducts.splice(index, 1);
			window.localStorage.setItem("allProducts", JSON.stringify(allProducts));
			ListUI.renderList(Medicine.getMedicineFromLocaleStorage());
		};
	};

	static openEditMedicineTab(ID, productsArray) {		
		currentMedicineIndex = productsArray.findIndex(product => product.id.toString() === ID.toString());
		if(currentMedicineIndex !== -1) {
			const currentObject = allProducts[currentMedicineIndex];
			editPage.style.display = "block";
			listContainer.style.display = "none"

			nameInput.value = currentObject.name;
			manufacturerInput.value = currentObject.manufacturer;
			expirationInput.value = currentObject.expiration;
			stockInput.value = currentObject.qty;			
			if(currentObject.prescription) {
				prescriptionInput.checked = true;
			}
			if(currentObject.dosageForm === "capsule"){				
				dosageForm.value = "capsule";
				dosagePcs.value = Number(currentObject.dosagePcs);
			} else if(currentObject.dosageForm === "syrup") {				
				dosageForm.value = "syrup";
				dosageMillilitres.removeAttribute("Disabled");
				dosagePcs.setAttribute("Disabled", "Disabled");
				dosageMillilitres.value = Number(currentObject.dosageMl);
			}

			nameInput.focus()
		};				
	};

	static updateEditedMedicine(medicine, index) {
		
	};
};

class Capsule extends Medicine {
	constructor(name, manufacturer, expiration, qty, prescription, dosageForm, dosagePcs) {
		super(name, manufacturer, expiration, qty, prescription, dosageForm)
		this.dosagePcs = dosagePcs
	};
};

class Syrup extends Medicine {
	constructor(name, manufacturer, expiration, qty, prescription, dosageForm, dosageMl) {
		super(name, manufacturer, expiration, qty, prescription, dosageForm)
		this.dosageMl = dosageMl
	};
};

const allProducts = Medicine.getMedicineFromLocaleStorage();


// RENDER LIST
class ListUI {
	 static renderList(arrayOfProducts) {
		listContainer.textContent = "";
		arrayOfProducts.forEach((product, index)=> {
			// CREATE CONTAINERS
			const listItem = document.createElement("li");

			const itemNr = document.createElement("span");
			const name = document.createElement("span");
			const manufacturer = document.createElement("span");
			const stock = document.createElement("span");
			const expiration = document.createElement("span");
			const dosage = document.createElement("span");
			const actions = document.createElement("span");
			const deleteButton = document.createElement("button");
			const editButton = document.createElement("button");
				
			// APPEND SPANS
			listContainer.append(listItem);
			listItem.append(itemNr, name, manufacturer, stock, expiration, dosage, actions);
			actions.append(editButton, deleteButton);
	
			// ADD CLASSES
			listItem.className = "list__item grid";

			name.className = "list__item__content column--2 name";
			manufacturer.className = "list__item__content column--2 manufacturer";
			itemNr.className = "list__item__content column--1 id";
			expiration.className = "list__item__content column--2 expiration";
			dosage.className = "list__item__content column--1 expiration";
			stock.className = "list__item__content column--1 qty";

			actions.className = "list__item__content column--3 actions";
			editButton.className = "list__item__content__edit";
			deleteButton.className = "list__item__content__delete";


			// Add DATASET/ID
			listItem.dataset.id = product.id;

			// DELETE MEDICINE
			deleteButton.addEventListener("click", (event)=> {
					const listID = 	event.currentTarget.parentElement.parentElement.dataset.id;
					confirmDeleteMessage.style.display = "flex";
					confirmDelete.addEventListener("click", ()=> {
						Medicine.deleteMedicine(listID, allProducts);
						confirmDeleteMessage.style.display = "none";
					});
					cancelDelete.addEventListener("click", ()=>{
						confirmDeleteMessage.style.display = "none";
					});
			});

			// OPEN EDIT MEDICINE TAB
			editButton.addEventListener("click", (event)=> {
				editMode = true;
				const listID = 	event.currentTarget.parentElement.parentElement.dataset.id;
				Medicine.openEditMedicineTab(listID, allProducts);				
			})

			// ADD CONTENT
			itemNr.textContent = index +1;
			name.textContent = product.name;
			manufacturer.textContent = product.manufacturer;
			if(product.dosageForm === "capsule") {
				dosage.textContent = `${product.dosagePcs} pcs`
			} else {
				dosage.textContent = `${product.dosageMl} ml`
			}
			expiration.textContent = product.expiration;
			stock.textContent = product.qty;

			editButton.textContent = "Edit";
			deleteButton.textContent = "Delete";
		});
	};
};

class Form {	
	// FORM VALIDATION
	static validateForm() {
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

	static closeEditPage() {
		myForm.reset();
		editPage.style.display = "none";
		listContainer.style.display = "flex";
	}

	// DISPLAY SAVE CONFIRMATION MESSAGE
	static displaySaveConfirmation(medicineName) {
		if(editMode) {
			confirmSaveContainer.textContent = `${medicineName} updated ✔︎`
			confirmSaveContainer.style.display = "flex";		
			editMode = false;
		} else {
			confirmSaveContainer.textContent = `${medicineName} added to inventory ✔︎`
			confirmSaveContainer.style.display = "flex";		
		}
		setTimeout(()=>{
			confirmSaveContainer.style.display = "none";		
		}, 3000)
}
}

// EVENT LISTENERS ---------------------------------------------------
addItemButton.addEventListener("click", ()=> {
	editPage.style.display = "block";
	listContainer.style.display = "none"
	nameInput.focus()
});

closeOverlayButton.addEventListener("click", Form.closeEditPage);
cancelButton.addEventListener("click", Form.closeEditPage);

	// DISABLE DOSAGE INPUT
dosageForm.addEventListener("change", ()=> {
	if(dosageForm.value === "syrup") {
		dosageMillilitres.value = 1;
		dosagePcs.value = "";
		dosageMillilitres.removeAttribute("Disabled");
		dosagePcs.setAttribute("Disabled", "Disabled");
	} else if(dosageForm.value === "capsule") {
		dosagePcs.value = 1;
		dosageMillilitres.value = "";
		dosageMillilitres.setAttribute("Disabled", "Disabled");
		dosagePcs.removeAttribute("Disabled");
	};
});

	//FORM INPUTS
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

	// SAVE NEW MEDICINE
saveButton.addEventListener("click", (event)=> {
	event.preventDefault();

	if (Form.validateForm()) {
		if (dosageForm.value === "capsule") {
			const newMedicine = new Capsule(nameInput.value, manufacturerInput.value, expirationInput.value, stockInput.value, prescriptionInput.checked, dosageForm.value, dosagePcs.value);
			Medicine.addMedicine(newMedicine);
		} else if(dosageForm.value === "syrup") {
			const newMedicine = new Syrup(nameInput.value, manufacturerInput.value, expirationInput.value, stockInput.value, prescriptionInput.checked, dosageForm.value, dosageMillilitres.value);
			Medicine.addMedicine(newMedicine);
		} else {
			const newMedicine = new Medicine(nameInput.value, manufacturerInput.value, expirationInput.value, stockInput.value, prescriptionInput.checked, dosageForm.value);
			Medicine.addMedicine(newMedicine);
		}

		Form.displaySaveConfirmation(nameInput.value);
		Form.closeEditPage();
		ListUI.renderList(Medicine.getMedicineFromLocaleStorage());
	}
})

// RENDER LIST CONTENT ON PAGE LOAD
ListUI.renderList(Medicine.getMedicineFromLocaleStorage());
console.log(allProducts);


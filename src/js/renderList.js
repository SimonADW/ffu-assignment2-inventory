import { allProducts, listContainer, confirmDeleteMessage, confirmDelete, cancelDelete } from "./app.js";
import { Medicine } from "./medicine.js";


export const renderList = (arrayOfProducts)=> {
	listContainer.textContent = "";
	arrayOfProducts.forEach((product, index)=> {
		// CREATE CONTAINERS
		const listItem = document.createElement("div");

		const itemNr = document.createElement("span");
		const name = document.createElement("span");
		const manufacturer = document.createElement("span");
		const stock = document.createElement("span");
		const expiration = document.createElement("span");
		const actions = document.createElement("span");
		const deleteButton = document.createElement("button");
		const editButton = document.createElement("button");
		const chevron = document.createElement("button");
		const chevronIcon = document.createElement("i");
		
		// APPEND SPANS
		listContainer.append(listItem);
		listItem.append(itemNr, name, manufacturer, stock, expiration, actions);
		actions.append(editButton, deleteButton, chevron);
		chevron.append(chevronIcon);

		// ADD CLASSES
		listItem.className = "list__item grid";

		name.className = "list__item__content column--3 name";
		manufacturer.className = "list__item__content column--3 manufacturer";
		itemNr.className = "list__item__content column--1 id";
		expiration.className = "list__item__content column--1 expiration";
		stock.className = "list__item__content column--1 qty";

		actions.className = "list__item__content column--3 actions";
		editButton.className = "list__item__content__edit";
		deleteButton.className = "list__item__content__delete";
		chevron.className = "chevron"
		chevronIcon.classList = "fa-solid fa-chevron-down"

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



		// ADD CONTENT
		itemNr.textContent = index +1;
		name.textContent = product.name;
		manufacturer.textContent = product.manufacturer;
		expiration.textContent = product.expiration;
		stock.textContent = product.qty;

		editButton.textContent = "Edit";
		deleteButton.textContent = "Delete";
	});

	
}
import { allProducts, listContainer } from "./app.js";
import { Medicine } from "./medicine.js";


export const renderList = (arrayOfProducts)=> {
	listContainer.textContent = ""
	arrayOfProducts.forEach(product => {
		// CREATE CONTAINERS
		const listItem = document.createElement("div");

		const stock = document.createElement("span");
		const name = document.createElement("span");
		const manufacturer = document.createElement("span");
		const id = document.createElement("span");
		const expiration = document.createElement("span");
		const actions = document.createElement("span");
		const deleteButton = document.createElement("button");
		const editButton = document.createElement("button");
		const chevron = document.createElement("button");
		const chevronIcon = document.createElement("i");
		
		// APPEND SPANS
		listContainer.append(listItem);
		listItem.append(stock, name, manufacturer, id, expiration, actions);
		actions.append(editButton, deleteButton, chevron);
		chevron.append(chevronIcon);

		// ADD CLASSES
		listItem.className = "list__item grid";

		name.className = "list__item__content column--3 name";
		manufacturer.className = "list__item__content column--2 manufacturer";
		id.className = "list__item__content column--2 id";
		expiration.className = "list__item__content column--1 expiration";
		stock.className = "list__item__content column--1 qty";

		actions.className = "list__item__content column--3 actions";
		editButton.className = "list__item__content__edit";
		deleteButton.className = "list__item__content__delete";
		chevron.className = "chevron"
		chevronIcon.classList = "fa-solid fa-chevron-down"

		// Add DATASET/ID
		listItem.dataset.id = product.id;

		// // DELETE MEDICINE
		deleteButton.addEventListener("click", (event)=> {
				const listID = 	event.currentTarget.parentElement.parentElement.dataset.id
				console.log(listID);
				Medicine.deleteMedicine(listID, allProducts);
		});



		// ADD CONTENT
		name.textContent = product.name;
		manufacturer.textContent = product.manufacturer;
		id.textContent = product.id;
		expiration.textContent = product.expiration;
		stock.textContent = product.qty;

		editButton.textContent = "Edit";
		deleteButton.textContent = "Delete";
	});

	
}
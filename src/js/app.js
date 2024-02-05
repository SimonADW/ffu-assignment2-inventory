//BUTTONS
const addItemButton = document.querySelector(".add-and-search__addItem");
const closeOverlayButton = document.querySelector(".close-overlay-button");

// CONTAINERS
const editPage = document.querySelector(".edit-page");

// EVENT LISTENERS

addItemButton.addEventListener("click", ()=> {
	editPage.style.display = "block";
})

closeOverlayButton.addEventListener("click", ()=> {
	editPage.style.display = "none";
})


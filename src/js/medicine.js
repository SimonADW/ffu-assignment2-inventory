import allProducts from "./app.js"

export class Medicine {
	constructor(name, manufacturer, id, expiration, qty){
		this.name = name
		this.manufacturer = manufacturer
		this.id = id
		this.expiration = expiration
		this.qty = qty
	}

	static addMedicine(medicine){
		allProducts.push(medicine);
		window.localStorage.setItem("allProducts", JSON.stringify(allProducts));
		
	}
}

export class PrescriptionMedicine extends Medicine {
	constructor(name, manufacturer, id, expiration, qty, prescription) {
		super(name, manufacturer, id, expiration, qty)
		this.prescription = prescription
	}
}




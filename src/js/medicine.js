import { allProducts } from "./app.js";
import { renderList } from "./renderList.js";
import { getMedicineFromLocaleStorage } from "./app.js";


export class Medicine {
	constructor(name, manufacturer, expiration, qty, prescription, dosageForm){
		this.name = name
		this.manufacturer = manufacturer
		this.id = Date.now()
		this.expiration = expiration
		this.qty = qty
		this.prescription = prescription
		this.dosageForm = dosageForm
	};

	static addMedicine(medicine){
		allProducts.push(medicine);
		window.localStorage.setItem("allProducts", JSON.stringify(allProducts));
		
	};

	static deleteMedicine(ID, productsArray){
		const index = productsArray.findIndex(product => product.id.toString() === ID.toString());
		if(index !== -1) {
			allProducts.splice(index, 1);
			window.localStorage.setItem("allProducts", JSON.stringify(allProducts));
			renderList(getMedicineFromLocaleStorage());
		};
	};
};

export class Capsule extends Medicine {
	constructor(name, manufacturer, expiration, qty, prescription, dosageForm, dosagePcs) {
		super(name, manufacturer, expiration, qty, prescription, dosageForm)
		this.dosagePcs = dosagePcs
	};
};

export class Syrup extends Medicine {
	constructor(name, manufacturer, expiration, qty, prescription, dosageForm, dosageMl) {
		super(name, manufacturer, expiration, qty, prescription, dosageForm)
		this.dosageMl = dosageMl
	};
};





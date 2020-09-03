class Product{
	constructor(productCode, name, unitPrice, retailPrice, PV){
		this.productCode = productCode;
		this.name = name;
		this.unitPrice = unitPrice;
		this.retailPrice = retailPrice;
		this.PV = PV;
	}
};
class Order{
	constructor(customerName, customerCode, longrichOrderCode, 
		products, coment, modeOfPayment, index){
		this.index = index || Math.floor(Math.random() * (1000 - 0) + 0 );
		this.customerName = customerName;
		this.customerCode = customerCode;
		this.longrichOrderCode = longrichOrderCode;
		this.products = products;
		this.coment = coment;
		this.modeOfPayment = modeOfPayment;
	}
};
class Delivery {
	constructor(index, products, date){
		this.index = index || Math.floor(Math.random() * (1000 - 0) + 0 );
		this.products = products;
		this.date = date;
	}
};
class InventoryItem {
	constructor(product, quantity){
		this.product = product;
		this.quantity = quantity || (quantity === 0)? 0 : Math.floor(Math.random() * (50 - 0) + 0 );
	}
};

let model = {
	self: this,
	product: [],
	order: [],
	inventory: [],
	state: "",
	ENTER_KEY: 13,
	ESC_KEY: 27,
	small: false,

	productTable: {
		head:  "<tr><th> </th> <th>Product Code</th> <th>Name</th> <th>Unit Price</th> <th>Retail Price</th> <th>PV</th>"
				+"<th> </th> </tr>",
		body:[]
	},
	orderTable: {
		head: "<tr> <th>Index</td> <th>Customer Name</td> <th>Customer Code</td>"
				+ "<th>Longrich Order Code</td> <th>Comment</td> <th>Mode of Payment</td> </tr>",
		body:[]
	},
	inventoryTable: {
		head: 
			["<tr>", "<th> </td>", "<th>Product</td>", "<th>Quantity</td>", "<th> </td>", "</tr>"],
		body:[]
	},

	init: () => {
		
			let onehun = new Product("onehun", "100g Toothpaste", 10, 11, 2.2);
			let twohun = new Product("twohun", "200g Toothpaste", 10, 11, 2.2);
			let sod = new Product("sod", "SOD", 10, 11, 2.2);
			let cal = new Product("cal", "Calcium", 10, 11, 2.2);
			let lib = new Product("lib", "Libao", 10, 11, 2.2);
			let mengq = new Product("mengq", "Mengqian", 10, 11, 2.2);
			let bam = new Product("bam", "Bamboo Soap", 10, 11, 2.2);
			let cup = new Product("cup", "PI Cup", 10, 11, 2.2);
			let panty = new Product("panty", "Panty Liner", 10, 11, 2.2);
			let fourInOne = new Product("fourInOne", "4-in-1 pad", 10, 11, 2.2);
			let heavy = new Product("heavy", "Heavy Flow", 10, 11, 2.2);
			let anti = new Product("anti", "Anti-Perspirant Dew", 10, 11, 2.2);
			let repel = new Product("repel", "Mosquitoe Repellant", 10, 11, 2.2);
			model.product = [onehun, twohun, sod, cal, lib, mengq, bam, cup, panty];

			let skido = new Order("Skido", "NG0123456781", "HO1231", model.product.map((prod)=>{return new InventoryItem(prod);}), "Satisfied", "Cash");
			let chill = new Order("Chill", "NG0123456782", "HO1232", model.product.map((prod)=>{return new InventoryItem(prod);}), "Satisfied", "Cash");
			let lisky = new Order("Lisky", "NG0123456783", "HO1233", model.product.map((prod)=>{return new InventoryItem(prod);}), "Satisfied", "Cash");
			let swiss = new Order("Swiss", "NG0123456784", "HO1234", model.product.map((prod)=>{return new InventoryItem(prod);}), "Satisfied", "Cash");
			let jin = new Order("Jin", "NG0123456785", "HO1235", model.product.map((prod)=>{return new InventoryItem(prod);}), "Satisfied", "Cash");
			let mex = new Order("Mex", "NG0123456786", "HO1236", model.product.map((prod)=>{return new InventoryItem(prod);}), "Satisfied", "Cash");
			let jada = new Order("Jada", "NG0123456787", "HO1237", model.product.map((prod)=>{return new InventoryItem(prod);}), "Satisfied", "Cash");
			let tizza = new Order("Tizza", "NG0123456788", "HO1238", model.product.map((prod)=>{return new InventoryItem(prod);}), "Satisfied", "Cash");
			let recidivist = new Order("Recidivist", "NG0123456789", "HO1239", model.product.map((prod)=>{return new InventoryItem(prod);}), "Satisfied", "Cash");
			model.order = [skido, chill, lisky, swiss, jin, mex, jada, tizza, recidivist];

			model.inventory = model.product.map((prod)=>{
				return new InventoryItem(prod);
			});
	},
	setState: (text)=>{
		if (text === "Product") {
			model.state = "product";
		}else if (text === "Order") {
			model.state = "order";
		}else if (text === "Inventory") {
			model.state = "inventory";
		}
	},
	setSmall: (temp)=>{
		model.small = temp;
	}
};

model.init();
for(let i = 0; i < model.product.length; i++){
	model.productTable.body.push(`<tr data-pcode="${model.product[i].productCode}">`
									+  `<td>`
										+  `<span class="writeIconSpan"><i class="fas fa-pen writeIcon"></i> </span>`
									+  `</td>`
									+  `<td>${model.product[i].productCode}</td>`
									+  `<td>${model.product[i].name}</td>`
									+  `<td>${model.product[i].unitPrice}</td>`
									+  `<td>${model.product[i].retailPrice}</td>`
									+  `<td>${model.product[i].PV}</td>`
									+  `<td>`
										+  `<span class="deleteIconSpan"><i class="fas fa-trash deleteIcon"></i> </span>`
									+  `</td>`
								+  `</tr>`);
}

for(let i = 0; i < model.order.length; i++){
	let prods = "";
	// To set the data id to select the order and see the products
	//if not products then no data-id and no displaying of anything
	let dataId = (model.order[i].products.length)? model.order[i].index : -1;
	for(let j = 0; j < model.order[i].products.length; j++){
		prods += `<li>`
				+  `<span>${model.order[i].products[j].product.name}:</span>`
					+  `<span>${model.order[i].products[j].quantity}</span>`
				+  `</li>`;
	}
	model.orderTable.body.push(`<tr class="clicker" data-index="${model.order[i].index}">`
										+  `<td>`
											+  `<span class="writeIconSpan"><i class="fas fa-pen writeIcon"></i> </span>`
											+  ` ${model.order[i].index}`
										+  `</td>`
										+  `<td>${model.order[i].customerName}</td>`
										+  `<td>${model.order[i].customerCode}</td>`
										+  `<td>${model.order[i].longrichOrderCode}</td>`
										+  `<td>${model.order[i].coment}</td>`
										+  `<td>`
											+  `${model.order[i].modeOfPayment}`
											+  `<span class="deleteIconSpan"><i class="fas fa-trash deleteIcon"></i> </span>`
										+  `</td>`
									+  `</tr>`
									+  `<tr class="test" data-id="${dataId}">`
										+  `<td colspan="6">`
											+  `<p>Products</p>`
											+  `<ul>${prods}</ul>`
										+  `</td>`
									+  `</tr>`);
}
for(let i = 0; i < model.inventory.length; i++){
	model.inventoryTable.body.push(`<tr data-pcode="${model.inventory[i].product.productCode}">`
									+  `<td>`
										+  `<span class="writeIconSpan"><i class="fas fa-pen writeIcon"></i> </span>`
									+  `</td>`
									+  `<td>${model.inventory[i].product.name}</td>`
									+  `<td>${model.inventory[i].quantity}</td>`
									+  `<td>`
										+  `<span class="deleteIconSpan"><i class="fas fa-trash deleteIcon"></i> </span>`
									+  `</td>`
								+  `</tr>`);
}

{/*<form>
<input type="submit" class="link" value="Update" formaction="/update-hero/<%= heroes[i]._id %>" formmethod="get">
</form>*/}


module.exports = {
	model
};
const Product = require("./mvc/models/product");
const Order = require("./mvc/models/order");
const InventoryItem = require("./mvc/models/inventory-item");
const Delivery = require("./mvc/models/delivery");

let products = [];
let orders = [];
let inventory = [];
let deliveries = [];

let onehun = new Product("onehun", "100g Toothpaste", 456, 2123, 5);
let twohun = new Product("twohun", "200g Toothpaste", 456, 2123, 5);
let sod = new Product("sod", "SOD", 456, 2123, 5);
let cal = new Product("cal", "Calcium", 456, 2123, 5);
let lib = new Product("lib", "Libao", 456, 2123, 5);
let mengq = new Product("mengq", "Mengqian", 456, 2123, 5);
let bam = new Product("bam", "Bamboo Soap", 456, 2123, 5);
let cup = new Product("cup", "PI Cup", 456, 2123, 5);
let panty = new Product("panty", "Panty Liner", 456, 2123, 5);
let fourInOne = new Product("fourInOne", "4-in-1 pad", 456, 2123, 5);
let heavy = new Product("heavy", "Heavy Flow", 456, 2123, 5);
let anti = new Product("anti", "Anti-Perspirant Dew", 456, 2123, 5);
let repel = new Product("repel", "Mosquitoe Repellant", 456, 2123, 5);
products = [onehun, twohun, sod, cal, lib, mengq, bam, cup, panty];

let skido = new Order("Skido", "NG0123456781", "HO1231", [], "Satisfied", "Cash");
let chill = new Order("Chill", "NG0123456782", "HO1232", [], "Satisfied", "Cash");
let lisky = new Order("Lisky", "NG0123456783", "HO1233", [], "Satisfied", "Cash");
let swiss = new Order("Swiss", "NG0123456784", "HO1234", [], "Satisfied", "Cash");
let jin = new Order("Jin", "NG0123456785", "HO1235", [], "Satisfied", "Cash");
let mex = new Order("Mex", "NG0123456786", "HO1236", [], "Satisfied", "Cash");
let jada = new Order("Jada", "NG0123456787", "HO1237", [], "Satisfied", "Cash");
let tizza = new Order("Tizza", "NG0123456788", "HO1238", [], "Satisfied", "Cash");
let recidivist = new Order("Recidivist", "NG0123456789", "HO1239", [], "Satisfied", "Cash");
orders = [skido, chill, lisky, swiss, jin, mex, jada, tizza, recidivist];

function randomDate(start, end){
	return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

for(let i = 0; i < 9; i++){
	deliveries.push(new Delivery(`D01234${i}`, [], randomDate(new Date(2019, 0, 1), new Date())));
}
module.exports = {
	products,
	orders,
	inventory,
	deliveries
};
const mongoose = require("mongoose");
const Product = mongoose.model('Product');
const Order = mongoose.model('Order');
const Inventory = mongoose.model('Inventory');
const Delivery = mongoose.model('Delivery');

const data = require("../../DEFAULT_DATA");
const productData = data.products;
const orderData = data.orders;
let inventoryData = data.inventory;
let deliveryData = data.deliveries;

let defaultObj = {};

const InventoryItem = require("../models/inventory-item");


//Something is just basically anboject sent to the man page depending on what is required
const getIndexpage = (req, res)=>{
	res.render('index', { title: 'Sales App' });
}

const getHomepage = (req, res)=>{
	res.render('home', { title: 'Sales App' });
}

const getProductsPage = (req, res)=>{
	//{}, null, {lean: true}, 
	Product.find((err, products)=>{
		if(err) {return res.send( {error: err} );}

		defaultObj.title = 'Sales App - Products';
		defaultObj.active = 'products'
		defaultObj.products = products;
		res.render('products', defaultObj);
	});
}
const getOrdersPage = (req, res)=>{
	Order.find().populate('products.product').exec((err, orders)=>{
		// console.log(orders[(orders.length - 1)].products);
		if(err) {return res.send( {error: err} );}

		defaultObj.title = 'Sales App - Orders';
		defaultObj.active = 'orders'
		defaultObj.orders = orders;
		res.render('orders', defaultObj);
	});
}
const getInventoryPage = (req, res)=>{
	Inventory.find().populate('product').exec((err, invs)=>{
		if(err) {return res.send( {error: err} );}

		defaultObj.title = 'Sales App - Inventory';
		defaultObj.active = 'inventories'
		defaultObj.inventories = invs;
		res.render('inventory', defaultObj);
	});
}
const getDeliveryPage = (req, res)=>{
	Delivery.find().populate('products.product').exec((err, dels)=>{
		if(err) {return res.send( {error: err} );}
		
		defaultObj.title = 'Sales App - Delivery';
		defaultObj.active = 'deliveries'
		defaultObj.deliveries = dels;
		res.render('delivery', defaultObj);
	});
}


const reset = function(req, res){
	let p1 = new Promise((resolve, reject) => {
		Product.deleteMany({}, (err, info) => {
			if(err) { reject("Error"); return res.send( {error: err} );}
			resolve("Success");
		});
	});
	let p2 = new Promise((resolve, reject) => {
		Order.deleteMany({}, (err, info) => {
			if(err) { reject("Error"); return res.send( {error: err} );}
			resolve("Success");
		});
	});
	let p3 = new Promise((resolve, reject) => {
		Inventory.deleteMany({}, (err, info) => {
			if(err) { reject("Error"); return res.send( {error: err} );}
			resolve("Success");
		});
	});
	let p4 = new Promise((resolve, reject) => {
		Delivery.deleteMany({}, (err, info) => {
			if(err) { reject("Error"); return res.send( {error: err} );}
			resolve("Success");
		});
	});
	
	Promise.all([p1, p2, p3, p4]).then(()=>{
		let p;
		let p1 = new Promise((resolve, reject) => {
			Product.insertMany(productData, (err, info) => {
				if(err) { reject("Error"); return res.send( {error: err} );}
				p = info;
				resolve("Success");
			});
		});
		let p3 = new Promise((resolve, reject) => {
			p1.then(()=>{
				inventoryData = p.map((prod)=>{
					return new InventoryItem(prod);
				});
				Inventory.insertMany(inventoryData, (err, info) => {
					if(err) { reject("Error"); return res.send( {error: err} );}
					resolve("Success");
				});
			});
		});
		let p4 = new Promise((resolve, reject) => {
			p1.then(()=>{
				deliveryData.forEach((del) => {
					let tempInv = [];
					tempInv = p.map((prod)=>{
						return {product: prod, quantity: Math.floor(Math.random() * (50 - 0) + 0 )};
					});
					del.products = tempInv;
				});
				Delivery.insertMany(deliveryData, (err, info) => {
					if(err) { reject("Error"); return res.send( {error: err} );}
					resolve("Success");
				});
			});
		});
		let p2 = new Promise((resolve, reject) => {
			p1.then(()=>{
				orderData.forEach((ord)=>{
					let tempInv = [];
					tempInv = p.map((prod)=>{
						return {product: prod, quantity: Math.floor(Math.random() * (50 - 0) + 0 )};
					});
					ord.products = tempInv;
				});
				Order.insertMany(orderData, (err, info) => {
					if(err) { reject("Error"); return res.send( {error: err} );}
					resolve("Success");
				});
			});
		});
	});
	Promise.all([p1, p2, p3, p4]).then(()=>{
		res.redirect("/sales/home");
		console.log("RESET");
	});
}


module.exports = {
	getIndexpage,
	getHomepage,
	getProductsPage,
	getOrdersPage,
	getInventoryPage,
	getDeliveryPage,
	reset
};
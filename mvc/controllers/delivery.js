const mongoose = require("mongoose");
const Order = mongoose.model('Order');
const Product = mongoose.model('Product');
const Inventory = mongoose.model('Inventory');
const Delivery = mongoose.model('Delivery');

const deliveryModel = require('../models/delivery');

const ctrlInventory = require('./inventory');

let defaultObj = {};

const getCreateForm = ({ params }, res)=>{
	Product.find((err, products)=>{
		if(err) {return res.send( {error: err} );}
		defaultObj.title = 'Sales App- Create Delivery';
		defaultObj.active = 'newDelivery'
		defaultObj.products = products;
		res.render('create-delivery', defaultObj);
	});
}
const createDelivery = ({ body }, res) => {
	let delivery = new deliveryModel(body.deliveryCode, [], body.date);
	let promises = [];
	
	body.products.forEach((prod, i) => {
		let qty = 0;
		if(body.quantities[i] !== " "){
			qty = Number.parseInt(body.quantities[i]);
		}
		if(qty !== 0){
			promises.push(new Promise((resolve, reject) => {
				Product.findOne({ "name": prod.substr(0, prod.length-1) }, (err, pro) => {
					if(err) { reject("Error"); return res.send( {error: err} );}
					
					delivery.products.push({ product: pro, quantity: qty });
					resolve("Success");
				});
			}));			
		}
	});
	Promise.all(promises).then(()=>{
		Delivery.create(delivery, (err, newDelivery) => {
			if(err) {return res.send( {error: err} );}

			newDelivery.products.forEach((product) => {
				ctrlInventory.updateInventoryItem(false, product, "delivery");
			})

			res.redirect("/sales/delivery");
		});		
	});
}
const getUpdateForm = ({ params }, res)=>{
	let delivery;
	let p1 = new Promise((resolve, reject) => {
		Delivery.findById(params.deliveryid).populate('products.product').exec((err, del) => {
			if(err) { reject("Error"); return res.send( {error: err} );}
			delivery = del;
			console.log(delivery);
			resolve("Success");
		});
	});
	p1.then(() => {
		let ids = new Array();
		delivery.products.forEach((product) => {
			ids.push(product.product._id);
		});
		
		Product.find({ _id :{$nin : ids} }, (err, products)=>{
			if(err) {return res.send( {error: err} );}

			defaultObj.title = 'Sales App- Create Delivery';
			defaultObj.delivery = delivery;
			defaultObj.products = products;
			res.render('update-delivery', defaultObj);
		});
	});
}
const updateDelivery = ({ params, body }, res) => {
	Delivery.findById(params.deliveryid).populate('products.product').exec((err, delivery) => {
		if(err) {return res.send( {error: err} );}

		delivery.deliveryCode = body.deliveryCode;
		delivery.date = new Date(body.date);

		let promises = [];
		let invPromises = [];

		if(body.products){
			for(let i = 0; i < body.products.length; i++){
				let qty = 0;
				if(body.quantities[i] !== " " && body.newQuantities[i].length != 0){
					qty = Number.parseInt(body.quantities[i]);
				}
				if(qty !== 0){
					for(const[j, p] of delivery.products.entries()){
						if(p.product.name == body.products[i]){

							invPromises.push(new Promise((resolve, reject) => {
								ctrlInventory.updateInventoryItem(true, delivery.products[j], "delivery", (qty - delivery.products[j].quantity));
								resolve("Success");
							}));

							delivery.products[j].quantity = qty;
							break;
						}
					};
				} else if(qty === 0){
					for(const[j, p] of delivery.products.entries()){
						if(p.product.name == body.products[i]){
							delivery.products.splice(j,1);
							break;
						}
					};
				}
			}
		}
		if(body.newProducts){
			for(let i = 0; i < body.newProducts.length; i++){
				let qty = 0;
				if(body.newQuantities[i] !== " " && body.newQuantities[i].length != 0){
					qty = Number.parseInt(body.newQuantities[i]);
				}
				
				if(qty !== 0){
					
					promises.push(new Promise((resolve, reject) => {
						Product.findOne({ "name": body.newProducts[i] }, (err, pro) => {
							if(err) { reject("Error"); return res.send( {error: err} );}
							
							delivery.products.push({ product: pro, quantity: qty });
							
							invPromises.push(new Promise((resolve, reject) => {
								ctrlInventory.updateInventoryItem(false, delivery.products[delivery.products.length - 1], "delivery");
								resolve("Success");
							}));							

							resolve("Success");
						});
					}));
				}
			}			
		}
		Promise.all(promises).then(()=>{
			// console.log(delivery.products);
			delivery.save((err, updatedDelivery) => {
				if(err) {return res.send( {error: err} );}
				res.redirect("/sales/delivery");
			});			
		}).then(() => {
			return Promise.all[invPromises];
		});

	});
}
const deleteDelivery = function ({ params }, res) {
	Delivery.findByIdAndRemove(params.deliveryid, (err, order) => {
		if(err) {return res.send( {error: err} );}
		res.redirect("/sales/delivery");
	});
}


module.exports = {
	getCreateForm,
	createDelivery,
	getUpdateForm,
	updateDelivery,
	deleteDelivery
};
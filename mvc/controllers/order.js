const mongoose = require("mongoose");
const Order = mongoose.model('Order');
const Product = mongoose.model('Product');
const Inventory = mongoose.model('Inventory');

const orderModel = require('../models/order');

const ctrlInventory = require('./inventory');

let defaultObj = {};

const getCreateForm = ({ params }, res)=>{
	Product.find((err, products)=>{
		if(err) {return res.send( {error: err} );}
		
		defaultObj.title = 'Sales App- Create Order';
		defaultObj.active = 'newOrder'
		defaultObj.products = products;
		res.render('create-order', defaultObj);
	});
}
const createOrder = ({ body }, res) => {
	let order = new orderModel(body.customerName, body.customerCode, body.longrichOrderCode,
		[], body.coment, body.modeOfPayment);
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
					
					order.products.push({ product: pro, quantity: qty });
					resolve("Success");
				});
			}));			
		}
	});
	Promise.all(promises).then(()=>{
		Order.create(order, (err, newOrder) => {
			if(err) {return res.send( {error: err} );}

			newOrder.products.forEach((product) => {
				ctrlInventory.updateInventoryItem(false, product, "order");
			})

			res.redirect("/sales/orders");
		});		
	});
}
const getUpdateForm = ({ params }, res)=>{
	let order;
	let p1 = new Promise((resolve, reject) => {
		Order.findById(params.orderid).populate('products.product').exec((err, ord) => {
			if(err) { reject("Error"); return res.send( {error: err} );}
			order = ord;
			resolve("Success");
		});
	});
	p1.then(() => {
		let ids = new Array();
		order.products.forEach((product) => {
			ids.push(product.product._id);
		});
		
		Product.find({ _id :{$nin : ids} }, (err, products)=>{
			if(err) {return res.send( {error: err} );}

			defaultObj.title = 'Sales App- Order Update';
			defaultObj.order = order;
			defaultObj.products = products;
			res.render('update-order', defaultObj);
		});
	});
}
const updateOrder = ({ params, body }, res) => {
	Order.findById(params.orderid).populate('products.product').exec((err, order) => {
		if(err) {return res.send( {error: err} );}

		order.index = body.index;
		order.customerName = body.customerName;
		order.customerCode = body.customerCode;
		order.longrichOrderCode = body.longrichOrderCode;
		order.coment = body.coment;
		order.modeOfPayment = body.modeOfPayment;

		let promises = [];
		let invPromises = [];

		if(body.products){
			for(let i = 0; i < body.products.length; i++){
				let qty = 0;
				if(body.quantities[i] !== " " && body.newQuantities[i].length != 0){
					qty = Number.parseInt(body.quantities[i]);
				}
				if(qty !== 0){
					for(const[j, p] of order.products.entries()){
						if(p.product.name == body.products[i]){

							invPromises.push(new Promise((resolve, reject) => {
								if(err) { reject("Error"); return res.send( {error: err} );}
								ctrlInventory.updateInventoryItem(true, order.products[j], "order", (order.products[j].quantity - qty));
								resolve("Success");
							}));

							order.products[j].quantity = qty;
							break;
						}
					};
				} else if(qty === 0){
					for(const[j, p] of order.products.entries()){
						if(p.product.name == body.products[i]){
							order.products.splice(j,1);
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
							
							order.products.push({ product: pro, quantity: qty });
							
							invPromises.push(new Promise((resolve, reject) => {
								ctrlInventory.updateInventoryItem(false, order.products[order.products.length - 1], "order");
								resolve("Success");
							}));							

							resolve("Success");
						});
					}));
				}
			}			
		}
		Promise.all(promises).then(()=>{
			// console.log(order.products);
			order.save((err, updatedOrder) => {
				if(err) {return res.send( {error: err} );}
				res.redirect("/sales/orders");
			});			
		}).then(() => {
			return Promise.all[invPromises];
		});

	});
}
const deleteOrder = function ({ params }, res) {
	Order.findByIdAndRemove(params.orderid, (err, order) => {
		if(err) {return res.send( {error: err} );}
		res.redirect("/sales/orders");
	});
}


module.exports = {
	getCreateForm,
	createOrder,
	getUpdateForm,
	updateOrder,
	deleteOrder
};
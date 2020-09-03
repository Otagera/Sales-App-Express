const mongoose = require("mongoose");
const Inventory = mongoose.model('Inventory');

const InventoryItem = require("../models/inventory-item");

const addNewInventoryItem = (product)=>{

	let inventoryItem = new InventoryItem(product, 0);

	Inventory.create(inventoryItem, (err, newOrder) => {
		if(err) {return res.send( {error: err} );}
	});
}

const updateInventoryItem = ( update, orderProduct, op, diff) => {
	Inventory.findOne({ product: orderProduct.product }).populate('product').exec((err, inv)=>{
		if(err) { return res.send( {error: err} );}

		if(update) {
			inv.quantity = inv.quantity + diff;
		}else {
			if(op === "order"){
				inv.quantity = inv.quantity - Number.parseInt(orderProduct.quantity);
			}
			else if(op === "delivery"){
				inv.quantity = inv.quantity + Number.parseInt(orderProduct.quantity);
			}
		}

		inv.save((err, updatedInv) => {
			if(err) {return res.send( {error: err} );}
		});
	});
}

const deleteInventoryItem = () => {
	//check how to filter by product before deleting
	Inventory.findByIdAndRemove(params.orderid, (err, order) => {
		if(err) {return res.send( {error: err} );}
		res.redirect("/sales/orders");
	});
}

const deleteAllInventory = () => {
	Inventory.deleteMany({}, (err, info) => {
		if(err) { return res.send( {error: err} );}	
	});
}

module.exports = {
	addNewInventoryItem,
	updateInventoryItem,
	deleteInventoryItem,
	deleteAllInventory
};
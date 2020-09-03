const mongoose = require("mongoose");

const Schema = mongoose.Schema;

/*class InventoryItem {
	constructor(product, quantity){
		this.product = product;
		this.quantity = quantity || (quantity === 0)? 0 : Math.floor(Math.random() * (50 - 0) + 0 );
	}
};
*/

class InventoryItem {
	constructor(product, quantity){
		this.product = product;
		this.quantity = quantity || (quantity === 0)? 0 : Math.floor(Math.random() * (50 - 0) + 0 );
	}
};


let inventorySchema = new Schema(
	{
		product:  { type: Schema.Types.ObjectId, ref: 'Product'},
		quantity: {type: Number, required: true}
	}
);

inventorySchema.virtual('url').get(()=>{
	return '/sales/inventory/' + this._id;
});

mongoose.model('Inventory', inventorySchema);
module.exports = InventoryItem;
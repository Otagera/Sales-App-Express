const mongoose = require("mongoose");
const Product = mongoose.model('Product');

const Schema = mongoose.Schema;

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

let orderSchema = new Schema(
	{
		index:		  	   { type: Number, required: true},
		customerName: 	   { type: String, required: true},
		customerCode: 	   { type: String, required: true},
		longrichOrderCode: { type: String, required: true},
		products: 		   [{
								product: { type: Schema.Types.ObjectId, ref: 'Product'},
								quantity: { type: Number}
							}],
		coment: 		   { type: String},
		modeOfPayment: 	   { type: String}
	}
);

orderSchema.virtual('url').get(() => {
	return '/sales/orders/' + this._id;
});


mongoose.model('Order', orderSchema);
module.exports = Order;
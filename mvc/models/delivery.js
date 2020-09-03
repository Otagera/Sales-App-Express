const mongoose = require("mongoose");

const Schema = mongoose.Schema;

class Delivery {
	constructor(deliveryCode, products, date){
		this.deliveryCode = deliveryCode;
		this.products = products;
		this.date = date;
	}
};

let deliverySchema = new Schema(
	{
		deliveryCode: { type: String, required: true},
		products:  	 [{
						product: { type: Schema.Types.ObjectId, ref: 'Product'},
						quantity: { type: Number}
					 }],
		date: 		 { type: Date, required: true}
	}
);

deliverySchema.virtual('url').get(()=>{
	return '/sales/delivery/' + this._id;
});

mongoose.model('Delivery', deliverySchema);
module.exports = Delivery;
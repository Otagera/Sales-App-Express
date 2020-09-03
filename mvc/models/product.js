const mongoose = require("mongoose");

const Schema = mongoose.Schema;

class Product{
	constructor(productCode, name, unitPrice, retailPrice, pv){
		this.productCode = productCode;
		this.name = name;
		this.unitPrice = unitPrice;
		this.retailPrice = retailPrice;
		this.pv = pv;
	}
};

let productSchema = new Schema(
	{
		productCode: {type: String, required: true},
		name: 		 {type: String, required: true},
		unitPrice: 	 { type: Number, required: true},
		retailPrice: { type: Number, required: true},
		pv: 		 { type: Number, required: true}
	}
);

productSchema.virtual('url').get(()=>{
	return '/sales/products/' + this._id;
});

mongoose.model('Product', productSchema);
module.exports = Product;
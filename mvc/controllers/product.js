const mongoose = require("mongoose");
const Product = mongoose.model('Product');

const productModel = require('../models/product');

let defaultObj = {};

const getCreateForm = ({ params }, res)=>{

	defaultObj.title = 'Sales App- Create Product';
	defaultObj.active = 'newProduct';
	res.render('create-product', defaultObj);
}

const createProduct = ({ body }, res) => {
	let product = new productModel(body.productCode, body.name, body.unitPrice, body.retailPrice, body.pv);

	Product.create(product, (err, newProduct) => {
		if(err) {return res.send( {error: err} );}
		res.redirect("/sales/products");
	});
}

const getUpdateForm = ({ params }, res)=>{
	Product.findById(params.productid, (err, product) => {
		if(err) {return res.send( {error: err} );}
		
		res.render('update-product', { title: 'Sales App- Product Update', something: product });
	});
}

const updateProduct = ({ params, body }, res) => {
	Product.findById(params.productid, (err, product) => {
		if(err) {return res.send( {error: err} );}

		product.productCode = body.productCode;
		product.name = body.name;
		product.unitPrice = body.unitPrice;
		product.retailPrice = body.retailPrice;
		product.pv = body.pv;

		product.save((err, updatedProduct) => {
			if(err) {return res.send( {error: err} );}
			res.redirect("/sales/products");
		});
	});
}

const deleteProduct = function ({ params }, res) {
	Product.findByIdAndRemove(params.productid, (err, product) => {
		if(err) {return res.send( {error: err} );}
		res.redirect("/sales/products");
	});
}

module.exports = {
	getCreateForm,
	createProduct,
	getUpdateForm,
	updateProduct,
	deleteProduct
};
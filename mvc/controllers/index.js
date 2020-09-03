const modelIndex = require('../models/index');

const getIndexpage = (req, res)=>{
	res.redirect("/sales");
}
module.exports = {
	getIndexpage
}
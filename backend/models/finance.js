const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FinanceSchema = new Schema({
	id: {
		type: String,
		require: true
	},
	title: {
		type: String,
		require: true
	},
	type: {
		type: String,
		require: true
	},
	date: {
		type: String,
		require: true
	},
	times: {
		type: Array
	},
	items: {
		type: Array
	},
	datas: {
		type: Array
	}
});

module.exports = mongoose.model('Finance', FinanceSchema);
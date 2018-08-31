const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const FinanceSchema = new Schema({
	id: {
		type: String,
		unique: true,
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

const UserSchema = new Schema({
	name: {
		type: String,
		unique: true,
		require: true
	},
	password: {
		type: String,
		require: true
	},
	account: [
		FinanceSchema
	],
	token: {
		type: String
	}
});

//保存用户密码之前就对密码进行hash加密
UserSchema.pre('save',function(next){
	var user = this;
	if(this.isModified('password') || this.isNew){
		bcrypt.genSalt(10, function(err,salt){
			if(err){
				return next(err);
			}
			bcrypt.hash(user.password, salt, function(err, hash){
				if(err){
					return next(err);
				}
				user.password = hash;
				next();
			});
		});
	}else{
		return next();
	}
})

//验证用户密码是否输入正确
UserSchema.methods.comparePassword = function(password, cb){
	bcrypt.compare(password, this.password, (err,isMatch)=>{
		if(err){
			return cb(err);
		}
		cb(null, isMatch);
	})
}

module.exports = mongoose.model('User', UserSchema);
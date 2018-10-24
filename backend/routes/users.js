const express = require('express');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const config = require('../config');
const passport = require('passport');
const router = express.Router();
const uuid = require('node-uuid');
const qs = require('qs');

require('../passport')(passport);

//注册
router.post('/signup', (req,res) => {
	if(!req.body.name || !req.body.password) {
		res.json({ success: false, message: '请输入账号密码。' });
	}else{
		var newUser = new User({
			name: req.body.name,
			password: req.body.password
		});
		//保存用户账号
		newUser.save((err) => {
			if(err){
				return res.json({ success: false, message: '注册失败！' });
			}
			res.json({ success: true, message: '注册成功！' });
		});
	}
});

//检查用户名和密码，验证成功后生成token
router.post('/user/accesstoken', (req,res) => {
	User.findOne({
		name: req.body.name
	}, (err,user) => {
		if(err){
			throw err;
		}
		if(!user){
			res.json({ success: false, message: '认证失败，此用户未注册过！' });
		}else if(user){
			user.comparePassword(req.body.password, (err, isMatch) => {
				if(isMatch && !err){
					var token = jwt.sign({name: user.name}, config.secret, {
						expiresIn: 10080
					});
					user.token = token;
					user.save(function(err){
						if(err){
							res.send(err);
						}
					});
					res.json({
						success: true,
						messgae: '验证成功！',
						token: 'Bearer ' + token,
						name: user.name
					});
				}else{
					res.send({ success: false, message: '认证失败，密码错误！' });
				}
			});
		}
	});
});

//获取用户信息
router.get('/users/info',
	passport.authenticate('bearer', {session:false}),
	function(req,res){
		// delete req.user.account.detail;
		res.json({
			username: req.user.name,
			account: req.user.account
		});
	}
);

//添加新的账簿
router.post('/finance/add',
	passport.authenticate('bearer', {session:false}),
	(req,res) => {
	if(!req.body.name || !req.body.type) {
		res.json({ success: false, message: '请将账簿信息输入完整！' });
	}else{
		let id = uuid.v4();
		req.user.account.unshift({
			id: id,
			title: req.body.name,
			closed: false,
			type: req.body.type,
			date: new Date().getTime(),
			times: [],
			items: [],
			datas: []
		});
		req.user.save(function(err){
			if(err){
				res.send(err);
			}
		});
		res.json({
			success: true,
			message: '添加成功'
		});
	}
});

//根据id获取账簿信息
router.get('/finance/detail',
	passport.authenticate('bearer', {session:false}),
	(req,res) => {
	if(req.query.id) {
		req.user.account.map(function(obj){
			if(obj.id == req.query.id){
				res.json({
					success: true,
					data: obj,
					message: '查询成功'
				});
			}
		});
	}else{
		res.json({ success: false, message: '无效的账簿ID！' });
	}
});

//根据id删除账簿
router.get('/finance/delete',
	passport.authenticate('bearer', {session:false}),
	(req,res) => {
	if(req.query.id) {
		req.user.account.map(function(obj,index){
			if(obj.id == req.query.id){
				// delete req.user.account[index];
				req.user.account.splice(index, 1);
			}
		});
		req.user.save(function(err){
			if(err){
				res.send(err);
			}
		});
		res.json({
			success: true,
			message: '删除成功'
		});
	}else{
		res.json({ success: false, message: '无效的账簿ID！' });
	}
});

//根据id关闭账簿
router.get('/finance/close',
	passport.authenticate('bearer', {session:false}),
	(req,res) => {
	if(req.query.id) {
		req.user.account.map(function(obj){
			if(obj.id == req.query.id){
				obj.closed = true;
			}
		});
		req.user.save(function(err){
			if(err){
				res.send(err);
			}
		});
		res.json({
			success: true,
			message: '关闭成功'
		});
	}else{
		res.json({ success: false, message: '无效的账簿ID！' });
	}
});

//账簿信息更新
router.post('/finance/update',
	passport.authenticate('bearer', {session:false}),
	(req,res) => {
	req.body = qs.parse(req.body);
	if(!req.body.id) {
		res.json({ success: false, message: '没有有效的账簿ID！' });
	}else{
		req.user.account.map(function(obj){
			if(obj.id == req.body.id){
				if(obj.closed) {
					res.json({
						success: false,
						message: '此账簿已关闭，无法更新'
					});
					return;
				}
				obj.times = [].concat(req.body.times);
				obj.items = [].concat(req.body.items);
				obj.datas = [].concat(req.body.datas);
				obj.date = new Date().getTime();
			}
		});
		req.user.save(function(err){
			if(err){
				res.send(err);
			}
		});
		res.json({
			success: true,
			message: '更新成功'
		});
	}
});


module.exports = router;
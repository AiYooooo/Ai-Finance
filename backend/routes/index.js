module.exports = (app) => {
	app.get('/', (req,res) => {
		res.json({message: 'Welcome to the Api of AiYo Tech!'});
	})

	app.use('/api', require('./users'));
}
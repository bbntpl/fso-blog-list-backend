const usersRouter = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/user')

usersRouter.get('/', async (req, res) => {
	const data = await User.find({}).populate('blogs', {
		likes: 0,
		user: 0
	})
	res.json(data)
})

usersRouter.post('/', async (req, res, next) => {
	const { username, name, password } = req.body

	const saltRounds = 12
	await bcrypt.hash(password, saltRounds, async (err, hash) => {
		try {
			const user = new User({
				username,
				name,
				passwordHash: hash,
				blogs: []
			})

			const savedUser = await user.save()
			
			res.status(201).json(savedUser)
		} catch (exception) {
			next(exception)
		}
	})


})

module.exports = usersRouter
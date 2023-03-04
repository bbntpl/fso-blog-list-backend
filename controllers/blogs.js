const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (req, res) => {
	const data = await Blog.find({}).populate('user', {
		username: 1,
		name: 1
	})

	res.json(data)
})

blogsRouter.post('/', async (req, res, next) => {
	const body = req.body
	const user = await User.findById(body.userId)

	try {
		const blogObject = {
			title: body.title,
			author: body.author,
			url: body.url,
			likes: body.likes,
			user: user.id
		}
		const blog = new Blog(blogObject)

		const savedBlog = await blog.save()

		user.blogs = user.blogs.concat(savedBlog._id)
		await user.save()

		res.status(201).json(savedBlog)
	} catch (exception) {
		next(exception)
	}
})

blogsRouter.delete('/:id', async (req, res) => {
	const id = req.params.id
	await Blog.findByIdAndRemove(id)
	res.status(204).end()
})

blogsRouter.put('/:id', async (req, res) => {
	const id = req.params.id

	const result = await Blog.findByIdAndUpdate(id, req.body, { new: true })
	res.json(result)
})


module.exports = blogsRouter
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (req, res) => {
	const data = await Blog.find({})

	res.json(data)
})

blogsRouter.post('/', async (req, res, next) => {
	const body = req.body

	try {
		const blog = new Blog(body)

		const savedBlog = await blog.save()
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
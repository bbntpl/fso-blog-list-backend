const jwt = require('jsonwebtoken')
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

const getTokenFrom = req => {
	const authorization = req.get('authorization')

	if (authorization && authorization.startsWith('Bearer ')) {
		return authorization.replace('Bearer ', '')
	}
	return null
}

blogsRouter.get('/', async (req, res) => {
	const data = await Blog.find({}).populate('user', {
		username: 1,
		name: 1
	})

	res.json(data)
})

blogsRouter.get('/:id', async (req, res) => {
	const id = req.params.id
	const blog = await Blog.findById(id).populate('user', {
		username: 1,
		name: 1
	})

	res.json(blog)
})

blogsRouter.post('/', async (req, res, next) => {
	const body = req.body

	try {
		const decodedToken = jwt.verify(getTokenFrom(req), process.env.SECRET)
		if (!decodedToken.id) {
			return res.status(401).json({ error: 'token invalid' })
		}

		const user = await User.findById(decodedToken.id)
		const blogObject = {
			title: body.title,
			author: body.author,
			url: body.url,
			likes: body.likes,
			user: user._id
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

blogsRouter.delete('/:id', async (req, res, next) => {
	const id = req.params.id

	try {
		const decodedToken = jwt.verify(getTokenFrom(req), process.env.SECRET)
		if (!decodedToken.id) {
			return res.status(401).json({ error: 'token invalid' })
		}
		const blog = await Blog.findById(id)

		if (blog.user.toString() !== decodedToken.id.toString()) {
			return res.status(401).json({ error: 'invalid user' })
		} else {
			blog.remove()
			res.status(204).end()
		}

	} catch (exception) {
		next(exception)
	}
})

blogsRouter.put('/:id', async (req, res, next) => {
	const id = req.params.id

	const blog = {
		...req.body,
		user: req.body.user.id
	}
	delete blog.id

	try {
		const decodedToken = jwt.verify(getTokenFrom(req), process.env.SECRET)
		if (!decodedToken.id) {
			return res.status(401).json({ error: 'token invalid' })
		}

		const updatedBlog = await Blog.findByIdAndUpdate(id, blog, { new: true })
		res.json(updatedBlog)
		
	} catch (exception) {
		next(exception)
	}


})


module.exports = blogsRouter
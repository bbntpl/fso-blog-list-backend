const bcrypt = require('bcrypt')
const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogList = [
	{
		title: 'Hiromi might be the best contemporary Jazz musician and we will remember her for decades',
		author: 'Melody Wang',
		url: 'https://popularblog123.com',
		likes: 67
	},
	{
		title: 'blog test by Jesus Christ',
		author: 'Jesus Christ',
		url: 'https://iamthesavior.com',
		likes: 9
	}
]

const newBlog = {
	title: '123456',
	author: 'abcdefg',
	url: 'http://blablala.net',
	likes: 42
}

const newUser = {
	username: 'username',
	name: 'pangalan',
	password: 'contrasena'
}

const blogsInDb = async () => {
	const blogs = await Blog.find({})
	return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
	const users = await User.find({})
	return users.map(user => user.toJSON())
}

const createBlog = async (blogObject) => {
	const savedBlog = new Blog(blogObject)

	return await savedBlog.save()
}

const createUser = async ({ username, name, password }) => {
	const saltRounds = 12
	const hash = await bcrypt.hash(password, saltRounds)

	const savedUser = new User({
		username,
		name,
		passwordHash: hash
	})

	return await savedUser.save()
}

module.exports = {
	initialBlogList,
	newBlog,
	newUser,
	blogsInDb,
	usersInDb,
	createUser,
	createBlog
}
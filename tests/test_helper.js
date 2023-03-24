const bcrypt = require('bcrypt')
const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogList = [
	{
		title: 'Hiromi might be the best contemporary Jazz musician and we will remember her for decades',
		author: 'Melody Wang',
		url: 'https://popularblog123.com',
		likes: 67,
		comments: []
	},
	{
		title: 'blog test by Jesus Christ',
		author: 'Jesus Christ',
		url: 'https://iamthesavior.com',
		likes: 9,
		comments: []
	}
]

const newBlog = {
	title: '123456',
	author: 'abcdefg',
	url: 'http://blablala.net',
	likes: 42,
	comments: []
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

const loginUser = async (api, {
	username = 'username',
	password = 'password'
} = {}) => {
	const user = { username, password }

	const request = await api.post('/api/login')
		.send(user)
		.expect(200)

	return await {
		token: request.body.token,
		request
	}
}

const initialDocsInDb = async () => {
	// delete all documents from testing database
	await Blog.deleteMany({})
	await User.deleteMany({})

	// create users to be saved in db
	const createdUser = await createUser({
		username: 'username',
		name: 'name',
		password: 'password'
	})

	await createUser({
		username: 'username2',
		name: 'name',
		password: 'password2'
	})

	// create new array of blogs that includes reference to user id
	const blogObjects = initialBlogList
		.map(blog => new Blog(Object.assign({
			user: {
				id: createdUser._id,
				username: createdUser.username,
				name: createdUser.name
			}
		}, blog)))

	// add the blog ids as a reference within the user document
	const blogsIds = blogObjects.map(blog => blog._id)
	const targetUser = await User.findById(createdUser._id)
	targetUser.blogs = targetUser.blogs.concat(blogsIds)
	targetUser.save()

	// fulfill promise array
	const promiseArray = blogObjects.map(blog => blog.save())
	await Promise.all(promiseArray)
}

module.exports = {
	initialBlogList,
	newBlog,
	newUser,
	blogsInDb,
	usersInDb,
	createUser,
	createBlog,
	loginUser,
	initialDocsInDb
}
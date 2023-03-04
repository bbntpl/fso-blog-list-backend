const supertest = require('supertest')
const mongoose = require('mongoose')

const User = require('../models/user')
const helper = require('./test_helper')
const app = require('../app')
const Blog = require('../models/blog')

const api = supertest(app)

beforeEach(async () => {
	await Blog.deleteMany({})
	await User.deleteMany({})

	const createdUser = await helper.createUser(helper.newUser)

	const blogObjects = helper.initialBlogList
		.map(blog => new Blog(Object.assign({ user: createdUser._id }, blog)))

	const blogsIds = blogObjects.map(blog => blog._id)
	const targetUser = await User.findById(createdUser._id)

	targetUser.blogs = targetUser.blogs.concat(blogsIds)
	targetUser.save()

	const promiseArray = blogObjects.map(blog => blog.save())
	await Promise.all(promiseArray)
})

describe('view users', () => {
	test('must contain reference to blogs data', async () => {
		const initialBlogList = await helper.blogsInDb()

		const response = await api.get('/api/users')
			.expect(200)
			.expect('Content-Type', /application\/json/)

		const users = response.body
		const blogs = await helper.blogsInDb()
		const blogsIds = blogs.map(blog => blog.id)

		const areBlogsReferenceUser = users[0].blogs.every(blog => {
			return () => blogsIds.contains(blog.id)
		}) || false
		expect(users[0].blogs).toHaveLength(initialBlogList.length)
		expect(areBlogsReferenceUser).toBeTruthy()
	})

	test('user should contain blogs if applicable', async () => {
		const initialBlogs = await helper.blogsInDb()
		const usersBeforeChange = await helper.usersInDb()

		const blogToBeAdded = {
			title: 'view users',
			author: 'view author',
			url: 'view url',
			likes: 55,
			user: usersBeforeChange[0].id
		}

		const blogResponse = await api.post('/api/blogs')
			.send(blogToBeAdded)
			.expect(201)
			.expect('Content-Type', /application\/json/)

		const usersResponse = await api.get('/api/users')
			.expect(200)
			.expect('Content-Type', /application\/json/)

		const usersAfterChange = usersResponse.body
		const blogId = blogResponse.body.id

		expect(usersAfterChange[0].blogs).toHaveLength(initialBlogs.length + 1)
		expect(usersAfterChange[0].blogs.find(blog => blog.id === blogId))
			.toEqual({
				title: 'view users',
				author: 'view author',
				url: 'view url',
				id: blogId
			})
	})
})

describe('user creation', () => {
	test('succeed with 201 and add user to the users db', async () => {
		const initialUsers = await helper.usersInDb()

		const newUser = {
			username: 'bvrbrynntpl',
			name: 'Beaver',
			password: 'taiwanup'
		}

		const response = await api.post('/api/users')
			.send(newUser)
			.expect(201)
			.expect('Content-Type', /application\/json/)

		const updatedUsers = await helper.usersInDb()
		expect(updatedUsers).toHaveLength(initialUsers.length + 1)

		const savedUser = response.body
		const usernames = updatedUsers.map(user => user.username)
		expect(usernames).toContain(savedUser.username)
	})

	test('fails with 400 if there is a missing required field error', async () => {
		const initialUsers = await helper.usersInDb()

		const newUser = {
			name: 'Beaver',
		}

		await api.post('/api/users')
			.send(newUser)
			.expect(400)

		const updatedUsers = await helper.usersInDb()
		expect(updatedUsers).toHaveLength(initialUsers.length)
	})

	test('fails with 400 if the user credentials are invalid', async () => {
		const initialUsers = await helper.usersInDb()

		const newUser = {
			username: 'h',
			name: 'Beaver',
			password: 'r'
		}

		await api.post('/api/users')
			.send(newUser)
			.expect(400)

		const updatedUsers = await helper.usersInDb()
		expect(updatedUsers).toHaveLength(initialUsers.length)
	})

	test('fails with 400 if username input is not unique', async () => {
		const initialUsers = await helper.usersInDb()

		const newUser = {
			username: 'username',
			name: 'Beaver',
			password: 'hehehehehe12345'
		}

		await api.post('/api/users')
			.send(newUser)
			.expect(400)

		const updatedUsers = await helper.usersInDb()
		expect(updatedUsers).toHaveLength(initialUsers.length)
	})
})

afterAll(async () => {
	await mongoose.connection.close()
})
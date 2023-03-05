const supertest = require('supertest')
const mongoose = require('mongoose')

const helper = require('./test_helper')
const app = require('../app')

const api = supertest(app)

beforeEach(async () => {
	// initial database for testing
	// first user always owns all of the initial blogs
	await helper.initialDocsInDb()
})

describe('view users', () => {
	test('successfuly fetched with get request', async () => {
		const initialUsers = await helper.usersInDb()
		const request = await api.get('/api/users')
			.expect(200)
			.expect('Content-Type', /application\/json/)

		const requestedUsers = request.body
		expect(requestedUsers).toHaveLength(initialUsers.length)
	})
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

	test('user should contain blogs data within blog array if applicable', async () => {
		const initialBlogs = await helper.blogsInDb()
		const request = await api.get('/api/users')
			.expect(200)
			.expect('Content-Type', /application\/json/)

		const initialUsers = request.body
		const firstBlog = initialBlogs[0]
		const firstBlogId = firstBlog.id.toString()
		
		expect(initialUsers[0].blogs).toHaveLength(initialBlogs.length)
		expect(initialUsers[0].blogs.find(blog => blog.id.toString() === firstBlogId))
			.toEqual({
				title: firstBlog.title,
				author: firstBlog.author,
				url: firstBlog.url,
				id: firstBlogId
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
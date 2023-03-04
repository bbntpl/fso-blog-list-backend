const supertest = require('supertest')
const mongoose = require('mongoose')

const User = require('../models/user')
const helper = require('./test_helper')
const app = require('../app')

const api = supertest(app)

beforeEach(async () => {
	await User.deleteMany({})
	await helper.createUser(helper.newUser)
})

describe('view users', () => {
	test('user should contain blogs if applicable', async () => {
		const users = await helper.usersInDb()

		const blogToBeAdded = {
			title: 'view users',
			author: 'view author',
			url: 'view url',
			likes: 55,
			user: users[0].id
		}
		
		const createdBlog = await helper.createBlog(blogToBeAdded)

		const usersResponse = await api.get('/api/users')
			.expect(200)
			.expect('Content-Type', /application\/json/)

		expect(usersResponse[0].blogs).toHaveLength(1)
		expect(usersResponse[0].blogs[0].id).toBe(createdBlog._id)
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
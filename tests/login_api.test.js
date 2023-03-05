const supertest = require('supertest')

const User = require('../models/user')
const helper = require('./test_helper')
const app = require('../app')

const api = supertest(app)

beforeEach(async () => {
	await User.deleteMany({})
	await helper.createUser({
		username: 'username',
		name: 'name',
		password: 'password'
	})
})

test('authorization fails if credentials are unmatched', async () => {
	const user = {
		username: 'ffsfs',
		password: 'vr3qveaz'
	}
	await api.post('/api/login')
		.send(user)
		.expect(401)
})

test('succeed blog creation with valid token', async () => {
	const initialBlogs = await helper.blogsInDb()

	const user = {
		username: 'username',
		password: 'password'
	}

	const request = await api.post('/api/login')
		.send(user)
		.expect(200)
	const token = request.body.token

	const newBlog = {
		title: 'title',
		author: 'author',
		likes: 69,
		url: 'http://url.com',
	}

	await api.post('/api/blogs')
		.send(newBlog)
		.set({ 'Authorization': `Bearer ${token}`})
		.expect(201)
		.expect('Content-Type', /application\/json/)

	const updatedBlogs = await helper.blogsInDb()
	expect(updatedBlogs).toHaveLength(initialBlogs.length + 1)
})
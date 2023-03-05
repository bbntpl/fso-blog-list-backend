const supertest = require('supertest')
const app = require('../app')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const User = require('../models/user')

const api = supertest(app)

beforeEach(async () => {
	await helper.initialDocsInDb()
})

describe('accessing initial data to ', () => {
	test('verify that it is returned as json', async () => {
		await api
			.get('/api/blogs')
			.expect('Content-Type', /application\/json/)
			.expect(200)
	})

	test('return the correct amount of blogs', async () => {
		const request = await api
			.get('/api/blogs')

		expect(request.body).toHaveLength(helper.initialBlogList.length)
	})

	test('verify that unique identifier prop is defined as id, not _id', async () => {
		const request = await api
			.get('/api/blogs')

		const blogs = request.body

		blogs.map(blog => {
			expect(blog.id).toBeDefined()
			expect(blog._id).toBeUndefined()
		})
	})
})

describe('view blogs', () => {
	test('must contain reference to user data', async () => {
		const request = await api.get('/api/blogs')
			.expect(200)
			.expect('Content-Type', /application\/json/)

		const blogs = request.body
		const users = await helper.usersInDb()
		const areBlogsReferenceUser = blogs.every(blog => {
			return users[0].id === blog.user.id
		})
		expect(areBlogsReferenceUser).toBeTruthy()
	})
})

describe('addition of blog', () => {
	test('successfully added the blog in the database', async () => {
		const initialBlogsList = await helper.blogsInDb()

		const { token } = await helper.loginUser(api)

		const request = await api.post('/api/blogs')
			.send(helper.newBlog)
			.set({ 'Authorization': `Bearer ${token}` })
			.expect(201)
			.expect('Content-Type', /application\/json/)

		const updatedBlogs = await helper.blogsInDb()
		expect(updatedBlogs).toHaveLength(initialBlogsList.length + 1)

		const blogUrls = updatedBlogs.map(blog => blog.url)
		expect(blogUrls).toContain(request.body.url)
	})

	test('must define likes prop with a default value is 0 if missing', async () => {
		const initialBlogsList = await helper.blogsInDb()
		const blogToBeAdded = Object.assign({}, helper.newBlog)
		delete blogToBeAdded.likes

		const { token } = await helper.loginUser(api)

		const request = await api.post('/api/blogs')
			.send(blogToBeAdded)
			.set({ 'Authorization': `Bearer ${token}` })
			.expect(201)
			.expect('Content-Type', /application\/json/)

		const updatedBlogs = await helper.blogsInDb()

		expect(request.body.likes).toBe(0)
		expect(updatedBlogs).toHaveLength(initialBlogsList.length + 1)
	})

	test('fails with status code 400 if data is invalid', async () => {
		const blogToBeAdded = {
			author: helper.newBlog.author,
			likes: helper.newBlog.author
		}

		const { token } = await helper.loginUser(api)

		await api
			.post('/api/blogs')
			.set({ 'Authorization': `Bearer ${token}` })
			.send(blogToBeAdded)
			.expect(400)

		const updatedBlogs = await helper.blogsInDb()
		expect(updatedBlogs).toHaveLength(helper.initialBlogList.length)
	})

	test('succeed with status code 201 if the designated user exists', async () => {
		const initialUsers = await helper.usersInDb()
		const newUser = await helper.createUser({
			username: 'bvrbrynntpl',
			name: 'B.B.',
			password: 'bahala_na'
		})

		const { token } = await helper.loginUser(api, {
			username: 'bvrbrynntpl',
			password: 'bahala_na'
		})

		const newUserInJson = JSON.stringify(newUser)
		const userId = JSON.parse(newUserInJson).id

		const updatedUsers = await helper.usersInDb()
		const user = updatedUsers.find(user => user.id === userId)
		expect(updatedUsers).toHaveLength(initialUsers.length + 1)

		const blogToBeAdded = Object.assign(
			user ? { user: user.id } : {},
			helper.newBlog
		)

		const request = await api.post('/api/blogs')
			.send(blogToBeAdded)
			.set({ 'Authorization': `Bearer ${token}` })
			.expect(201)
			.expect('Content-Type', /application\/json/)

		const updatedBlogs = await helper.blogsInDb()
		expect(updatedBlogs).toHaveLength(helper.initialBlogList.length + 1)

		const users = updatedBlogs.map(blog => blog.user
			? blog.user.toString()
			: undefined)
		expect(users).toContain(request.body.user)
	})
})

describe('deletion of a blog', () => {
	test('succeed with 204 status code if it\'s deleted by the designated user', async () => {
		const blogs = await helper.blogsInDb()
		const blogToDelete = blogs[0]

		const designatedUser = await User.findById(blogToDelete.user.id)

		const { token } = await helper.loginUser(api)
		await api
			.delete(`/api/blogs/${blogToDelete.id}`)
			.set({ 'Authorization': `Bearer ${token}` })
			.expect(204)

		const updatedBlogs = await helper.blogsInDb()

		const ids = updatedBlogs.map(blog => blog.id)
		expect(token).not.toBeUndefined()
		expect(designatedUser.id.toString()).toEqual(blogToDelete.user.toString())
		expect(updatedBlogs).toHaveLength(helper.initialBlogList.length - 1)
		expect(ids).not.toContain(blogToDelete.id)
	})

	test('fails with 400 status code if action is attempted without token', async () => {
		const blogs = await helper.blogsInDb()
		const blogToDelete = blogs[0]

		await api
			.delete(`/api/blogs/${blogToDelete.id}`)
			.expect(401)

		const updatedBlogs = await helper.blogsInDb()

		const ids = updatedBlogs.map(blog => blog.id)
		expect(updatedBlogs).toHaveLength(helper.initialBlogList.length)
		expect(ids).toContain(blogToDelete.id)
	})

	test('fails with 401 status code if action is attempted by an invalid user', async () => {
		const blogs = await helper.blogsInDb()
		const blogToDelete = blogs[0]

		const { token } = await helper.loginUser(api, {
			username: 'username2',
			password: 'password2'
		})

		await api
			.delete(`/api/blogs/${blogToDelete.id}`)
			.set({ 'Authorization': `Bearer ${token}` })
			.expect(401)

		const updatedBlogs = await helper.blogsInDb()

		const ids = updatedBlogs.map(blog => blog.id)
		expect(updatedBlogs).toHaveLength(helper.initialBlogList.length)
		expect(ids).toContain(blogToDelete.id)
	})

})

describe('blog update', () => {
	test('same amount of data and specific blog contains new number of likes', async () => {
		const blogs = await helper.blogsInDb()
		const blogToUpdate = blogs[0]

		const maxLikes = blogToUpdate.likes + 100

		while (blogToUpdate.likes < maxLikes) {
			blogToUpdate.likes += 1
		}

		await api
			.put(`/api/blogs/${blogToUpdate.id}`)
			.send(blogToUpdate)
			.expect(200)
			.expect('Content-Type', /application\/json/)

		const updatedBlogs = await helper.blogsInDb()

		expect(updatedBlogs[0].likes).toBe(maxLikes)
		expect(updatedBlogs).toHaveLength(helper.initialBlogList.length)
	})
})

afterAll(async () => {
	await mongoose.connection.close()
})
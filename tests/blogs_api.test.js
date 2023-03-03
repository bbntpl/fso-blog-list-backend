

const supertest = require('supertest')
const app = require('../app')
const mongoose = require('mongoose')
const Blog = require('../models/blog')
const helper = require('./helper')

const api = supertest(app)

beforeEach(async () => {
	await Blog.deleteMany({})

	const blogObjects = helper.initialBlogList
		.map(blog => new Blog(blog))
	const promiseArray = blogObjects.map(note => note.save())
	await Promise.all(promiseArray)
})

describe('accessing initial data to ', () => {
	test('verify that it is returned as json', async () => {
		await api
			.get('/api/blogs')
			.expect('Content-Type', /application\/json/)
			.expect(200)
	})

	test('return the correct amount of blogs', async () => {
		const response = await api
			.get('/api/blogs')

		expect(response.body).toHaveLength(helper.initialBlogList.length)
	})

	test('verify that unique identifier prop is defined as id, not _id', async () => {
		const response = await api
			.get('/api/blogs')

		const blogs = response.body

		blogs.map(blog => {
			expect(blog.id).toBeDefined()
			expect(blog._id).toBeUndefined()
		})
	})
})


describe('addition of blog', () => {
	test('successfully added the blog in the database', async () => {
		const response = await api.post('/api/blogs')
			.send(helper.newBlog)
			.expect(201)
			.expect('Content-Type', /application\/json/)

		const updatedBlogs = await helper.blogsInDb()
		expect(updatedBlogs).toHaveLength(helper.initialBlogList.length + 1)

		const blogUrls = updatedBlogs.map(blog => blog.url)
		expect(blogUrls).toContain(response.body.url)
	})

	test('must define likes prop with a default value is 0 if missing', async () => {
		const blogToBeAdded = Object.assign({}, helper.newBlog)
		delete blogToBeAdded.likes

		const response = await api.post('/api/blogs')
			.send(blogToBeAdded)
			.expect(201)
			.expect('Content-Type', /application\/json/)

		const updatedBlogs = await helper.blogsInDb()

		expect(response.body.likes).toBe(0)
		expect(updatedBlogs).toHaveLength(helper.initialBlogList.length + 1)
	})

	test('fails with status code 400 if data is invalid', async () => {
		const blogToBeAdded = {
			author: helper.newBlog.author,
			likes: helper.newBlog.author
		}

		await api
			.post('/api/blogs')
			.send(blogToBeAdded)
			.expect(400)

		const updatedBlogs = await helper.blogsInDb()
		expect(updatedBlogs).toHaveLength(helper.initialBlogList.length)
	})
})

describe('deletion of a blog', () => {
	test('succeeds with 204 status code if id is valid', async () => {
		const blogs = await helper.blogsInDb()
		const blogToDelete = blogs[0]

		await api
			.delete(`/api/blogs/${blogToDelete.id}`)
			.expect(204)

		const updatedBlogs = await helper.blogsInDb()

		const ids = updatedBlogs.map(blog => blog.id)
		expect(updatedBlogs).toHaveLength(helper.initialBlogList.length - 1)
		expect(ids).not.toContain(blogToDelete.id)
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
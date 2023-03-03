const Blog = require('../models/blog')

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


const blogsInDb = async () => {
	const notes = await Blog.find({})
	return notes.map(note => note.toJSON())
}

module.exports = {
	initialBlogList,
	blogsInDb,
	newBlog
}
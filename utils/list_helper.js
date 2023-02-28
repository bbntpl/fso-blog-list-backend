const _ = require('lodash')

const dummy = (blogs) => {
	return 1
}

// map a new array that consists the likes value 
// derived from the original array
const getTotalLikes = (blogs) => {
	return blogs
		.map(blog => blog.likes)
		.reduce((total, value) => total + value, 0) || 0
}

const getBlogWithMostLikes = (blogs) => {
	const blogsByhighestLikes = blogs.sort((a, b) => b.likes - a.likes)
		.map(blog => {
			const { title, author, likes } = blog
			return { title, author, likes }
		})

	return blogsByhighestLikes[0] || 0
}

const mostBlogs = (blogs) => {
	if (!blogs.length) return 0
	const numberOfBlogs = []

	// for each blog check if the author is already listed
	// as an existing author, otherwise, add it to the list
	// including its number of blogs
	blogs.forEach(blog => {
		const { author } = blog
		const indexOfExistingAuthor = numberOfBlogs.findIndex(blog => blog.author === author)
		if (indexOfExistingAuthor >= 0) {
			numberOfBlogs[indexOfExistingAuthor].blogs += 1
		} else {
			numberOfBlogs.push({
				author,
				blogs: 1
			})
		}
	})

	// sort the array by the blogs prop
	numberOfBlogs.sort((a, b) => b.blogs - a.blogs)
	return numberOfBlogs[0]
}

const mostLikes = (blogs) => {
	if (!blogs.length) return 0
	const numberOfLikes = []

	// for each blog check if the author is already listed
	// as an existing author, otherwise, add it to the list
	// including its total likes
	blogs.forEach(blog => {
		const { author, likes } = blog
		const indexOfExistingAuthor = numberOfLikes.findIndex(blog => blog.author === author)
		if (indexOfExistingAuthor >= 0) {
			numberOfLikes[indexOfExistingAuthor].likes += likes
		} else {
			numberOfLikes.push({
				author,
				likes
			})
		}
	})

	// sort the array by the blogs prop
	numberOfLikes.sort((a, b) => b.likes - a.likes)
	return numberOfLikes[0]
}

module.exports = {
	dummy,
	getTotalLikes,
	getBlogWithMostLikes,
	mostBlogs,
	mostLikes
}
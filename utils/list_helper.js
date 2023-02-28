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
	const blogsMappedLikes = blogs.map(blog => blog.likes)
	const highestLikes = blogsMappedLikes.sort((a, b) => b - a)[0]
	console.log(blogsMappedLikes, highestLikes)

	const blogWithMostLikes = blogs
		.map(blog => {
			const { title, author, likes } = blog
			return { title, author, likes }
		})
		.find(blog => blog.likes === highestLikes) || 0
	return blogWithMostLikes
}

module.exports = {
	dummy,
	getTotalLikes,
	getBlogWithMostLikes
}
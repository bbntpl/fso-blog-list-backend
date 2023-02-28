const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
	const blogs = []

	const result = listHelper.dummy(blogs)
	expect(result).toBe(1)
})

describe('total likes ', () => {
	const blogs = [
		{
			_id: '5a422a851b54a676234d17f7',
			title: 'React patterns',
			author: 'Michael Chan',
			url: 'https://reactpatterns.com/',
			likes: 7,
			__v: 0
		},
		{
			_id: '5a422aa71b54a676234d17f8',
			title: 'Go To Statement Considered Harmful',
			author: 'Edsger W. Dijkstra',
			url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
			likes: 5,
			__v: 0
		},
		{
			_id: '5a422b3a1b54a676234d17f9',
			title: 'Canonical string reduction',
			author: 'Edsger W. Dijkstra',
			url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
			likes: 12,
			__v: 0
		},
		{
			_id: '5a422b891b54a676234d17fa',
			title: 'First class tests',
			author: 'Robert C. Martin',
			url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
			likes: 10,
			__v: 0
		},
		{
			_id: '5a422ba71b54a676234d17fb',
			title: 'TDD harms architecture',
			author: 'Robert C. Martin',
			url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
			likes: 0,
			__v: 0
		},
		{
			_id: '5a422bc61b54a676234d17fc',
			title: 'Type wars',
			author: 'Robert C. Martin',
			url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
			likes: 2,
			__v: 0
		}
	]


	const listWithOneBlog = [
		{
			_id: '5a422aa71b54a676234d17f8',
			title: 'Go To Statement Considered Harmful',
			author: 'Edsger W. Dijkstra',
			url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
			likes: 5,
			__v: 0
		}
	]

	test('of empty list is zero', () => {
		const result = listHelper.getTotalLikes([])

		expect(result).toBe(0)
	})

	test('when list has only one blog equals the likes of that', () => {
		const result = listHelper.getTotalLikes(listWithOneBlog)

		expect(result).toBe(listWithOneBlog[0].likes)
	})

	test('of a bigger list is calculated right ', () => {
		const reducer = (total, number) => {
			return total + number
		}

		const totalLikes = blogs
			.map(blog => blog.likes)
			.reduce(reducer, 0)

		const result = listHelper.getTotalLikes(blogs)

		expect(result).toBe(totalLikes)
	})
})

describe('favorite', () => {
	test('blog does not exist since there are no blogs must return zero', () => {
		const blogs = []
		const result = listHelper.getBlogWithMostLikes(blogs)

		expect(result).toBe(0)
	})

	test('when list has only one blog equals the likes of that', () => {
		const blogs = [{
			_id: '5a422a851b54a676234d17f7',
			title: 'React patterns',
			author: 'Michael Chan',
			url: 'https://reactpatterns.com/',
			likes: 7,
			__v: 0
		}]

		const result = listHelper.getTotalLikes(blogs)

		expect(result).toBe(blogs[0].likes)
	})

	test(' blog with the most likes', () => {
		const blogs = [{
			_id: '5a422a851b54a676234d17f7',
			title: 'React patterns',
			author: 'Michael Chan',
			url: 'https://reactpatterns.com/',
			likes: 7,
			__v: 0
		},
		{
			_id: '5a422b3a1b54a676234d17f9',
			title: 'Canonical string reduction',
			author: 'Edsger W. Dijkstra',
			url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
			likes: 12,
			__v: 0
		},
		{
			_id: '5a422b891b54a676234d17fa',
			title: 'First class tests',
			author: 'Robert C. Martin',
			url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
			likes: 10,
			__v: 0
		},
		{
			_id: '5a422bc61b54a676234d17fc',
			title: 'Type wars',
			author: 'Robert C. Martin',
			url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
			likes: 12,
			__v: 0
		},
		]
		const result = listHelper.getBlogWithMostLikes(blogs)

		const expectedResult = {
			title: 'Canonical string reduction',
			author: 'Edsger W. Dijkstra',
			likes: 12,
		}
		expect(result).toEqual(expectedResult)
	})


})
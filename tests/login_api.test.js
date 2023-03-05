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

test('succesfully generate token', async () => {
	const { token } = await helper.loginUser(api)

	expect(token).toBeDefined()
})
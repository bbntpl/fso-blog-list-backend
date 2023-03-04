const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
		unique: true,
		minLength: [3, 'Must be at least 3, got {VALUE}'],
	},
	name: String,
	passwordHash: {
		type: String,
		required: true,
		minLength: [3, 'Must be at least 3 characters'],
	},
	blogs: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Blog'
		}
	]
})

// Apply the uniqueValidator plugin to userSchema.
userSchema.plugin(uniqueValidator)

userSchema.set('toJSON', {
	transform: (_, returnedObject) => {
		returnedObject.id = returnedObject._id.toString()
		delete returnedObject._id
		delete returnedObject.__v
		delete returnedObject.passwordHash
	}
})

const User = mongoose.model('User', userSchema)

module.exports = User
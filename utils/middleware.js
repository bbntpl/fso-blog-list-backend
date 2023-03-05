const logger = require('./logger')

const requestLogger = (request, response, next) => {
	logger.info('Method:', request.method)
	logger.info('Path:  ', request.path)
	logger.info('Body:  ', request.body)
	logger.info('---')
	next()
}

const unknownEndpoint = (req, res) => {
	res.status(404).send('Your page is not found')
}

const errorHandler = (err, req, res, next) => {
	logger.error(err.message)

	if (err.name === 'CastError') {
		return res.status(400).send({ error: 'malformatted id' })
	} else if (err.name === 'ValidationError') {
		return res.status(400).send({
			error: err.message,
			status: err.status,
		})
	} else if (err.name === 'JsonWebTokenError') {
		return res.status(401).json({
			error: 'invalid token'
		})
	} else if (err.name === 'TokenExpiredError') {
		return res.status(401).json({
			error: 'token expired'
		})
	}

	next(err)
}

module.exports = {
	requestLogger,
	unknownEndpoint,
	errorHandler
}
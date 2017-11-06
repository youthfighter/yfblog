module.exports = {
	mongodb: {
		ip: '127.0.0.1',
		port: '27017',
		db: 'blog'
	},
	cookie: {
		key: 'SESSION_ID',
		maxAge: 10000,
		overwrite: true,
		httpOnly: true,
		signed: false,
		rolling: false,
	}
}
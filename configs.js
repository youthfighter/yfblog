module.exports = {
	imageServer: {
    path: 'D:/static/image/'
	},
	mongodb: {
		ip: '127.0.0.1',
		port: '27017',
		db: 'blog'
	},
	cookie: {
		key: 'SESSION_ID',
		maxAge: 60000,
		overwrite: true,
		httpOnly: false,
		signed: false,
		rolling: false,
	}
}
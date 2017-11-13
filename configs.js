module.exports = {
	imageServer: {
		dirPath: 'D:/static/images/',
		webUrl: '/static/images/',
		dest: 'uploads/',
		inputName: 'image'
	},
	mongodb: {
		ip: '127.0.0.1',
		port: '27017',
		db: 'blog'
	},
	cookie: {
		key: 'SESSION_ID',
		maxAge: 15*60*1000,
		overwrite: true,
		httpOnly: false,
		signed: false,
		rolling: false,
	}
}
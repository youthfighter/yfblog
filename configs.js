const Store = require('./src/util/store')
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
	redis: {
		ip: '127.0.0.1',
		port: '6379',
		db:0
	},
	cookie: {
		key: 'SESSION_ID',
		maxAge: 15*60*1000,
		overwrite: true,
		httpOnly: false,
		signed: false,
		rolling: false,
		store: new Store()
	},
	logPath: 'logs/',
	appId: 'wx2bbde56f72774ab0',
	secret: '279d35c3e0001a359b55faa9ca8d3668'
}
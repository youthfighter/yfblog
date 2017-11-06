const tran = require('../errorTranslate')
module.exports = {
	catchError (err) {
		const { status, errCode } = err
		if (status&&errCode) {
			return {
				status: status,
				body: {
					errCode: errCode,
					errMsg: tran[errCode]
				}
			}
		} else {
			console.log(err)
			return {
				status: 500,
				body: '内部服务器错误'
			}
		}
	}
}

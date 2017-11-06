const cookie = require('../../configs').cookie
class session{
	constructor(ctx){
		this.session = ctx.session
	}
	getUser () {
		this.session.maxAge = cookie.maxAge
		return this.session.user
	}
	getUserName () {
		let user = this.getUser() 
		if (user) {
			return user.name
		}
	}
	setUser (user) {
		this.session.user = user
	}
}
module.exports = session
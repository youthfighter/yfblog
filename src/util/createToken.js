const jwt = require('jsonwebtoken')

//登录时：核对用户名和密码成功后，应用将用户的id（图中的user_id）作为JWT Payload的一个属性
module.exports = function(userid){
    const token = jwt.sign({
        userid: userid
    }, 'sinner77', {
        expiresIn: '800s' //过期时间设置为15m。那么decode这个token的时候得到的过期时间为 : 创建token的时间 +　设置的值
    })
    return token
}
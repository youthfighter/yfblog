const request = require('request')
module.exports = function(code, appid, secret) {
  return new  Promise(function(resolve, reject) {
    request.get(`https://api.weixin.qq.com/sns/jscode2session?appid=${appid}&secret=${secret}&js_code=${code}&grant_type=authorization_code`, function(error, response, data){
      if (response.statusCode === 200) {
        resolve(data)
      } else {
        reject(err)
      }
    })
  })
}
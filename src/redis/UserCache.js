let Redis = require('ioredis')
class UserCache {
  constructor () {
    this.redis = new Redis()
  }
  /* 根据用户id获取对应的用户缓存信息 */
  async get(id) {
    let data = await this.redis.get(`USER:${id}`)
    return JSON.parse(data)
  }
    /* 根据用户id设置对应的用户缓存信息 */
    async set(id, value, maxAge = 54000000) {
      await this.redis.set(`USER:${id}`, JSON.stringify(value), 'EX', maxAge / 1000)
    }

  async remove(id) {
    return await this.redis.del(`USER:${id}`)
  }
}
module.exports = new UserCache()
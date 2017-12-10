const UserCache = require('./src/redis/UserCache')
async function a(){
    await UserCache.set('111', {a: 1})
}
a()
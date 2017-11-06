const User = require('./src/model/User')
const UserDao = require('./src/dao/UserDao')
const md5 = require('md5')

/* let a = new User({
    name: 'admin1',
    password: md5('admin')
});

let bb = UserDao.findById('59fff29e2fed451cbcd17d23').then(data => {
    console.log(1, data)
    console.log(2, new User(data))
}) */
let b = new User();
console.log(b)

const jwt = require('jsonwebtoken');

//登录时：核对用户名和密码成功后，应用将用户的id（图中的user_id）作为JWT Payload的一个属性
const AAA = abc(123456789)
function abc(user_id){
    const token = jwt.sign({
        user_id: user_id
    }, 'sinner77', {
        expiresIn: '60s' //过期时间设置为60妙。那么decode这个token的时候得到的过期时间为 : 创建token的时间 +　设置的值
    });
    return token;
};
console.log(abc('123'))
async function bbb () {
    let tokenContent
    try {

        tokenContent = await jwt.verify(AAA, 'sinner77')
        console.log(tokenContent)
    } catch (e) {
        console.log(e)
    }
}

bbb()

console.log(jwt.decode(AAA, '111'))


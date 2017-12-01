var svgCaptcha = require('svg-captcha');

var captcha = svgCaptcha.create({
    width: 100,
    height: 30,
    noise: 3
});
console.log(captcha);
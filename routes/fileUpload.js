const router = require('koa-router')()
const FileCtr = require('../src/controller/FileController')
const multer = require('koa-multer')

const upload = multer({dest: 'uploads/'})
router.post('/fileupload', upload.single('abc'), FileCtr.upload)
module.exports = router
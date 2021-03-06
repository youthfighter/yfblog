const loginImage = require('../model/loginImage')
const BaseDao = require('./BaseDao')
class loginImageDao extends BaseDao{
    insert(File){
        return new loginImage(File).save()
    }
    update(params){
        let _id = params._id
        delete params._id
        return loginImage.update({_id},params)
    }
    findOne(){
        return loginImage.findOne({}).lean()
    }
}
module.exports = new loginImageDao()
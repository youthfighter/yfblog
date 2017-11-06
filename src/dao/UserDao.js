const User = require('../model/User');
const BaseDao = require('./BaseDao');
class UserDao extends BaseDao{
    insert (user) {
        return new User(user).save();
    }
    update (params) {
        let _id = params._id;
        return User.update({_id},params);
    }
    findById (_id) {
        return User.findOne({_id}).lean();
    }
    findByName (name) {
        return User.findOne({name})
    }
    findByParams (params) {
        return User.find(params).sort({createDate:-1}).lean()
    }
}
module.exports = new UserDao();
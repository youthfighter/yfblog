const Page = require('../model/Page')
const BaseDao = require('./BaseDao')
class PageDao extends BaseDao{
    insert (page) {
        return new Page(Page).save()
    }
    update (params) {
        let _id = params._id
        delete params._id
        return Page.update({_id}, params)
    }
    findById (id) {
        return Page.findById(id).lean()
    }
    findByName (name) {
        return Page.findOne({name}).lean()
    }
    findByParams (params) {
        return Page.find(params).sort({createDate: -1}).lean()
    }
}
module.exports = new PageDao()
const Page = require('../model/Page')
const BaseDao = require('./BaseDao')
class PageDao extends BaseDao{
    insert (page) {
        return new Page(page).save()
    }
    update (params) {
        let _id = params._id
        delete params._id
        return Page.update({_id}, params)
    }
    findById (id) {
        return Page.findById(id).lean()
    }
    findByTitle (title) {
        return  Page.find({title}).lean()
    }
    findByParentId (parentId) {
        return Page.find({parentId}).lean()
    }
    findByParams (params) {
        return Page.find(params).lean()
    }
    findById (id) {
        return Page.findById(id)
    }
    delete (id) {
        return Page.findByIdAndRemove(id)
    }
    countByParentId (parentId) {
        return Page.where({parentId}).count()
    }
}
module.exports = new PageDao()
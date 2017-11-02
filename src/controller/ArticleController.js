class ArticleController{
    async getAll(ctx){
        try{
            let result = await asyncDemo()
            ctx.body = result
        }catch (e) {
            ctx.status = 400
            ctx.body = e.message
        }
    }
    async getOne(ctx){
        console.log('123')
        try{
            let result = await asyncDemo()
            ctx.body = result
        }catch (e) {
            ctx.status = 400
            ctx.body = e.message
        }
    }
}

let asyncDemo = ()=>{
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            resolve('ok')
        }, 1000)
    })
}

module.exports = new ArticleController()

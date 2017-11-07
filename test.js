function ab () {
    return new Promise((resolve, reject) => {
        resolve('123')
    })
}

async function cd () {
    let nn
    try{
        console.log(1)
        nn = await ab()
        console.log(nn)
    }catch(e){
        console.log(2)
        nn = e
    }
    return nn
}
console.log(cd())

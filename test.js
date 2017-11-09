class abcd{
    async abc () {
        console.log('abc')
    }
    async ccc () {
        try{
            this.abc()
            console.log('ccc')
        }catch(e){

        }        
    }
}
module.exports = new abcd()
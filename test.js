class abcd{
    abc () {
        console.log('abc')
    }
    ccc () {
        try{
            this.abc()
            console.log('ccc')
        }catch(e){

        }        
    }
}
new abcd().ccc()
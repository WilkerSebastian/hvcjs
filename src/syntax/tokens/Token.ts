export default class Token {

    protected type:string
    protected value:number

    constructor(type:string, value:number) {
        this.type = type
        this.value = value
    }

    public getType() {
        return this.type
    }

    public getValue() {
        return this.value
    }
    

}
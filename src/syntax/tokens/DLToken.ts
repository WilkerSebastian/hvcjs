import Token from "./Token";

export default class DLToken extends Token {

    constructor(type:DLType, value:number) {
        super(type, value)
    }

    public getType(): DLType {
        return this.type as DLType
    }

}

type DLType = "0EE" | "1EE" | "2EE" | "3EE" | "4EE" | "5EE" | "6EE" | "7EE" | "8EE" | "9EE" | "000" | "0-N" | "1-EE" | "2-EE" | "DATA"

export {DLType}
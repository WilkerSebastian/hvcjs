import Token from "./tokens/Token";

export default abstract class Syntax {

    public abstract lexer(script:string):Token

}
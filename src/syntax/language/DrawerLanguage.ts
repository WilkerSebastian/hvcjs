import Syntax from "../Syntax";
import DLToken from "../tokens/DLToken";

export default class DrawerLanguage extends Syntax {

    public lexer(script: string): DLToken {

        let token:DLToken | null = null
       
        const words = script.split(/\s+/)

        let end = false

        for (let i = 0; i < words.length; i++) {

            let word = words[i]

            if (!end) {

                if (/^000$/.test(word)) {
                    
                    end = true
                    token = new DLToken("000", 0)

                } else if (/^0[0-9]{2}$/.test(word))
                    token = new DLToken("0EE",  parseInt(word.substring(1, 3)))

                else if (/^1[0-9]{2}$/.test(word)) 
                    token = new DLToken("1EE",  parseInt(word.substring(1, 3)))

                else if (/^2[0-9]{2}$/.test(word))
                    token = new DLToken("2EE",  parseInt(word.substring(1, 3)))

                else if (/^3[0-9]{2}$/.test(word))
                    token = new DLToken("3EE",  parseInt(word.substring(1, 3)))

                else if (/^4[0-9]{2}$/.test(word))
                    token = new DLToken("4EE",  parseInt(word.substring(1, 3)))
                    
                else if (/^5[0-9]{2}$/.test(word))
                    token = new DLToken("5EE",  parseInt(word.substring(1, 3)))
                
                else if (/^6[0-9]{2}$/.test(word))
                    token = new DLToken("6EE",  parseInt(word.substring(1, 3)))
                
                else if (/^7[0-9]{2}$/.test(word))
                    token = new DLToken("7EE",  parseInt(word.substring(1, 3)))
                
                else if (/^8[0-9]{2}$/.test(word))
                    token = new DLToken("8EE",  parseInt(word.substring(1, 3)))
                
                else if (/^9[0-9]{2}$/.test(word)) 
                    token = new DLToken("9EE",  parseInt(word.substring(1, 3)))
                
                else if (/^0-[0-9]{1,3}$/.test(word)) 
                    token = new DLToken("0-N", parseInt((word.match(/[0-9]{1,3}$/) as RegExpMatchArray)[0]))

                else if (/^1-[0-9]{2}$/.test(word))
                    token = new DLToken("1-EE", parseInt(word.substring(2, 4)))

                else
                    throw new Error(`Erro de sintaxe, instrução ${word} não é conhecida!`);

            } else {

                if(/^[0-9]{3}$/.test(word))
                    token = new DLToken("DATA", parseInt(word))
                else
                    throw new Error(`Erro de sintaxe, dado ${word} não é valida!`);

            }

        }

        return token as DLToken

    }
   
}
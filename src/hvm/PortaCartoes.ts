import { Internalization } from "../utils/Internalization"

export default class PortaCartoes {

    private call: () => void
    public conteudo:string[] = []
    public entrada?:() => Promise<string>


    constructor(call: () => void) {
        this.call = call
    }

    public async inserir(...cartoes: string[]){
        
        cartoes.forEach(cartao => {

            if (cartao == "" || cartao == '\n' || cartao == '\r')
                return

            if (!/^(?:[0-9]{1,3}|-(?:[0-9]{1,2})|0-[0-9]{1,3}|1-[0-9]{2})$/.test(cartao)) {

                const number_value = Number(cartao)

                if (number_value < -99 || number_value > 999) 
                    throw new Error(`${Internalization.getInstance().translate("invalid_format_num")} ${cartao}.`);

                throw new Error(`${Internalization.getInstance().translate("invalid_format")} ${cartao}.`);

            }

            if (cartao.includes("-")) {

                const [start, end] = cartao.split("-")

                if (start == "0")
                    cartao = "0-" + end.padStart(3, "0")
                else if (start != "1")
                    cartao = "-" + end.padStart(2, "0") 

            } else 
                cartao = cartao.padStart(3, "0")
                
            this.conteudo.push(cartao);
            this.call()

        })
        
    }

    public getCartoes(){
        return this.conteudo;
    }

    public setCartoes(cartoes:string[]){
        this.conteudo = cartoes;
    }

    public lerCartao() {

        return this.conteudo.shift()
    
    }

    public async solicitarCartao() {

        if (this.entrada)  {

            const input = await this.entrada()

            await this.inserir(input)

            return

        }
        throw new Error(Internalization.getInstance().translate("not_implemented_in"))

    }

}
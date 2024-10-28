export default class PortaCartoes {

    public conteudo:string[] = []
    public entrada?:() => Promise<string>

    public async inserir(...cartoes: string[]){
        
        cartoes.forEach(cartao =>{
            
            if (!/^(?:[0-9]{1,3}|-(?:[0-9]{1,2})|0-[0-9]{1,3})$/.test(cartao)) {

                const number_value = Number(cartao)

                if (number_value < -99 || number_value > 999) 
                    throw new Error(`Inserção de formato numérico inválido. Conteúdo do cartão: ${cartao}.`);

                throw new Error(`Inserção de um formato desconhecido em cartão. Conteúdo do cartão: ${cartao}.`);

            }

            if (cartao.includes("-")) {

                const [start, end] = cartao.split("-")

                if (start == "0")
                    cartao = "0-" + end.padStart(3, "0")
                else 
                    cartao = "-" + end.padStart(2, "0") 

            } else 
                cartao = cartao.padStart(3, "0")
                
            this.conteudo.push(cartao);

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
        throw new Error("Nenhuma implementação de entrada encontrada.")

    }

}
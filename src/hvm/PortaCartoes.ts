export default class PortaCartoes {

    public conteudo:string[] = []
    public entrada?:() => Promise<string>

    public async inserir(...cartoes: string[]){
        
        cartoes.forEach(cartao =>{

            if (!/^(?:[0-9]{1,3}|0-[0-9]{1,3})$/.test(cartao)) 
                throw new Error(`Inserção de um formato desconhecido cartão, conteudo do cartão: ${cartao}`);
                
            this.conteudo.push(cartao);

        })
        
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
        throw new Error("Nenhuma implementação de entrada encontrada")

    }

}
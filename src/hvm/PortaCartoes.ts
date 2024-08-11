export default class PortaCartoes {

    public conteudo:string[] = []
    public entrada?:() => Promise<string>

    public async inserir(...cartoes: string[]){
        
        cartoes.forEach(carto =>{

            if (/^(?:\d{1,3}|0-\d{1,3})$/.test(carto))
                throw new Error(`Inserção de um formato desconhecido cartão, conteudo do cartão: ${carto}`);
                
            this.conteudo.push(carto);
            
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
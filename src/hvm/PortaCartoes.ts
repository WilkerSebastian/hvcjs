export default class PortaCartoes {

    public conteudo:string[] = []
    public entrada?:() => Promise<string>

    public async inserir(...cartoes: string[]){
        
        cartoes.forEach(e =>{
            this.conteudo.push(e);
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
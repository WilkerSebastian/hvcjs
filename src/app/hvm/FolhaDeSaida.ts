export default class FolhaDeSaida {

    public saida?:(out:string) => void
    
    public imprimir(texto: string) {

        if (this.saida)  {

            this.saida(texto)

            return

        }
        throw new Error("Nenhuma implementação de saída encontrada")

    }
}
export default class FolhaDeSaida {

    private text:string = "";

    public saida?:(out:string) => void
    
    public imprimir(texto: string) {
        this.text = texto;
        if (this.saida)  {

            this.saida(texto)

            return

        }
        throw new Error("Nenhuma implementação de saída encontrada")

    }

    getText(){
        return this.text;
    }
}
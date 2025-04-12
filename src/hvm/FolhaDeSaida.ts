import { Internalization } from "../utils/Internalization";

export default class FolhaDeSaida {

    private text:string[] = [];

    public saida?:(out:string) => void
    
    public imprimir(texto: string) {
        this.text.push(texto);
        if (this.saida)  {

            this.saida(texto)

            return

        }
        throw new Error(Internalization.getInstance().translate("not_implemented_out"))

    }
    public setText(saidas:string[]){
        this.text = saidas;
    }

    public getText(id?:number):string[] | string{
        
        if(id != undefined)
            return this.text[id];

        return this.text;
    }
}
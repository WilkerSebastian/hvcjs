import { Internalization } from "../utils/Internalization";

export default class FolhaDeSaida {

    private text:string = "";

    public saida?:(out:string) => void
    
    public imprimir(texto: string) {
        this.text = texto;
        if (this.saida)  {

            this.saida(texto)

            return

        }
        throw new Error(Internalization.getInstance().translate("not_implemented_out"))

    }

    getText(){
        return this.text;
    }
}
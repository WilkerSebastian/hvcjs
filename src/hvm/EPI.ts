import { Internalization } from "../utils/Internalization";

export default class EPI {

    private valor:number = 0;

    public registrar(registro: number) {

        if (registro < 0 || registro > 99) 
            throw new Error(`${Internalization.getInstance().translate("invalid_epi_value")} ${registro}.`);

        this.valor = registro;
        
    }

    public lerRegistro(): number {
        return this.valor;
    }

}
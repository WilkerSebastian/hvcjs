export default class EPI {

    private valor:number = 0;

    public registrar(registro: number) {

        if (registro < 0 || registro > 99) 
            throw new Error("Valor inválido no EPI: " + registro.toString() + ".");

        this.valor = registro;
        
    }

    public lerRegistro(): number {
        return this.valor;
    }

}
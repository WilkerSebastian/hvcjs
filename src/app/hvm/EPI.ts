export default class EPI {

    private valor:number = 0;

    public registrar(registro: number) {

        if (registro < 0) 
            throw new Error("Erro de sobrecarga da pilha, limite de 100 registros");

        this.valor = registro;
        
    }

    public lerRegistro(): number {
        return this.valor;
    }

}
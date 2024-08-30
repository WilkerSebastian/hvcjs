import DAO from "./DAO";
import HVM from "./HVM";

export default class Debugger{
    private estados:DAO[] = [];
    nStages:number = 0;

    public loadLastStage(hvm:HVM){

        if(this.nStages == 0)
            return;
        
        const estado = this.estados.pop()

        hvm.calculadora.acumular(estado!.acumulador)
        hvm.folhaDeSaida.imprimir(estado!.folhaDeSaida)
        
        hvm.gaveteiro.setGavetas(estado!.gaveteiro)
        hvm.epi.registrar(estado!.valorEpi)

        this.nStages -= 1;
    }
    public storeStage(hvm:HVM, enderecoAtual:number){

        this.estados.push(new DAO(hvm, enderecoAtual))
        this.nStages += 1;
    }
    
}
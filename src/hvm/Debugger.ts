import DebuggerState from "../state/DebuggerState";
import DAO from "./DAO";
import HVM from "./HVM";

export default class Debugger{
    private estados:DAO[] = [];
    nStages:number = 0;
    private state:DebuggerState = "EXECUTANDO"
    
    public setState(state:DebuggerState){
        this.state = state
    }
    public getState(){
        return this.state;
    }

    public loadLastStage(hvm:HVM):number{

        if(this.nStages == 0)
            return -1;
        
        const estado = this.estados.pop()

        hvm.calculadora.acumular(estado!.acumulador)
        hvm.folhaDeSaida.imprimir(estado!.folhaDeSaida)
        
        hvm.gaveteiro.setGavetas(estado!.gaveteiro)
        hvm.epi.registrar(estado!.valorEpi)

        this.nStages -= 1;

        return estado!.enderecoAtual;
    }
    public nextStage(hvm:HVM){

        const enderecoAtual = hvm.epi.lerRegistro()
        hvm.executarPasso()
        this.estados.push(new DAO(hvm, enderecoAtual))
        this.nStages += 1;
    }
    
}
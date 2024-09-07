import DebuggerState from "../state/DebuggerState";
import DAO from "./DAO";
import HVM from "./HVM";

export default class Debugger{
    public estados:DAO[] = [];
    nStages:number = 0;
    private state:DebuggerState = "RODANDO"
    
    public async setState(state:DebuggerState){
        this.state = state
    }
    public getState(){
        return this.state;
    }

    public async loadLastStage(hvm:HVM):Promise<number>{

        if(this.nStages == 0)
            return -1;
        
        const estado = this.estados.pop()
        console.log("volta para:", estado);
        
        hvm.calculadora.acumular(estado!.acumulador)
        hvm.folhaDeSaida.imprimir(estado!.folhaDeSaida)
        
        hvm.gaveteiro.setGavetas(estado!.gaveteiro)
        
        
        hvm.epi.registrar(estado!.valorEpi)

        this.nStages -= 1;

        return estado!.enderecoAtual;
    }
    public async nextStage(hvm:HVM){

        const enderecoAtual = hvm.epi.lerRegistro()
        this.estados.push(new DAO(hvm, enderecoAtual))
        this.nStages += 1;
        await hvm.executarPasso()

        console.log(this.estados[this.nStages -1]);
        
    }
    
}
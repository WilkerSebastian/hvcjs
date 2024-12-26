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
        
        hvm.calculadora.acumular(estado!.acumulador)
        hvm.folhaDeSaida.imprimir(estado!.folhaDeSaida)
        
        hvm.gaveteiro.setGavetas(estado!.gaveteiro)
        
        hvm.epi.registrar(estado!.valorEpi)
        hvm.portaCartoes.setCartoes(estado!.portaCartoes)
        this.nStages -= 1;

        return estado!.enderecoAtual;
    }
    public async nextStage(hvm:HVM){

        if(hvm.getState() == "DESLIGADO"){
            return;
        }
        const enderecoAtual = hvm.epi.lerRegistro()
        this.estados.push(new DAO(hvm, enderecoAtual))
        this.nStages += 1;
        await hvm.executarPasso()
        
    }
    
}
import Calculadora from "./Calculadora"
import Chico from "./Chico"
import EPI from "./EPI"
import FolhaDeSaida from "./FolhaDeSaida"
import Gaveteiro from "./Gaveteiro"
import PortaCartoes from "./PortaCartoes"
import HVMState, { HVM_mode } from "../state/HVMState"
import { sleep } from "../utils/sleep"
import DrawerLanguage from "../syntax/language/DrawerLanguage"
import DLToken, { DLType } from "../syntax/tokens/DLToken"
import Debugger from "./Debugger"
import DebuggerState from "../state/DebuggerState"

export default class HVM {

    private state:HVMState = 'DESLIGADO'
    private mode:HVM_mode = "EXECUÇÃO"

    public stack: HVM[] = []
    public clock = (state:HVMState) => {}

    public debugger = new Debugger()
    public calculadora = new Calculadora()
    public chico = new Chico()
    public epi = new EPI()
    public folhaDeSaida = new FolhaDeSaida()
    public gaveteiro = new Gaveteiro()
    public portaCartoes = new PortaCartoes()

    private delay = 0

    public async run(code:string, mode:HVM_mode = "EXECUÇÃO", debugState:DebuggerState = "EXECUTANDO") {

        await this.portaCartoes.inserir(...code.split(/\s+/))

        this.mode = mode;
        await this.executable()
    }
    public getMode(){
        return this.mode
    }

    public async executarPasso(){

        const syntax = new DrawerLanguage()
        if (this.delay > 0) 
            await sleep(this.delay)

        let token:DLToken

        if (this.state == 'EXECUÇÃO')
            token = syntax.lexer(await this.chico.proximaInstrucao(this.gaveteiro, this.epi))
        else
            token = syntax.lexer(this.gaveteiro.getGavetas()[this.epi.lerRegistro()])

        const instrucao = token.getType()

        const EE = token.getValue()

        this.state = await this.interpetInstruction(instrucao, EE);

        this.stack.push(this)

        this.clock(this.state)
        
        return this.state;
    }
    
    private async carga(){
        this.state = "CARGA"

        await this.chico.carga(this.gaveteiro, this.portaCartoes, this.delay, this.clock);   
        
        this.state = "EXECUÇÃO"

        this.clock(this.state)
    }

    public async execute(){
        
        if(this.mode != "DEPURAÇÃO")
            return;

        while(this.debugger.getState() == "EXECUTANDO"){
                
            this.state = await this.executarPasso()
        }
    }

    private async executable() {

        this.carga()
        
        if(this.mode == "EXECUÇÃO")
            while(this.state != "DESLIGADO")
            {
                this.state = await this.executarPasso()
            }
        else if(this.mode == "DEPURAÇÃO"){
            while(this.debugger.getState() == "EXECUTANDO"){
                
                this.state = await this.executarPasso()
            }
        }

    }

    private async interpetInstruction(instrucao:DLType, EE:number): Promise<HVMState> {
        
        if (instrucao == "0EE")
            this.chico.cpEE(this.calculadora, this.gaveteiro, EE)

        else if (instrucao == "1EE")
            this.chico.cpAC(this.calculadora, this.gaveteiro, EE)

        else if (instrucao == "2EE")
            this.chico.some(this.calculadora, this.gaveteiro, EE)

        else if (instrucao == "3EE") 
            this.chico.subtraia(this.calculadora, this.gaveteiro, EE)

        else if (instrucao == "4EE") 
            this.chico.multiplique(this.calculadora, this.gaveteiro, EE)
            
        else if (instrucao == "5EE") 
            this.chico.divida(this.calculadora, this.gaveteiro, EE)

        else if (instrucao == "6EE")
            this.chico.se(this.calculadora, this.epi, EE)

        else if (instrucao == "7EE")
            await this.chico.leia(this.gaveteiro, this.portaCartoes, EE)

        else if (instrucao == "8EE")
            this.chico.escreva(this.gaveteiro, this.folhaDeSaida, EE)

        else if (instrucao == "9EE")
            this.chico.para(this.epi, EE)

        else if (instrucao == "0-N")
            this.chico.constante(this.calculadora, EE)

        else if(instrucao == "000") 
            return "DESLIGADO"

        return this.state

    }

    public setDelay(ms:number) {

        this.delay = ms

    }

    public setState(state:HVMState) {

        this.state = state

    }

    public getState() {

        return this.state

    }

    
}
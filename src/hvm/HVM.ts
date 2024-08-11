import Calculadora from "./Calculadora"
import Chico from "./Chico"
import EPI from "./EPI"
import FolhaDeSaida from "./FolhaDeSaida"
import Gaveteiro from "./Gaveteiro"
import PortaCartoes from "./PortaCartoes"
import HVMState from "../state/HVMState"
import { sleep } from "../utils/sleep"
import DrawerLanguage from "../syntax/language/DrawerLanguage"
import DLToken, { DLType } from "../syntax/tokens/DLToken"

export default class HVM {

    private state:HVMState = 'DESLIGADO'

    public stack: HVM[] = []
    public clock = (state:HVMState) => {}

    public calculadora = new Calculadora()
    public chico = new Chico()
    public epi = new EPI()
    public folhaDeSaida = new FolhaDeSaida()
    public gaveteiro = new Gaveteiro()
    public portaCartoes = new PortaCartoes()

    private delay = 0

    public async run(code:string) {

        await this.portaCartoes.inserir(...code.split(/\s+/))

        await this.executable()

    }

    private async executable() {

        let alreadyPerformed = false

        const syntax = new DrawerLanguage()

        this.state = "CARGA"

        await this.chico.carga(this.gaveteiro, this.portaCartoes, this.delay, this.clock);   
        
        this.state = "EXECUÇÃO"

        this.clock(this.state)
        
        do {
    
            if (this.delay > 0) 
                await sleep(this.delay)

            let token:DLToken

            let cache = this.epi.lerRegistro()

            if (this.state == 'EXECUÇÃO')
                token = syntax.lexer(await this.chico.proximaInstrucao(this.gaveteiro, this.epi))
            else
                token = syntax.lexer(this.gaveteiro.getGavetas()[this.epi.lerRegistro()])

            const instrucao = token.getType()

            const EE = token.getValue()
            
            if (cache != this.epi.lerRegistro())
                alreadyPerformed = false

            if (!alreadyPerformed) {

                this.state = await this.interpetInstruction(instrucao, EE);

                this.stack.push(this)

                this.clock(this.state)

                if (cache == this.epi.lerRegistro())
                    alreadyPerformed = true

            }

        } while(this.state != "DESLIGADO");

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
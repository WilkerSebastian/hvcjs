import Calculadora from "./hvm/Calculadora"
import Chico from "./hvm/Chico"
import EPI from "./hvm/EPI"
import FolhaDeSaida from "./hvm/FolhaDeSaida"
import Gaveteiro from "./hvm/Gaveteiro"
import HVM from "./hvm/HVM"
import PortaCartoes from "./hvm/PortaCartoes"

class HVC {

    private code
    private HVM
    private isDebug = false
    private output?:(out:string) => void
    private input?:() => Promise<string>
    
    constructor() {

        this.HVM = new HVM()
        this.code = ""

    }

    public addEventInput(call:() => Promise<string>) {

        this.input = call

    }

    public addEventOutput(call:(out:string) => void) {

        this.output = call

    }

    private async runner(debug?:boolean, delay?:number) {

        this.isDebug == debug ?? true
        this.HVM = new HVM()
        this.HVM.setDelay(delay ?? 0)
        this.HVM.portaCartoes.entrada = this.input
        this.HVM.folhaDeSaida.saida = this.output
        await this.HVM.run(this.code)

    }

    public async run() {

        await this.runner(false)

    }

    public async debug(delay:number) {
        
        await this.runner(true, delay)
    
    }

    public finish() {

        this.HVM.setState("ENDED")

    }

    public stop() {

        if (this.isDebug)
            this.HVM.setState("WAIT")
        else
            console.warn("Não é permitido parar a execução do HVM sem estar em modo de depuração");

    }

    public next() {               

    }

    public back() {



    }
    
    public setCode(code:string) {
        this.code = code
    }
    
    public getCode() {
        return this.code
    }

    public getHVM() {

        return this.HVM

    }

    public getDebug() {

        return this.isDebug

    }

}

export {
    HVC,
    HVM,
    Calculadora,
    Chico,
    EPI,
    FolhaDeSaida,
    Gaveteiro,
    PortaCartoes
}
import Calculadora from "./hvm/Calculadora"
import Chico from "./hvm/Chico"
import EPI from "./hvm/EPI"
import FolhaDeSaida from "./hvm/FolhaDeSaida"
import Gaveteiro from "./hvm/Gaveteiro"
import HVM from "./hvm/HVM"
import PortaCartoes from "./hvm/PortaCartoes"
import HVMState from "./state/HVMState"

class HVC {

    private code
    private HVM
    private output?: (out:string) => void
    private input?: () => Promise<string>
    private clock = (state:HVMState) => {}

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

    public addEventClock(call:(HVM:HVMState) => void) {

        this.clock = call

    }

    private async runner(delay?:number) {

        this.HVM = new HVM()
        this.HVM.setDelay(delay ?? 0)
        this.HVM.portaCartoes.entrada = this.input
        this.HVM.folhaDeSaida.saida = this.output
        this.HVM.clock = this.clock
        await this.HVM.run(this.code)

    }

    public async run() {

        await this.runner()

    }

    public async debug(delay:number) {

        await this.runner(delay)

    }

    public finish() {

        this.HVM.setState("DESLIGADO")

    }

    public stop() {

        this.HVM.setState("ESPERANDO")

    }

    public continue() {

        this.HVM.setState("EXECUÇÃO")

    }

    public next() {               

        this.HVM.epi.registrar(this.HVM.epi.lerRegistro() + 1)

    }

    public back() {

        const hvm = this.HVM.stack.pop()

        if (hvm)
            this.HVM = hvm

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
import Calculadora from "./hvm/Calculadora"
import Chico from "./hvm/Chico"
import EPI from "./hvm/EPI"
import FolhaDeSaida from "./hvm/FolhaDeSaida"
import Gaveteiro from "./hvm/Gaveteiro"
import HVM from "./hvm/HVM"
import PortaCartoes from "./hvm/PortaCartoes"
import HVMState from "./state/HVMState"

/**
 * A classe HVC controla a execução de uma máquina virtual do computador gaveta HVM.
 */
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

    /**
     * Adiciona um evento de entrada que será chamada tova vez que o HVM executar
     * a instrução 7EE.
     * @param call Função que retorna uma promessa com a entrada de string.
     */
    public addEventInput(call:() => Promise<string>) {

        this.input = call

    }

    /**
     * Adiciona um evento de saída que será chamada tova vez que o HVM executar
     * a instrução 8EE.
     * @param call Função que recebe a saída de string.
     */
    public addEventOutput(call:(out:string) => void) {

        this.output = call

    }

    /**
     * Adiciona um evento de clock que será chamado em todo momento
     * que o HVM realizar uma operação.
     * @param call Função que recebe o estado da HVM.
     */
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

    /**
     * Inicia a execução da HVM.
     */
    public async run() {

        await this.runner()

    }

    /**
     * Executa a HVM em modo de depuração com atraso especificado.
     * @param delay Tempo de atraso em milissegundos.
     */
    public async debug(delay:number) {

        await this.runner(delay)

    }

    /**
     * Finaliza a execução da HVM.
     */
    public finish(): void {
        this.HVM.setState("DESLIGADO")
    }

    /**
     * Pausa a execução da HVM.
     */
    public stop(): void {
        this.HVM.setState("ESPERANDO")
    }

    /**
     * Continua a execução da HVM.
     */
    public continue(): void {
        this.HVM.setState("EXECUÇÃO")
    }

    /**
     * Avança para o próximo estado da HVM.
     */
    public next(): void {               
        this.HVM.epi.registrar(this.HVM.epi.lerRegistro() + 1)
    }

    /**
     * Reverte para o estado anterior da HVM.
     */
    public back(): void {
        const hvm = this.HVM.stack.pop()
        if (hvm) this.HVM = hvm
    }
    
    /**
     * Define o código a ser executado pela HVM.
     * @param code Código em string.
     */
    public setCode(code: string): void {
        this.code = code
    }
    
    /**
     * Retorna o código atualmente definido.
     * @returns Código em string.
     */
    public getCode(): string {
        return this.code
    }

    /**
     * Retorna a instância da HVM.
     * @returns Instância da HVM.
     */
    public getHVM(): HVM {
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
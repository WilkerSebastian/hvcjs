import HVM from "./hvm/HVM"
import HVMState, { HVM_mode } from "./state/HVMState"

/**
 * A classe HVC controla a execução de uma máquina virtual do computador gaveta HVM.
 */
export default class HVC {

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

    private async runner(mode?:HVM_mode, delay?:number) {

        this.HVM = new HVM()
        this.HVM.setDelay(delay ?? 0)
        this.HVM.portaCartoes.entrada = this.input
        this.HVM.folhaDeSaida.saida = this.output
        this.HVM.clock = this.clock
        await this.HVM.run(this.code, mode)

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

        await this.runner("DEPURAÇÃO", delay)

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
        if(this.HVM.getMode() != "DEPURAÇÃO")
            return;
        this.HVM.debugger.setState("PARADO")
    }

    /**
     * Continua a execução da HVM.
     */
    public async continue() {
        this.HVM.debugger.setState("EXECUTANDO");
        await this.HVM.execute()
    }

    /**
     * Avança para o próximo estado da HVM.
     */
    public next(): void {
        if(this.HVM.getMode() != "DEPURAÇÃO")
            return;               
        this.HVM.debugger.nextStage(this.HVM)
    }

    /**
     * Reverte para o estado anterior da HVM.
     */
    public back() {
        if(this.HVM.getMode() != "DEPURAÇÃO")
            return -1;
        return this.HVM.debugger.loadLastStage(this.HVM)
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
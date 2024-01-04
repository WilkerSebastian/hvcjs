export class Calculadora {
    soma(valor: number): void;
    subtraia(valor: number): void;
    multiplicar(valor: number): void;
    divida(valor: number): void;
    acumular(valor: number): string;
    getAcumulador(): number;
}
export class PortaCartoes {
    conteudo: string[];
    entrada?: () => Promise<string>;
    inserir(...cartoes: string[]): Promise<void>;
    lerCartao(): string | undefined;
    solicitarCartao(): Promise<void>;
}
export class Gaveteiro {
    constructor(max_gavetas?: number);
    getGavetas(): string[];
    carga(portaCartao: PortaCartoes, delay: number): Promise<void>;
    registrar(endereco: number, valor: string): void;
    ler(endereco: number): string;
}
export class EPI {
    registrar(registro: number): void;
    lerRegistro(): number;
}
export class FolhaDeSaida {
    saida?: (out: string) => void;
    imprimir(texto: string): void;
}
type HVMState = "CHARGE" | "RUNNING" | "WAIT" | "ENDED";
export class Chico {
    carga(gaveteiro: Gaveteiro, portaCartao: PortaCartoes, delay: number): Promise<void>;
    proximaInstrucao(gaveteiro: Gaveteiro, epi: EPI): Promise<string>;
    cpEE(calculadora: Calculadora, gaveteiro: Gaveteiro, endereco: number): string;
    cpAC(calculadora: Calculadora, gaveteiro: Gaveteiro, endereco: number): void;
    some(calculadora: Calculadora, gaveteiro: Gaveteiro, endereco: number): void;
    subtraia(calculadora: Calculadora, gaveteiro: Gaveteiro, endereco: number): void;
    multiplique(calculadora: Calculadora, gaveteiro: Gaveteiro, endereco: number): void;
    divida(calculadora: Calculadora, gaveteiro: Gaveteiro, endereco: number): void;
    se(calculadora: Calculadora, epi: EPI, endereco: number): void;
    leia(gaveteiro: Gaveteiro, pc: PortaCartoes, endereco: number): Promise<void>;
    escreva(gaveteiro: Gaveteiro, fs: FolhaDeSaida, endereco: number): void;
    para(epi: EPI, endereco: number): void;
    constante(calculadora: Calculadora, valor: number): string;
    pare(): HVMState;
}
export class HVM {
    calculadora: Calculadora;
    chico: Chico;
    epi: EPI;
    folhaDeSaida: FolhaDeSaida;
    gaveteiro: Gaveteiro;
    portaCartoes: PortaCartoes;
    run(code: string): Promise<void>;
    executable(): Promise<void>;
    setDelay(ms: number): void;
    setState(state: HVMState): void;
}
export class HVC {
    constructor();
    addEventInput(call: () => Promise<string>): void;
    addEventOutput(call: (out: string) => void): void;
    run(): Promise<void>;
    debug(delay: number): Promise<void>;
    finish(): void;
    stop(): void;
    next(): void;
    back(): void;
    setCode(code: string): void;
    getCode(): string;
    getHVM(): HVM;
    getDebug(): boolean;
}

//# sourceMappingURL=HVC.d.ts.map

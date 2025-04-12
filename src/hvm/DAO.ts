import HVM from "./HVM";

export default class DAO{
    valorEpi:number;
    gaveteiro:string[] = [];
    folhaDeSaida:string[] = [];
    portaCartoes:string[] = [];
    acumulador:number;
    enderecoAtual:number;

    constructor(hvm:HVM, enderecoAtual:number){
        
        this.valorEpi = hvm.epi.lerRegistro();
        this.folhaDeSaida = structuredClone(hvm.folhaDeSaida.getText() as string[]);
        this.acumulador = hvm.calculadora.getAcumulador();
        
        this.gaveteiro = new Array<string>(hvm.gaveteiro.getGavetas().length)

        for(let i = 0; i < hvm.gaveteiro.getGavetas().length; i++)
            this.gaveteiro[i] = hvm.gaveteiro.getGavetas()[i]

        const cartoes = hvm.portaCartoes.getCartoes() as string[]
        
        for(let i = 0; i < cartoes.length; i++)
            this.portaCartoes.push(cartoes[i])

        this.enderecoAtual = enderecoAtual;
        
    }
}
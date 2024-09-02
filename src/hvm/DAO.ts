import HVM from "./HVM";

export default class DAO{
    valorEpi:number;
    gaveteiro:string[] = [];
    folhaDeSaida:string;
    portaCartoes:string[] = [];
    acumulador:number;
    enderecoAtual:number;

    constructor(hvm:HVM, enderecoAtual:number){
        
        this.valorEpi = hvm.epi.lerRegistro();
        this.folhaDeSaida = hvm.folhaDeSaida.getText();
        this.acumulador = hvm.calculadora.getAcumulador();
        
        this.gaveteiro = new Array<string>(hvm.gaveteiro.getGavetas().length)

        for(let i = 0; i < hvm.gaveteiro.getGavetas().length; i++)
            this.gaveteiro[i] = hvm.gaveteiro.getGavetas()[i]

        for(let c in hvm.portaCartoes.getCartoes()){
            this.portaCartoes.push(c);
        }
        this.enderecoAtual = enderecoAtual;
        
    }
}
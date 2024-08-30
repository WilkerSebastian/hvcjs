import HVM from "./HVM";

export default class DAO{
    valorEpi:number;
    gaveteiro:string[] = [];
    folhaDeSaida:string;
    portaCartoes:string[] = [];
    acumulador:number;
    estadoAtual:number;

    constructor(hvm:HVM, estadoAtual:number){
        
        this.valorEpi = hvm.epi.lerRegistro();
        this.folhaDeSaida = hvm.folhaDeSaida.getText();
        this.acumulador = hvm.calculadora.getAcumulador();

        for(let g in hvm.gaveteiro.getGavetas()){
            this.gaveteiro.push(g);
        }

        for(let c in hvm.portaCartoes.getCartoes()){
            this.portaCartoes.push(c);
        }
        this.estadoAtual = estadoAtual;
    }
}
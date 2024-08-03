import Gaveteiro from "./Gaveteiro";
import EPI from "./EPI";
import Calculadora from "./Calculadora";
import FolhaDeSaida from "./FolhaDeSaida";
import PortaCartoes from "./PortaCartoes";
import HVMState from "../state/HVMState";

export default class Chico {

    public carga(gaveteiro:Gaveteiro, portaCartao:PortaCartoes, delay:number, call:(state:HVMState) => void){
        
        return gaveteiro.carga(portaCartao, delay, call);
    }

    public async proximaInstrucao(gaveteiro:Gaveteiro , epi:EPI) {

        const registroAtual = epi.lerRegistro();
        
        epi.registrar(registroAtual + 1);
                
        const registro = gaveteiro.ler(registroAtual);

        return registro
     
    }

    public cpEE(calculadora:Calculadora, gaveteiro:Gaveteiro, endereco:number) {

        const valor = parseInt(gaveteiro.ler(endereco));
    
        return calculadora.acumular(valor);
    
    }

    public cpAC(calculadora:Calculadora, gaveteiro:Gaveteiro, endereco:number) {

        const acumulador = calculadora.getAcumulador();
    
        return gaveteiro.registrar(endereco, acumulador.toString());
    
    }

    public some(calculadora:Calculadora, gaveteiro:Gaveteiro, endereco:number) {

        const valor = parseInt(gaveteiro.ler(endereco));
        
    
        return calculadora.soma(valor);
    
    }

    public subtraia(calculadora:Calculadora, gaveteiro:Gaveteiro, endereco:number) {

        const valor = parseInt(gaveteiro.ler(endereco));
    
        return calculadora.subtraia(valor);
    
    }    

    public multiplique(calculadora:Calculadora, gaveteiro:Gaveteiro, endereco:number) {

        const valor = parseInt(gaveteiro.ler(endereco));
    
        return calculadora.multiplicar(valor);
    
    }
    
    public divida(calculadora:Calculadora, gaveteiro:Gaveteiro, endereco:number) {
    
        const valor = parseInt(gaveteiro.ler(endereco));
    
        return calculadora.divida(valor);
        
    }
    
    public se(calculadora:Calculadora, epi:EPI, endereco:number) {
    
        if(calculadora.getAcumulador() > 0) {
    
            return epi.registrar(endereco);
    
        }
    
    }
    
    public async leia(gaveteiro:Gaveteiro, pc:PortaCartoes, endereco:number) {
    
        let valor = pc.lerCartao();

        if (!valor) {

            await pc.solicitarCartao()            

            valor = pc.lerCartao()
            
        }
    
        return gaveteiro.registrar(endereco, valor as string);
    
    }
    
    public escreva(gaveteiro:Gaveteiro, fs:FolhaDeSaida, endereco:number) {
    
        const output = gaveteiro.ler(endereco);
    
        return fs.imprimir(output);
    
    }
    
    public para(epi:EPI, endereco:number) { // Ir para
     
        return epi.registrar(endereco);
    
    }
    
    public constante( calculadora:Calculadora, valor:number) {
    
        return calculadora.acumular(valor);
    
    }
    
    public pare():HVMState { //Finalizar

        return "DESLIGADO"
    
    }
    

}
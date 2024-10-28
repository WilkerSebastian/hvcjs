import HVMState from "../state/HVMState";
import { sleep } from "../utils/sleep";
import PortaCartoes from "./PortaCartoes";

export default class Gaveteiro {

  private ultimoRestrito:number;
  private gavetas:string[];

  constructor(max_gavetas:number = 100) {

    this.gavetas = new Array<string>(max_gavetas)
    this.ultimoRestrito = 0

  }

  public getGavetas() {

    return this.gavetas

  }

  public async carga(portaCartao:PortaCartoes, delay:number, call:(state:HVMState) => void){
    
    let index = 0
    let final = false;

    while(!final) {

      if (delay > 0)
        await sleep(delay);
      
      const cartao = portaCartao.lerCartao()
      
      call("CARGA")
      
      if (cartao) {

        this.registrar(index, cartao)

        call("CARGA")
        
        final = cartao == "000"

      } else
        throw new Error("Falha na carga do porta cartões para gaveteiro.");

      index++

    }

    this.ultimoRestrito = index
      
  }

  public registrar(endereco: number, valor: string) {

    if(endereco + 1 > this.gavetas.length)
      throw new Error(`Sobrecarga de gavetas. Limite de ${this.gavetas.length} registros.`);
    else if(endereco < 0)
      throw new Error(`Estouro negativo de gavetas. As gavetas vão de 0 a ${this.gavetas.length} registros.`);

    if((endereco < this.ultimoRestrito) && this.ultimoRestrito > 0){
      const conteudo = this.ler(endereco);
      throw new Error(`Tentativa de sobrescrita em gaveta que armazena código fonte. Conteúdo da gaveta [${endereco}]: ${conteudo}.`);
    }

    const numeric_value = parseInt(valor)

    if (numeric_value < -99 || numeric_value > 999)
      throw new Error(`Valor inválido de escrita em gaveta [${endereco}]:${numeric_value}.`)

    this.gavetas[endereco] = valor

  }

  public setGavetas(gvts:string[]){
    for(let i = 0; i < gvts.length; i++){
      this.gavetas[i] = gvts[i]
    }
  }

  public ler(endereco: number){

    if (endereco < 0 || endereco > this.gavetas.length || !this.gavetas[endereco])   
      throw new Error(`Tentativa de leitura em endereço inexistente. Gaveta [${endereco}].`);


    return this.gavetas[endereco];

  }

}
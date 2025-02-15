import HVMState from "../state/HVMState";
import { Internalization } from "../utils/Internalization";
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

  public async carga(portaCartao:PortaCartoes, call:(state:HVMState) => void){
    
    let final = false;
    
    const cartao = portaCartao.lerCartao()
    
    call("CARGA")
    
    if (cartao) {

      this.registrar(this.ultimoRestrito, cartao)

      call("CARGA")
      
      final = cartao == "000"

    } else
      throw new Error(Internalization.getInstance().translate("carga_error"));


    this.ultimoRestrito++;
    
    return final;
  }

  public registrar(endereco: number, valor: string) {

    if(endereco + 1 > this.gavetas.length)
      throw new Error(Internalization.getInstance().translateAndReplace("overflow_gav", this.gavetas.length))

    else if(endereco < 0)
      throw new Error(Internalization.getInstance().translateAndReplace("underflow_gav", this.gavetas.length));

    if((endereco < this.ultimoRestrito) && this.ultimoRestrito > 0){
      const conteudo = this.ler(endereco);
      throw new Error(Internalization.getInstance().translateAndReplace("invalid_superscript", endereco, conteudo));
    }

    const numeric_value = parseInt(valor)

    if (numeric_value < -99 || numeric_value > 999)
      throw new Error(Internalization.getInstance().translateAndReplace("invalid_gav_value", endereco, numeric_value));

    this.gavetas[endereco] = valor

  }

  public setGavetas(gvts:string[]){
    for(let i = 0; i < gvts.length; i++){
      this.gavetas[i] = gvts[i]
    }
  }

  public ler(endereco: number){

    if (endereco < 0 || endereco > this.gavetas.length || !this.gavetas[endereco])   
      throw new Error(Internalization.getInstance().translateAndReplace("read_null_gav", endereco));


    return this.gavetas[endereco];

  }

}
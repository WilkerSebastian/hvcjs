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
          throw new Error("Falha na carga do porta cartões para gaveteiro");

        index++

      }

      this.ultimoRestrito = index
        
    }
  
    public registrar(endereco: number, valor: string) {

      if(endereco + 1 > this.gavetas.length) {

        throw new Error(`Erro de sobrecarga de gavetas, limite de ${this.gavetas.length} registros`)

      } else {
        

        if((endereco < this.ultimoRestrito) && this.ultimoRestrito > 0){
            const conteudo = this.ler(endereco);
            throw new Error(`Erro tentativa de sobrescrita de gaveta que armazena código fonte conteúdo da gaveta(${endereco}): ${conteudo}`);
        }

        const numeric_value = parseInt(valor)

        if (numeric_value < 0 || numeric_value > 999)
          throw new Error(`Valor invalido de escrita na gaveta [${endereco}]:${numeric_value}`)

      }

      this.gavetas[endereco] = valor

    }
  
    public ler(endereco: number){

      if (endereco < 0 || endereco > this.gavetas.length || !this.gavetas[endereco])   
        throw new Error(`Erro na leitura do gaveteiro no endereço ${endereco}, tentativa de leitura em endereço inexistente`);


      return this.gavetas[endereco];

    }

  }
  
import { Internalization } from "../utils/Internalization";

export default class Calculadora {
    
  private acumulador = 0;

  public soma(valor:number) {
    
    this.acumular(this.acumulador + valor)

  }

  public subtraia(valor:number) {

    this.acumular(this.acumulador - valor)

  }

  public multiplicar(valor:number) {

    this.acumular(this.acumulador * valor);

  }

  public divida(valor:number) {

    this.acumular(this.acumulador / valor);

  }

  public acumular(valor:number) {

    valor = Math.floor(valor);
  
    if(valor < -99 || valor > 999) 
      throw new Error(Internalization.getInstance().translateAndReplace("limit_number_calc", valor));
        
    this.acumulador = valor;
  
  }
  
  public getAcumulador() {
  
    return this.acumulador;
  
  }

}
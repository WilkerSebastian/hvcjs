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

      valor = parseInt(valor.toString())
    
      if(valor < -99 || valor > 999) 
        throw new Error(`Erro calculadora ${valor}. Apenas valores entre 0-999 são aceitos.`);
          
      this.acumulador = valor;
    
    }
    
    public getAcumulador() {
    
      return this.acumulador;
    
    }

}
export default class Calculadora {
    
    private acumulador = 0;
  
    public soma(valor:number) {
      
      if (valor < 0 || valor + this.acumulador > 999) 
        throw new Error(`Erro na operação ${this.acumulador} + ${valor} = ${valor + this.acumulador}, único valor aceito como resultado é entre 0-999`);
  
      this.acumulador += valor;
      
    }
  
    public subtraia(valor:number) {
      
      if (valor < 0 || valor + this.acumulador > 999) 
        throw new Error(`Erro na operação ${this.acumulador} - ${valor} = ${valor - this.acumulador}, único valor aceito como resultado é entre 0-999`);
  
      this.acumulador -= valor;

    }
  
    public multiplicar(valor:number) {
      
      if (valor < 0 || valor + this.acumulador > 999) 
          throw new Error(`Erro na operação ${this.acumulador} * ${valor} = ${valor * this.acumulador}, único valor aceito como resultado é entre 0-999`);
        
      this.acumulador *= valor;

    }
  
    public divida(valor:number) {

      if (valor < 0 || valor + this.acumulador > 999) 
        throw new Error(`Erro na operação ${this.acumulador} / ${valor} = ${valor / this.acumulador}, único valor aceito como resultado é entre 0-999`);
       
      this.acumulador = parseInt((parseInt(this.acumulador.toString()) / parseInt(valor.toString())).toString());

    }

    public acumular(valor:number) {
    
        if(valor < 0 || valor > 999) 
          throw new Error(`Erro na escrita do valor ${valor} no gaveteiro. Apenas valores entre 0-999 são aceitos.`);
            
        this.acumulador = valor;

        return "sucesso"
    
    }
    
    public getAcumulador() {
    
      return this.acumulador;
    
    }

}
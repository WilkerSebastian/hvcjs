// Testes para linguagem de gaveta
// TODO: Dividir os testes em outros arquivos
import { describe, it, expect } from "bun:test"

import { HVC } from "../dist/index.mjs"

const hvc = new HVC()

let entradas:string[] = []
let saida = ""
let pos_entrada = 0

hvc.addEventInput(async() => {

  if(entradas.length >= pos_entrada){
    pos_entrada += 1;
    return entradas[pos_entrada -1] as string
  }

  return ""

})

hvc.addEventOutput(out => {
  
  saida += (out + '\n')

})

describe('Entrada e Saída', () => {
    it('Leitura de valor 10 e com saída da gaveta onde ficou a entrada', async() => {

      entradas = []
      saida = ""

      entradas.push("10")

      hvc.setCode("750 850 000")

      await hvc.run()

      expect(saida).toBe("10\n");

    });
    it('Ciclo de repetição com saída de 5 a 1', async() => {

      entradas = []
      saida = ""

      hvc.setCode("0-1 140 0-6 340 120 607 909 820 903 000")

      await hvc.run()

      expect(saida).toBe("5\n4\n3\n2\n1\n");

    });
    it('lendo dado de rodata', async() => {
      entradas = []
      saida = ""

      hvc.setCode("740 840 000 25")

      await hvc.run()

      expect(saida).toBe("25\n");
    })
});

describe('Calculadora', () => {
  it('Operações de soma', async() => {

    entradas = []
    saida = ""

    hvc.setCode("0-100 130 230 230 230 230 150 850 000")

    await hvc.run()

    expect(saida).toBe("500\n");

  });
  it('Operações de subtração', async() => {

    entradas = []
    saida = ""

    hvc.setCode("0-250 140 840 0-50 150 040 350 170 870 606 000")

    await hvc.run()

    expect(saida).toBe("250\n200\n150\n100\n50\n0\n");

  });
  it('Operações de divisão', async() => {

    entradas = []
    saida = ""

    hvc.setCode("0-101 180 0-2 140 0-1 175 080 375 180 080 540 150 440 155 275 080 355 606 880 080 606 000")

    await hvc.run()

    expect(saida).toBe("100\n98\n96\n94\n92\n90\n88\n86\n84\n82\n80\n78\n76\n74\n72\n70\n68\n66\n64\n62\n60\n58\n56\n54\n52\n50\n48\n46\n44\n42\n40\n38\n36\n34\n32\n30\n28\n26\n24\n22\n20\n18\n16\n14\n12\n10\n8\n6\n4\n2\n0\n")

  });
  it('Operações de multiplicação', async() => {

    entradas = []
    saida = ""

    hvc.setCode("0-9 195 0-1 181 0-2 180 0-0 480 190 890 090 281 480 190 890 081 281 181 095 381 610 000")

    await hvc.run()

    expect(saida).toBe("0\n2\n8\n24\n64\n");

  });
});

describe('Ocorrência de falhas', () => {
  it('Ultrapassando limite de gavetas', async() => {

    entradas = []
    saida = ""

    hvc.setCode("0-10 0-12 0-13 0-10 0-12 0-13 0-10 0-12 0-13 0-10 0-12 0-13 0-10 0-12 0-13 0-10 0-12 0-13 0-10 0-12 0-13 0-10 0-12 0-13 0-10 0-12 0-13 0-10 0-12 0-13 0-10 0-12 0-13 0-10 0-12 0-13 0-10 0-12 0-13 0-10 0-12 0-13 0-10 0-12 0-13 0-10 0-12 0-13 0-10 0-12 0-13 0-10 0-12 0-13 0-10 0-12 0-13 0-10 0-12 0-13 0-10 0-12 0-13 0-10 0-12 0-13 0-13 0-45 0-34 0-10 0-12 0-13 0-10 0-12 0-13 0-10 0-12 0-13 0-10 0-12 0-13 0-10 0-12 0-13 0-10 0-12 0-13 0-10 0-12 0-13 0-10 0-12 0-13 0-10 0-12 0-13 0-10 0-12 0-13 0-10 0-12 0-13 0-10 0-12 0-13 0-10 0-12 0-13 0-10 0-12 0-13 0-10 0-12 0-13 0-10 0-12 0-13 0-10 0-12 0-13 0-10 0-12 0-13 0-10 0-12 0-13 0-10 0-12 0-13 0-10 0-12 0-13 0-10 0-12 0-13 0-13 0-45 0-34 000")

    await expect(hvc.run()).rejects.toThrow("Erro de sobrecarga de gavetas, limite de 100 registros");

  });
  it('Ultrapassando limite de valor de entrada', async() => {

    entradas = ["10000"]
    pos_entrada = 0
    saida = ""

    hvc.setCode("750 000")

    await expect(hvc.run()).rejects.toThrow("Inserção de um formato desconhecido cartão, conteudo do cartão: 10000");

  });
  it('Tentando acessar gaveta restrita para código fonte', async() => {
    entradas = []
    saida = ""

    hvc.setCode("0-100 100 000")

    await expect(hvc.run()).rejects.toThrow("Erro tentativa de sobrescrita de gaveta que armazena código fonte conteúdo da gaveta(0): 0-100");
  })
  it('Operação com gaveta sem valor', async() => {
    entradas = []
    saida = ""

    hvc.setCode("0-50 130 031 000")

    await expect(hvc.run()).rejects.toThrow("Erro na leitura do gaveteiro no endereço 31, tentativa de leitura em endereço inexistente");
  })
  it('Operação com epi para gaveta sem instrução', async() => {
    entradas = []
    saida = ""

    hvc.setCode("0-100 930 000")

    expect(hvc.run()).rejects.toThrow("Erro na leitura do gaveteiro no endereço 30, tentativa de leitura em endereço inexistente");
  })
});

describe('Depurador', ()=>{
  it('Executar direto', async() =>{
    entradas = []
    saida = ""

    hvc.setCode("0-500 150 0-010 250 150 850 000")
    // await hvc.debug(0)
    
    // expect(saida).toBe("510\n");
  })

  it('Pausar e voltar', async() =>{

    entradas = []
    saida = ""

    hvc.setCode("0-500 150 850 0-010 250 150 850 000")

    // setTimeout(() => {
    //   hvc.stop()
    // }, 1000);
    // setTimeout(() => {
    //   hvc.continue()
    // }, 2000);
    // await hvc.debug(80,"RODANDO")
    // expect(saida).toBe("500\n");

    // setTimeout(() => {
      
    //   expect(saida).toBe("500\n510\n");
    // }, 4000);

  })
  
  it("Avançar e retornar estados acumulador e gaveteiro", async() =>{
    entradas = ["020","005"]
    pos_entrada = 0
    saida = ""

    hvc.setCode("0-010 720 721 220 221 122 000")
    await hvc.debug(0, "PAUSADO")

    await hvc.next()
    expect(hvc.getHVM().calculadora.getAcumulador()).toBe(10)

    await hvc.next()
    expect(hvc.getHVM().gaveteiro.getGavetas()[20]).toBe("020")

    await hvc.next()
    expect(hvc.getHVM().gaveteiro.getGavetas()[21]).toBe("005")

    await hvc.back()
    pos_entrada -=1
    expect(hvc.getHVM().gaveteiro.getGavetas()[21]).toBeUndefined()

    await hvc.back()
    pos_entrada -=1
    expect(hvc.getHVM().gaveteiro.getGavetas()[20]).toBeUndefined()
    
    await hvc.next()
    expect(hvc.getHVM().gaveteiro.getGavetas()[20]).toBe("020")
    await hvc.next()
    
    await hvc.next()
    expect(hvc.getHVM().calculadora.getAcumulador()).toBe(30)
    
    await hvc.back()
    expect(hvc.getHVM().calculadora.getAcumulador()).toBe(10)

    await hvc.next()
    await hvc.next()
    expect(hvc.getHVM().calculadora.getAcumulador()).toBe(35)

    await hvc.next()
    expect(hvc.getHVM().gaveteiro.getGavetas()[22]).toBe("35")

    console.log(hvc.getHVM().gaveteiro.getGavetas());
    console.log(hvc.getHVM().calculadora.getAcumulador());
  })
  it("Avançar e voltar estados EPI", async ()=>{

    entradas = ["005","010"]
    pos_entrada = 0
    saida = ""
    hvc.setCode("0-010 720 320 601 000")
    await hvc.debug(0, "PAUSADO")

    await hvc.next()
    await hvc.next()
    await hvc.next()
    expect(hvc.getHVM().epi.lerRegistro()).toBe(3)

    await hvc.next()
    expect(hvc.getHVM().epi.lerRegistro()).toBe(1)
    
    await hvc.back()
    expect(hvc.getHVM().epi.lerRegistro()).toBe(3)

    await hvc.next()
    expect(hvc.getHVM().epi.lerRegistro()).toBe(1)

    await hvc.next()
    await hvc.next()
    await hvc.next()

    expect(hvc.getHVM().calculadora.getAcumulador()).toBe(-5)

    await hvc.next()

    expect(hvc.getHVM().getState()).toBe("DESLIGADO")
    
  })
  it("Avançar e voltar estados saída", async ()=>{

    entradas = ["005","010"]
    pos_entrada = 0
    saida = ""
    hvc.setCode("720 820 720 820 000")
    await hvc.debug(0, "PAUSADO")

    await hvc.next()
    await hvc.next()

    expect(saida).toBe("005\n")

    await hvc.next()
    await hvc.next()

    expect(saida).toBe("005\n010\n")

    await hvc.back()
    expect(saida).toBe("005\n010\n005\n")
    await hvc.next()
    expect(saida).toBe("005\n010\n005\n010\n")
  })
})
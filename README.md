<div align="center">
    <img src="./logo.png" alt="hvcjs">
    <h1>HVCJS</h1>
</div>

O hvcjs é uma versão modularizada do compilador <a href="https://github.com/WilkerSebastian/HV-compiler">HVC</a> original, projetado para ser disponibilizado como um módulo npm. Essa abordagem permite a distribuição eficiente e a manutenção das ferramentas desenvolvidas pela nossa equipe. A intenção do HV é ser uma arquitetura de um computador gaveta, que permite o entendimento de como os componentes do computador gaveta interagem entre si, através de uma abordagem didática de ensino. Esse módulo tem o objetivo de ser uma forma fácil de criar novas aplicações de ensino que usam o computador gaveta, disponibilizando uma interface simples e intuitiva.

Para mais informações sobre o projeto HV veja <a href="https://hvc-pages.onrender.com/">aqui</a>.

Instalação
Para instalar o hvcjs, utilize o seguinte comando no terminal:

```bash
npm i hvcjs
```

### Como Usar

### 1. Estrutura básica

Para usar o hvcjs, basta criar uma instância da classe HVC e definir o código a ser executado usando o método setCode. Em seguida, chame o método run para executar o código.

```ts 
import { HVC } from "hvcjs"

const hvc = new HVC();

hvc.setCode("0-5 020 820 000")

hvc.run()
```

### 2. Saída

AAs instruções de saída do HVC para mostrar ao usuário dependem do evento de saída que pode ser atribuído ao HVC usando o método addEventOutput, 
que recebe uma função com uma string como argumento chamada out, que contém a saída que a folha de saída irá imprimir.


```ts 
import { HVC } from "hvcjs";

const hvc = new HVC();

hvc.addEventOutput((out: string) => {

    console.log(out);

});

hvc.setCode("0-5 120 820 000");

hvc.run();
```

### 3. Entrada

As instruções de entrada do HVC dependem do evento de entrada que pode ser atribuído ao HVC usando o método addEventInput, 
que recebe uma função que retorna uma promessa de uma string. A string retornada pela promessa será a entrada inserida na porta de cartões. 
No exemplo abaixo, o evento de entrada recebe uma string inserida pelo usuário no terminal, mas pode ser qualquer outra fonte

```ts
import { HVC } from "hvcjs";

const hvc = new HVC();

hvc.addEventOutput((out: string) => {

    console.log(out);

});

hvc.addEventInput(async() => {

    let input = "";

    for await (const line of console) {

        input = line;
        break;

    }
    
    return input;

})

hvc.setCode("720 820 000");

hvc.run();
```

### 4. Clock

Para ter acesso a informações da HVM (HV Virtual Machine) enquanto o código é executado, basta atribuir um evento de clock ao HVC usando o método addEventClock, que recebe uma função com o estado da HVM como argumento. Esse estado pode ser "CARGA", "EXECUCAO", "ESPERANDO" ou "DESLIGADO". Um exemplo de uso do clock pode ser visto abaixo, onde as gavetas com conteúdo são impressas quando o estado da HVM for "CARGA".

```ts 
import { HVC, type HVMState } from "hvcjs";

const hvc = new HVC();

hvc.addEventOutput((out: string) => {

    console.log(out);

});

hvc.addEventInput(async() => {

    let input = "";

    for await (const line of console) {

        input = line;
        break;

    }
    
    return input;

})

hvc.addEventClock((hvmState: HVMState) => {
  
    if (hvmState == "CARGA") {

        const hvm = hvc.getHVM();

        const gavetasComConteudo = hvm.gaveteiro.getGavetas().filter((gaveta) => gaveta);

        console.log(gavetasComConteudo);

    }


})

hvc.setCode("720 820 000");

hvc.run();
```

### 5. Debug

#### 5.1 Método debug

Para acessar o modo de depuração do HVC, em vez de executar o código com o método run(), chame o método debug(). O método debug() recebe dois argumentos: o primeiro representa o delay em milissegundos e o segundo representa o status do debug.

O delay é o tempo em milissegundos que o HVC aguardará antes de executar uma ação.

É possível adicionar a flag pularCarga, que, quando verdadeira, ignora o delay para o estado de carga, passando direto para a execução. Isto é útil para códigos grandes que precisam ser depurados cuidadosamente.

O status do debug pode ser "RODANDO" ou "PAUSADO". Por padrão, o status do debug começará como "RODANDO", mas manterá sempre o último estado em que se encontrou na última execução. Caso um status seja passado, ele será considerado. Com o status "PAUSADO", o HVM começa parado, permitindo que você tenha controle desde a primeira ação.

```ts
// void debug(delay: number, pularCarga:boolean = false, status?: DebuggerState)
hvc.debug(200, true, "PAUSADO")
```

#### 5.2 Métodos stop e continue

Para parar o HVM a qualquer momento durante a depuração, 
basta chamar o método stop(), fazendo com que o depurador altere seu estado para "PAUSADO".

```ts
hvc.stop()
```

Para continuar o HVM a qualquer momento durante a depuração, basta chamar o método continue(), 
fazendo com que o depurador altere seu estado para "RODANDO".

```ts
hvc.continue()
```

### 5.3 Métodos next e back

Uma vez que o HVM estiver parado e em modo de depuração, basta chamar o método next() para avançar para a próxima instrução do HVM.

```ts
hvc.next()
```

E chame o método back() para voltar para a instrução anterior do HVM.

```ts
hvc.back()
```

### 6. HVM

Para acessar a HVM, basta chamar o método getHVM() para obter o HVM, onde você poderá acessar os componentes que formam o 
HV por meio dos atributos listados na tabela abaixo. Cada um desses componentes tem métodos e propriedades autoexplicativas, 
com base na arquitetura do HV.

| Atributo | Descrição |
|---|---|
| **portaCartoes** | Representa a porta de cartões do HV |
| **folhaDeSaida** | Representa a folha de saída do HV |
| **chico** | Representa o chico do HV |
| **calculadora** | Representa a calculadora do HV |
| **epi** | Representa o epi do HV |
| **gaveteiro** | Representa o gaveteiro do HV |

```ts
const hvm = hvc.getHVM()

const epi = hvm.epi;
```

### Contribuição

Se você deseja contribuir para o desenvolvimento do hvcjs, basta criar uma issue no repositório do GitHub.

### Licensa

O HVCJS está licenciado sob a licença MIT.

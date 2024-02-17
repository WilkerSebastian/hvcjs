# HVC WEB

O HVC WEB é uma versão modularizada do compilador <a href="https://github.com/WilkerSebastian/HV-compiler">HVC</a> original, projetado para ser disponibilizado como um módulo npm. Essa abordagem permite a distribuição eficiente e a manutenção das ferramentas proprietárias desenvolvidas pela nossa equipe.

### Instalação
Para instalar o HVC WEB, utilize o seguinte comando no terminal:
```bash
npm i hvcjs
```

### Como Usar

No exemplo TypeScript abaixo, uma instância do HVC é criada. Em seguida, são configurados o método addEventOutput (responsável por definir o evento de saída), o código através do método setCode, e por fim, o código é executado usando o método run.
```typescript
import { HVC } from "hvcjs"

const hvc = new HVC()

hvc.addEventOutput((out:string) => {

    console.log(out);

})

hvc.setCode("740 840 000 20")

hvc.run()
```
Personalize o código conforme necessário e ajuste os parâmetros de acordo com os requisitos do seu projeto. Esta descrição fornece uma visão clara e concisa do propósito e uso do HVC WEB.

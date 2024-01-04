class $a8365a11b4defac1$export$2e2bcd8739ae039 {
    soma(valor) {
        if (valor < 0 || valor + this.acumulador > 999) throw new Error(`Erro na opera\xe7\xe3o ${this.acumulador} + ${valor} = ${valor + this.acumulador}, \xfanico valor aceito como resultado \xe9 entre 0-999`);
        this.acumulador += valor;
    }
    subtraia(valor) {
        if (valor < 0 || valor + this.acumulador > 999) throw new Error(`Erro na opera\xe7\xe3o ${this.acumulador} - ${valor} = ${valor - this.acumulador}, \xfanico valor aceito como resultado \xe9 entre 0-999`);
        this.acumulador -= valor;
    }
    multiplicar(valor) {
        if (valor < 0 || valor + this.acumulador > 999) throw new Error(`Erro na opera\xe7\xe3o ${this.acumulador} * ${valor} = ${valor * this.acumulador}, \xfanico valor aceito como resultado \xe9 entre 0-999`);
        this.acumulador *= valor;
    }
    divida(valor) {
        if (valor < 0 || valor + this.acumulador > 999) throw new Error(`Erro na opera\xe7\xe3o ${this.acumulador} / ${valor} = ${valor / this.acumulador}, \xfanico valor aceito como resultado \xe9 entre 0-999`);
        this.acumulador = parseInt((parseInt(this.acumulador.toString()) / parseInt(valor.toString())).toString());
    }
    acumular(valor) {
        if (valor < 0 || valor > 999) throw new Error(`Erro na escrita do valor ${valor} no gaveteiro. Apenas valores entre 0-999 s\xe3o aceitos.`);
        this.acumulador = valor;
        return "sucesso";
    }
    getAcumulador() {
        return this.acumulador;
    }
    constructor(){
        this.acumulador = 0;
    }
}


class $56f1c32018af66c9$export$2e2bcd8739ae039 {
    carga(gaveteiro, portaCartao, delay) {
        return gaveteiro.carga(portaCartao, delay);
    }
    async proximaInstrucao(gaveteiro, epi) {
        const registroAtual = epi.lerRegistro();
        epi.registrar(registroAtual + 1);
        const registro = gaveteiro.ler(registroAtual);
        return registro;
    }
    cpEE(calculadora, gaveteiro, endereco) {
        const valor = parseInt(gaveteiro.ler(endereco));
        return calculadora.acumular(valor);
    }
    cpAC(calculadora, gaveteiro, endereco) {
        const acumulador = calculadora.getAcumulador();
        return gaveteiro.registrar(endereco, acumulador.toString());
    }
    some(calculadora, gaveteiro, endereco) {
        const valor = parseInt(gaveteiro.ler(endereco));
        return calculadora.soma(valor);
    }
    subtraia(calculadora, gaveteiro, endereco) {
        const valor = parseInt(gaveteiro.ler(endereco));
        return calculadora.subtraia(valor);
    }
    multiplique(calculadora, gaveteiro, endereco) {
        const valor = parseInt(gaveteiro.ler(endereco));
        return calculadora.multiplicar(valor);
    }
    divida(calculadora, gaveteiro, endereco) {
        const valor = parseInt(gaveteiro.ler(endereco));
        return calculadora.divida(valor);
    }
    se(calculadora, epi, endereco) {
        if (calculadora.getAcumulador() > 0) return epi.registrar(endereco);
    }
    async leia(gaveteiro, pc, endereco) {
        let valor = pc.lerCartao();
        if (!valor) {
            await pc.solicitarCartao();
            valor = pc.lerCartao();
        }
        return gaveteiro.registrar(endereco, valor);
    }
    escreva(gaveteiro, fs, endereco) {
        const output = gaveteiro.ler(endereco);
        return fs.imprimir(output);
    }
    para(epi, endereco) {
        return epi.registrar(endereco);
    }
    constante(calculadora, valor) {
        return calculadora.acumular(valor);
    }
    pare() {
        return "ENDED";
    }
}


class $c52bc2d2b763957b$export$2e2bcd8739ae039 {
    registrar(registro) {
        if (registro < 0) throw new Error("Erro de sobrecarga da pilha, limite de 100 registros");
        this.valor = registro;
    }
    lerRegistro() {
        return this.valor;
    }
    constructor(){
        this.valor = 0;
    }
}


class $f9a43f308f4d618c$export$2e2bcd8739ae039 {
    imprimir(texto) {
        if (this.saida) {
            this.saida(texto);
            return;
        }
        throw new Error("Nenhuma implementa\xe7\xe3o de sa\xedda encontrada");
    }
}


function $ce9ec27fbafb18ae$export$e772c8ff12451969(ms) {
    return new Promise((resolve)=>setTimeout(resolve, ms));
}


class $6360f057ba6f7c70$export$2e2bcd8739ae039 {
    constructor(max_gavetas = 100){
        this.gavetas = new Array(max_gavetas);
        this.ultimoRestrito = 0;
    }
    getGavetas() {
        return this.gavetas;
    }
    async carga(portaCartao, delay) {
        let index = 0;
        let final = false;
        while(!final){
            if (delay > 0) await (0, $ce9ec27fbafb18ae$export$e772c8ff12451969)(delay);
            const cartao = portaCartao.lerCartao();
            if (cartao) {
                this.registrar(index, cartao);
                final = cartao == "000";
            } else throw new Error("Falha na carga do porta cart\xf5es para gaveteiro");
            index++;
        }
        this.ultimoRestrito = index;
    }
    registrar(endereco, valor) {
        if (endereco + 1 >= this.gavetas.length) throw new Error(`Erro de sobrecarga de gavetas, limite de ${this.gavetas.length} registros`);
        else {
            if (endereco < this.ultimoRestrito && this.ultimoRestrito > 0) {
                const conteudo = this.ler(endereco);
                throw new Error(`Erro tentativa de sobrescrita de gaveta que armazena c\xf3digo fonte conte\xfado da gaveta(${endereco}): ${conteudo}`);
            }
            const numeric_value = parseInt(valor);
            if (numeric_value < 0 || numeric_value > 999) throw new Error(`Valor invalido de escrita na gaveta [${endereco}]:${numeric_value}`);
        }
        this.gavetas[endereco] = valor;
    }
    ler(endereco) {
        if (endereco < 0 || endereco > this.gavetas.length || !this.gavetas[endereco]) throw new Error(`Erro na leitura do gaveteiro no endere\xe7o ${endereco}, tentativa de leitura em endere\xe7o inexistente`);
        return this.gavetas[endereco];
    }
}







class $b0bfc6122cce6590$export$2e2bcd8739ae039 {
    async inserir(...cartoes) {
        cartoes.forEach((e)=>{
            this.conteudo.push(e);
        });
    }
    lerCartao() {
        return this.conteudo.shift();
    }
    async solicitarCartao() {
        if (this.entrada) {
            const input = await this.entrada();
            await this.inserir(input);
            return;
        }
        throw new Error("Nenhuma implementa\xe7\xe3o de entrada encontrada");
    }
    constructor(){
        this.conteudo = [];
    }
}



class $4116510d88b2a97b$export$2e2bcd8739ae039 {
}


class $7004e7e1f3e7081f$export$2e2bcd8739ae039 {
    constructor(type, value){
        this.type = type;
        this.value = value;
    }
    getType() {
        return this.type;
    }
    getValue() {
        return this.value;
    }
}


class $0537f1150770e055$export$2e2bcd8739ae039 extends (0, $7004e7e1f3e7081f$export$2e2bcd8739ae039) {
    constructor(type, value){
        super(type, value);
    }
    getType() {
        return this.type;
    }
}


class $875b0a2d18f2a8a9$export$2e2bcd8739ae039 extends (0, $4116510d88b2a97b$export$2e2bcd8739ae039) {
    lexer(script) {
        let token = null;
        const words = script.split(/\s+/);
        let end = false;
        for(let i = 0; i < words.length; i++){
            let word = words[i];
            if (!end) {
                if (/^000$/.test(word)) {
                    end = true;
                    token = new (0, $0537f1150770e055$export$2e2bcd8739ae039)("000", 0);
                } else if (/^0[0-9]{2}$/.test(word)) token = new (0, $0537f1150770e055$export$2e2bcd8739ae039)("0EE", parseInt(word.substring(1, 3)));
                else if (/^1[0-9]{2}$/.test(word)) token = new (0, $0537f1150770e055$export$2e2bcd8739ae039)("1EE", parseInt(word.substring(1, 3)));
                else if (/^2[0-9]{2}$/.test(word)) token = new (0, $0537f1150770e055$export$2e2bcd8739ae039)("2EE", parseInt(word.substring(1, 3)));
                else if (/^3[0-9]{2}$/.test(word)) token = new (0, $0537f1150770e055$export$2e2bcd8739ae039)("3EE", parseInt(word.substring(1, 3)));
                else if (/^4[0-9]{2}$/.test(word)) token = new (0, $0537f1150770e055$export$2e2bcd8739ae039)("4EE", parseInt(word.substring(1, 3)));
                else if (/^5[0-9]{2}$/.test(word)) token = new (0, $0537f1150770e055$export$2e2bcd8739ae039)("5EE", parseInt(word.substring(1, 3)));
                else if (/^6[0-9]{2}$/.test(word)) token = new (0, $0537f1150770e055$export$2e2bcd8739ae039)("6EE", parseInt(word.substring(1, 3)));
                else if (/^7[0-9]{2}$/.test(word)) token = new (0, $0537f1150770e055$export$2e2bcd8739ae039)("7EE", parseInt(word.substring(1, 3)));
                else if (/^8[0-9]{2}$/.test(word)) token = new (0, $0537f1150770e055$export$2e2bcd8739ae039)("8EE", parseInt(word.substring(1, 3)));
                else if (/^9[0-9]{2}$/.test(word)) token = new (0, $0537f1150770e055$export$2e2bcd8739ae039)("9EE", parseInt(word.substring(1, 3)));
                else if (/^0-[0-9]{1,3}$/.test(word)) token = new (0, $0537f1150770e055$export$2e2bcd8739ae039)("0-N", parseInt(word.match(/[0-9]{1,3}$/)[0]));
                else throw new Error(`Erro de sintaxe, instru\xe7\xe3o ${word} n\xe3o \xe9 conhecida!`);
            } else {
                if (/^[0-9]{3}$/.test(word)) token = new (0, $0537f1150770e055$export$2e2bcd8739ae039)("DATA", parseInt(word));
                else throw new Error(`Erro de sintaxe, dado ${word} n\xe3o \xe9 valida!`);
            }
        }
        return token;
    }
}


class $e9f446f2d09c4155$export$2e2bcd8739ae039 {
    async run(code) {
        this.portaCartoes.inserir(...code.split(/\s+/));
        this.state = "RUNNING";
        await this.executable();
    }
    async executable() {
        const syntax = new (0, $875b0a2d18f2a8a9$export$2e2bcd8739ae039)();
        await this.chico.carga(this.gaveteiro, this.portaCartoes, this.delay);
        do {
            if (this.delay > 0 && this.state != "WAIT") await (0, $ce9ec27fbafb18ae$export$e772c8ff12451969)(this.delay);
            const token = syntax.lexer(await this.chico.proximaInstrucao(this.gaveteiro, this.epi));
            const instrucao = token.getType();
            const EE = token.getValue();
            if (instrucao == "0EE") this.chico.cpEE(this.calculadora, this.gaveteiro, EE);
            else if (instrucao == "1EE") this.chico.cpAC(this.calculadora, this.gaveteiro, EE);
            else if (instrucao == "2EE") this.chico.some(this.calculadora, this.gaveteiro, EE);
            else if (instrucao == "3EE") this.chico.subtraia(this.calculadora, this.gaveteiro, EE);
            else if (instrucao == "4EE") this.chico.multiplique(this.calculadora, this.gaveteiro, EE);
            else if (instrucao == "5EE") this.chico.divida(this.calculadora, this.gaveteiro, EE);
            else if (instrucao == "6EE") this.chico.se(this.calculadora, this.epi, EE);
            else if (instrucao == "7EE") await this.chico.leia(this.gaveteiro, this.portaCartoes, EE);
            else if (instrucao == "8EE") this.chico.escreva(this.gaveteiro, this.folhaDeSaida, EE);
            else if (instrucao == "9EE") this.chico.para(this.epi, EE);
            else if (instrucao == "0-N") this.chico.constante(this.calculadora, EE);
            else if (instrucao == "000") this.state = this.chico.pare();
        }while (this.state != "ENDED");
    }
    setDelay(ms) {
        this.delay = ms;
    }
    setState(state) {
        this.state = state;
    }
    constructor(){
        this.state = "ENDED";
        this.calculadora = new (0, $a8365a11b4defac1$export$2e2bcd8739ae039)();
        this.chico = new (0, $56f1c32018af66c9$export$2e2bcd8739ae039)();
        this.epi = new (0, $c52bc2d2b763957b$export$2e2bcd8739ae039)();
        this.folhaDeSaida = new (0, $f9a43f308f4d618c$export$2e2bcd8739ae039)();
        this.gaveteiro = new (0, $6360f057ba6f7c70$export$2e2bcd8739ae039)();
        this.portaCartoes = new (0, $b0bfc6122cce6590$export$2e2bcd8739ae039)();
        this.delay = 0;
    }
}



class $f097a78c8e0163a2$export$8a43600249637a28 {
    constructor(){
        this.isDebug = false;
        this.HVM = new (0, $e9f446f2d09c4155$export$2e2bcd8739ae039)();
        this.code = "";
    }
    addEventInput(call) {
        this.input = call;
    }
    addEventOutput(call) {
        this.output = call;
    }
    async runner(debug, delay) {
        this.isDebug;
        this.HVM = new (0, $e9f446f2d09c4155$export$2e2bcd8739ae039)();
        this.HVM.setDelay(delay ?? 0);
        this.HVM.portaCartoes.entrada = this.input;
        this.HVM.folhaDeSaida.saida = this.output;
        await this.HVM.run(this.code);
    }
    async run() {
        await this.runner(false);
    }
    async debug(delay) {
        await this.runner(true, delay);
    }
    finish() {
        this.HVM.setState("ENDED");
    }
    stop() {
        if (this.isDebug) this.HVM.setState("WAIT");
        else console.warn("N\xe3o \xe9 permitido parar a execu\xe7\xe3o do HVM sem estar em modo de depura\xe7\xe3o");
    }
    next() {}
    back() {}
    setCode(code) {
        this.code = code;
    }
    getCode() {
        return this.code;
    }
    getHVM() {
        return this.HVM;
    }
    getDebug() {
        return this.isDebug;
    }
}


export {$f097a78c8e0163a2$export$8a43600249637a28 as HVC, $e9f446f2d09c4155$export$2e2bcd8739ae039 as HVM, $a8365a11b4defac1$export$2e2bcd8739ae039 as Calculadora, $56f1c32018af66c9$export$2e2bcd8739ae039 as Chico, $c52bc2d2b763957b$export$2e2bcd8739ae039 as EPI, $f9a43f308f4d618c$export$2e2bcd8739ae039 as FolhaDeSaida, $6360f057ba6f7c70$export$2e2bcd8739ae039 as Gaveteiro, $b0bfc6122cce6590$export$2e2bcd8739ae039 as PortaCartoes};
//# sourceMappingURL=HVC.js.map

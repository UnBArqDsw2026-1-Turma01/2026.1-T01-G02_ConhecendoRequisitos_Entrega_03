// index.js

const PrototypeRegistro = require("./PrototypeRegistro");

console.log("======================================");
console.log("  DEMONSTRAÇÃO — Padrão Prototype");
console.log("======================================\n");

const registro = new PrototypeRegistro();

const trilha = registro.criar("trilha");
console.log(trilha.exibirModulos());
console.log(trilha.exibirProgresso());
trilha.marcarConcluido();
console.log(trilha.exibirProgresso());

console.log();

const modulo = registro.criar("modulo");
console.log(modulo.exibirConteudos());

console.log();

const quizz = registro.criar("quizz");
console.log(quizz.exibirProgresso());
console.log(quizz.iniciarQuiz("yasmin@unb.br"));

console.log();

const questao = registro.criar("questao");
console.log(`Resposta correta? ${questao.validarResposta(1)}`);

console.log();

const alternativa = registro.criar("alternativa");
console.log(`Alternativa: ${alternativa.descricao}`);
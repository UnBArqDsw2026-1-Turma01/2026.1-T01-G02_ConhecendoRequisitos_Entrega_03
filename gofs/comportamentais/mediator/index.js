// index.js — Demonstração do padrão Mediator

const Aluno = require("./Aluno");
const Conteudo = require("./Conteudo");
const Modulo = require("./Modulo");
const Quiz = require("./Quiz");
const ProgressoConteudo = require("./ProgressoConteudo");
const ProgressoModulo = require("./ProgressoModulo");
const FluxoAprendizagemMediator = require("./FluxoAprendizagemMediator");

console.log("======================================");
console.log("  DEMONSTRAÇÃO — Padrão Mediator");
console.log("======================================\n");

// Criar mediador (ponto central de coordenação)
const mediator = new FluxoAprendizagemMediator();

// Criar aluno
const aluno = new Aluno("yasmin@unb.br", "Yasmin");

// Criar estrutura: Trilha com Módulos e Conteúdos
const modulo1 = new Modulo(
  1,
  "Introdução a Requisitos",
  "Conceitos fundamentais.",
  1,
);
const conteudo1 = new Conteudo(
  1,
  "O que é requisito?",
  "Explicação detalhada...",
  1,
);
const conteudo2 = new Conteudo(
  2,
  "Tipos de requisito",
  "Funcionais e não-funcionais...",
  2,
);

modulo1.adicionarConteudo(conteudo1);
modulo1.adicionarConteudo(conteudo2);

// Criar quiz associado ao módulo
const quiz1 = new Quiz(1, "Quiz: Introdução", 5, modulo1.id);

// Associar ao mediador para demonstração
mediator.moduloAtual = modulo1;
mediator.quizAtual = quiz1;

// Criar progresso de conteúdo inicial
const progConteudo1 = new ProgressoConteudo(1, aluno.email, conteudo1.id);
const progConteudo2 = new ProgressoConteudo(2, aluno.email, conteudo2.id);
const progModulo1 = new ProgressoModulo(1, aluno.email, modulo1.id);

mediator.progressoConteudos.set(
  `${aluno.email}:${conteudo1.id}`,
  progConteudo1,
);
mediator.progressoConteudos.set(
  `${aluno.email}:${conteudo2.id}`,
  progConteudo2,
);
mediator.progressoModulos.set(`${aluno.email}:${modulo1.id}`, progModulo1);

console.log("--- Estrutura criada ---");
console.log(aluno.toString());
console.log(modulo1.toString());
console.log(conteudo1.toString());
console.log(conteudo2.toString());
console.log(quiz1.toString());

console.log("\n--- Progresso inicial ---");
console.log(modulo1.exibirProgresso());
console.log(conteudo1.exibirProgresso());
console.log(conteudo2.exibirProgresso());

console.log("\n--- Aluno seleciona trilha e começa fluxo ---");
aluno.selecionarTrilha(mediator, 1);

console.log("\n--- Obtendo próximo conteúdo ---");
const proximoConteudo = mediator.obterProximoConteudo(aluno.email, modulo1.id);

console.log("\n--- Aluno conclui conteúdo ---");
conteudo1.marcarComoConcluido();
aluno.concluirConteudo(mediator, conteudo1.id);

console.log("\n--- Aluno conclui segundo conteúdo ---");
conteudo2.marcarComoConcluido();
aluno.concluirConteudo(mediator, conteudo2.id);

console.log("\n--- Progresso após conclusão de conteúdos ---");
console.log(modulo1.exibirProgresso());
console.log(progModulo1.toString());

console.log("\n--- Aluno inicia quiz liberado ---");
aluno.iniciarQuiz(mediator, quiz1.id);

console.log("\n--- Finalizando fluxo ---");
mediator.finalizarFluxo();

console.log("======================================");
console.log("  FIM DA DEMONSTRAÇÃO");
console.log("======================================");

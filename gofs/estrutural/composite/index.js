// index.js — Ponto de entrada do padrão Composite
// Execução: node index.js

const Trilha = require("./Trilha");
const Modulo = require("./Modulo");
const Conteudo = require("./Conteudo");

console.log("======================================");
console.log("  DEMONSTRAÇÃO — Padrão Composite");
console.log("======================================\n");

const trilha = new Trilha(
  1,
  "Fundamentos de Requisitos",
  "Estrutura básica para organizar trilhas, módulos e conteúdos.",
  1,
);

const modulo1 = new Modulo(
  1,
  "Introdução ao processo",
  "Visão geral da estrutura educacional.",
  1,
);

const modulo2 = new Modulo(
  2,
  "Elicitação e validação",
  "Técnicas para coletar e validar requisitos.",
  2,
);

modulo1.adicionarConteudo(
  new Conteudo(
    1,
    "O que é requisito?",
    "Conceito inicial sobre requisitos.",
    1,
  ),
);
modulo1.adicionarConteudo(
  new Conteudo(
    2,
    "Tipos de requisito",
    "Requisitos funcionais e não funcionais.",
    2,
  ),
);

modulo2.adicionarConteudo(
  new Conteudo(3, "Entrevistas", "Uso de entrevistas na elicitação.", 1),
);
modulo2.adicionarConteudo(
  new Conteudo(4, "Revisões", "Validação dos requisitos com a equipe.", 2),
);

trilha.adicionarModulo(modulo1);
trilha.adicionarModulo(modulo2);

console.log("--- Estrutura criada ---");
console.log(trilha.toString());
console.log(trilha.exibirModulos());
console.log();
console.log(modulo1.toString());
console.log(modulo1.exibirConteudos());
console.log();
console.log(modulo2.toString());
console.log(modulo2.exibirConteudos());

console.log("\n--- Progresso inicial ---");
console.log(trilha.exibirProgresso());
console.log(modulo1.exibirProgresso());
console.log(modulo2.exibirProgresso());
console.log(modulo1.conteudos[0].exibirProgresso());

console.log("\n--- Marcando itens como concluídos ---");
modulo1.conteudos[0].marcarConcluido();
modulo1.marcarConcluido();
trilha.marcarConcluido();

console.log("\n--- Progresso final ---");
console.log(trilha.exibirProgresso());
console.log(modulo1.exibirProgresso());
console.log(modulo2.exibirProgresso());
console.log(modulo2.conteudos[0].exibirProgresso());

console.log("\n======================================");
console.log("  FIM DA DEMONSTRAÇÃO");
console.log("======================================");

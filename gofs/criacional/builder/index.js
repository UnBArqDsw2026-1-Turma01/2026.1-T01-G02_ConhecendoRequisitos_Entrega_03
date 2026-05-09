// index.js — Ponto de entrada do padrão Builder
// Execução: node index.js

const UsuarioDiretor = require("./UsuarioDiretor");
const AlunoBuilder = require("./builders/AlunoBuilder");
const AdministradorBuilder = require("./builders/AdministradorBuilder");

console.log("======================================");
console.log("  DEMONSTRAÇÃO — Padrão Builder");
console.log("======================================\n");

const diretor = new UsuarioDiretor();

// --- Construindo um Aluno ---
console.log("--- Construindo Aluno ---");
const aluno = diretor.construirUsuario(
  new AlunoBuilder(),
  "Yasmin Nascimento",
  "yasmin@unb.br",
  "senha123"
);
console.log(aluno.toString());
aluno.visualizarInformacoes("yasmin@unb.br");
aluno.verificarOfensiva();

console.log();

// --- Construindo um Administrador ---
console.log("--- Construindo Administrador ---");
const admin = diretor.construirUsuario(
  new AdministradorBuilder(),
  "Carlos Nascimento",
  "carlos@unb.br",
  "admin456"
);
console.log(admin.toString());
admin.visualizarInformacoes("carlos@unb.br");
admin.criarTrilha("Engenharia de Requisitos", "Trilha sobre técnicas de elicitação.");
admin.criarModulo(1, "Introdução a Requisitos", "Conceitos fundamentais.");
admin.criarQuizz(1, "Quiz: Introdução a Requisitos");
console.log();
console.log(admin.VisualizarEstatisticas());

console.log();

// --- Reutilizando o Diretor com outro Aluno ---
console.log("--- Construindo segundo Aluno (mesmo Diretor, novo Builder) ---");
const aluno2 = diretor.construirUsuario(
  new AlunoBuilder(),
  "Daniel Nascimento",
  "daniel@unb.br",
  "xyz789"
);
console.log(aluno2.toString());
console.log(`Login bem-sucedido? ${aluno2.logar("daniel@unb.br", "xyz789")}`);

// index.js — Ponto de entrada do padrão Proxy (Protection Proxy)
// Execução: node index.js

const Usuario = require("./models/Usuario");
const UsuarioServiceReal = require("./UsuarioServiceReal");
const UsuarioServiceProxy = require("./UsuarioServiceProxy");

console.log("══════════════════════════════════════════════════");
console.log("  DEMONSTRAÇÃO — Padrão Proxy (Protection Proxy)");
console.log("══════════════════════════════════════════════════\n");

const serviceReal = new UsuarioServiceReal();

// ─── CENÁRIO 1: Administrador ─────────────────────────
const admin = new Usuario("carlos@unb.br", "Carlos Nascimento", "admin456", "administrador");
const proxyAdmin = new UsuarioServiceProxy(serviceReal, admin);

console.log(`┌─────────────────────────────────────────────────`);
console.log(`│ CENÁRIO 1: ${admin.toString()}`);
console.log(`└─────────────────────────────────────────────────`);

console.log("\n📚 Criando conteúdo:");
proxyAdmin.criarTrilha("Engenharia de Requisitos", "Técnicas de elicitação.");
proxyAdmin.criarModulo(1, "Intro a Requisitos", "Conceitos fundamentais.");
proxyAdmin.criarQuizz(1, "Quiz: Intro Requisitos");

console.log("\n✏️  Editando conteúdo:");
proxyAdmin.editarTrilha(1, "Eng. Requisitos v2", "Descrição atualizada.");
proxyAdmin.editarModulo(1, "Intro Requisitos v2", "Revisado.");
proxyAdmin.editarQuizz(1, "Quiz v2");

console.log("\n📊 Estatísticas:");
console.log(proxyAdmin.VisualizarEstatisticas());

console.log("\n👤 Admin gerencia perfil de outro:");
proxyAdmin.visualizarInformacoes("yasmin@unb.br");
proxyAdmin.editarUsuario("yasmin@unb.br", "Yasmin N.", "nova123");

// ─── CENÁRIO 2: Aluno ─────────────────────────────────
const aluno = new Usuario("yasmin@unb.br", "Yasmin Nascimento", "senha123", "aluno");
const proxyAluno = new UsuarioServiceProxy(serviceReal, aluno);

console.log(`\n\n┌─────────────────────────────────────────────────`);
console.log(`│ CENÁRIO 2: ${aluno.toString()}`);
console.log(`└─────────────────────────────────────────────────`);

console.log("\n🚫 Tentando operações admin (bloqueado):");
proxyAluno.criarTrilha("Hack", "Não permitido.");
proxyAluno.editarTrilha(1, "Hack", "Não.");
proxyAluno.excluirTrilha(1);
proxyAluno.criarModulo(1, "Hack", "Não.");
proxyAluno.excluirModulo(1);
proxyAluno.criarQuizz(1, "Hack");
proxyAluno.excluirQuizz(1);
proxyAluno.VisualizarEstatisticas();

console.log("\n✅ Aluno acessa PRÓPRIO perfil:");
proxyAluno.visualizarInformacoes("yasmin@unb.br");
proxyAluno.editarUsuario("yasmin@unb.br", "Yasmin Silva", "nova456");

console.log("\n🚫 Aluno tenta acessar perfil de OUTRO:");
proxyAluno.visualizarInformacoes("carlos@unb.br");
proxyAluno.editarUsuario("carlos@unb.br", "Hacker", "123");
proxyAluno.deletarUsuario("carlos@unb.br");

// ─── CENÁRIO 3: Admin exclui ──────────────────────────
console.log(`\n\n┌─────────────────────────────────────────────────`);
console.log(`│ CENÁRIO 3: Admin exclui conteúdo`);
console.log(`└─────────────────────────────────────────────────`);
proxyAdmin.excluirQuizz(1);
proxyAdmin.excluirModulo(1);
proxyAdmin.excluirTrilha(1);
console.log("\n📊 Estatísticas finais:");
console.log(proxyAdmin.VisualizarEstatisticas());

console.log("\n══════════════════════════════════════════════════");
console.log("  FIM DA DEMONSTRAÇÃO");
console.log("══════════════════════════════════════════════════");

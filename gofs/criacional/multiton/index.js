// index.js — Ponto de entrada do padrão Multiton (ConexaoDB)
// Execução: node index.js
//
// Demonstra o padrão Multiton aplicado ao pool de conexões
// com banco de dados da plataforma ConhecendoRequisitos,
// baseado no Diagrama Lógico de Dados (DLD) — Entrega 02.

const ConexaoDB = require("./ConexaoDB");

console.log("=======================================================");
console.log("  DEMONSTRAÇÃO — Padrão Multiton (Pool de Conexões DB)");
console.log("  Plataforma: ConhecendoRequisitos");
console.log("=======================================================\n");

// ── 1. Abertura das conexões ─────────────────────────────────
// Cada contexto representa um grupo de tabelas do DLD.
// A primeira chamada cria a conexão; as demais reutilizam.

console.log("--- Abrindo conexão para 'usuarios' (1ª vez) ---");
const dbUsuarios1 = ConexaoDB.getConexao("usuarios");

console.log("\n--- Solicitando 'usuarios' novamente (2ª vez) ---");
const dbUsuarios2 = ConexaoDB.getConexao("usuarios");

console.log("\n--- Abrindo conexão para 'conteudo' ---");
const dbConteudo = ConexaoDB.getConexao("conteudo");

console.log("\n--- Abrindo conexão para 'progresso' ---");
const dbProgresso = ConexaoDB.getConexao("progresso");

console.log("\n--- Abrindo conexão para 'quizzes' ---");
const dbQuizzes = ConexaoDB.getConexao("quizzes");

// ── 2. Prova do Multiton: identidade de referência ───────────

console.log("\n── Verificação de identidade ─────────────────────────");
console.log(`dbUsuarios1 === dbUsuarios2 (mesma conexão?): ${dbUsuarios1 === dbUsuarios2}`);
console.log(`dbUsuarios1 === dbConteudo  (contextos diferentes?): ${dbUsuarios1 === dbConteudo}`);
console.log(`\nConexões abertas no pool: ${ConexaoDB.listarConexoes().join(", ")}`);
console.log(`Total de conexões no pool: ${ConexaoDB.quantidadeDeConexoes()}`);

// ── 3. Execução de queries por contexto ──────────────────────
// Cada contexto executa queries nas suas próprias tabelas.

console.log("\n── Executando queries por contexto ───────────────────");

// Contexto: usuarios (tabelas: Usuario, Aluno, Administrador)
dbUsuarios1.query("SELECT * FROM Usuario WHERE tipo = 'aluno'");
dbUsuarios2.query("INSERT INTO Aluno (email, maiorOfensiva) VALUES ('yasmin@unb.br', 0)");

// Contexto: conteudo (tabelas: Trilha, Modulo, Conteudo, Quiz, Questao, Alternativa)
dbConteudo.query("SELECT * FROM Trilha ORDER BY ordem");
dbConteudo.query("SELECT * FROM Modulo WHERE id_trilha = 1");
dbConteudo.query("SELECT * FROM Quiz WHERE id_modulo = 2");

// Contexto: progresso (tabelas: ProgressoTrilha, ProgressoModulo, ProgressoConteudo)
dbProgresso.query("SELECT * FROM ProgressoTrilha WHERE email_aluno = 'yasmin@unb.br'");
dbProgresso.query("UPDATE ProgressoModulo SET progresso = 75 WHERE id = 3");

// Contexto: quizzes (tabela: TentativaQuiz)
dbQuizzes.query("INSERT INTO TentativaQuiz (email_aluno, id_quiz, progresso) VALUES ('yasmin@unb.br', 1, 0)");
dbQuizzes.query("UPDATE TentativaQuiz SET status = TRUE WHERE id = 1");

// ── 4. Status de cada conexão ────────────────────────────────
// Demonstra que o contador de queries acumulou corretamente.
// Nota: dbUsuarios1 e dbUsuarios2 apontam para o mesmo objeto,
// então o total de queries de "usuarios" é 2 (não 1 + 1 separados).

console.log("── Status das conexões ────────────────────────────────");
dbUsuarios1.exibirStatus();  // totalQueries = 2 (dbUsuarios1 e dbUsuarios2 são o mesmo objeto)
dbConteudo.exibirStatus();   // totalQueries = 3
dbProgresso.exibirStatus();  // totalQueries = 2
dbQuizzes.exibirStatus();    // totalQueries = 2

// ── 5. Contexto inválido — tratamento de erro ────────────────

console.log("── Contexto inválido ──────────────────────────────────");
try {
  ConexaoDB.getConexao("logs");
} catch (e) {
  console.log(`Erro esperado: ${e.message}\n`);
}

// ── 6. Encerramento do pool ───────────────────────────────────

console.log("── Encerrando todas as conexões ──────────────────────");
ConexaoDB.resetar();
console.log(`Conexões após reset: ${ConexaoDB.quantidadeDeConexoes()}`);

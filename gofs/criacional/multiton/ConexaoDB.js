// ConexaoDB.js
// Padrão Multiton — gerencia uma conexão de banco de dados por contexto
//
// Baseado no Diagrama Lógico de Dados (DLD) da plataforma ConhecendoRequisitos.
// Cada contexto (usuarios, conteudo, progresso, quizzes) tem sua própria
// conexão isolada, garantida como única por meio do mapa estático #pool.
//
// NOTA: A conexão com o banco é simulada (mock) para fins didáticos.
// Em produção, o constructor abriria uma conexão real com o SGBD
// (ex.: via biblioteca `mysql2`, `pg` ou `sqlite3`).

const CONTEXTOS_DB = require("./config/contextos");

class ConexaoDB {
  // ── Mapa estático privado — núcleo do Multiton ──────────────
  // Armazena as conexões abertas: { contexto → instância }
  static #pool = new Map();

  // ── Campos privados da instância ────────────────────────────
  #contexto;       // nome do contexto ("usuarios", "conteudo", etc.)
  #tabelas;        // tabelas que esta conexão gerencia
  #descricao;      // descrição semântica do contexto
  #schema;         // estrutura das tabelas (pk, fk, restrições)
  #status;         // "desconectado" | "conectando" | "conectado"
  #totalQueries;   // contador de queries executadas nesta conexão
  #ultimaQuery;    // timestamp da última query

  /**
   * Construtor privado.
   * Não instancie diretamente — use ConexaoDB.getConexao(contexto).
   * @param {string} contexto
   * @private
   */
  constructor(contexto) {
    if (!CONTEXTOS_DB[contexto]) {
      throw new Error(
        `Contexto de banco inválido: "${contexto}". ` +
        `Contextos disponíveis: ${Object.keys(CONTEXTOS_DB).join(", ")}`
      );
    }

    const config = CONTEXTOS_DB[contexto];

    this.#contexto    = contexto;
    this.#tabelas     = config.tabelas;
    this.#descricao   = config.descricao;
    this.#schema      = config.schema;
    this.#status      = "conectando";
    this.#totalQueries = 0;
    this.#ultimaQuery  = null;

    // Simula a abertura da conexão com o banco
    this.#conectar();
  }

  /** Simula a abertura da conexão. Em produção, abriria a conexão real com o SGBD. */
  #conectar() {
    // Em produção: await pool.connect() ou similar
    this.#status = "conectado";
    console.log(
      `[ConexaoDB] ✓ Conexão aberta para contexto "${this.#contexto}" ` +
      `(${this.#tabelas.length} tabela(s): ${this.#tabelas.join(", ")})`
    );
  }

  // ── Ponto de acesso global do Multiton ───────────────────────

  /**
   * Retorna a conexão para o contexto informado.
   * - Já existe no pool → retorna a instância existente (sem abrir nova conexão).
   * - Não existe        → cria, armazena no pool e retorna.
   *
   * @param {string} contexto - "usuarios" | "conteudo" | "progresso" | "quizzes"
   * @returns {ConexaoDB}
   */
  static getConexao(contexto) {
    if (!ConexaoDB.#pool.has(contexto)) {
      ConexaoDB.#pool.set(contexto, new ConexaoDB(contexto));
    } else {
      console.log(`[ConexaoDB] ↩ Conexão reutilizada para contexto "${contexto}"`);
    }
    return ConexaoDB.#pool.get(contexto);
  }

  // ── Métodos de instância ─────────────────────────────────────

  /**
   * Simula a execução de uma query SQL no contexto desta conexão.
   * Em produção: executaria a query real no SGBD.
   *
   * @param {string} sql - Instrução SQL a ser executada
   * @returns {{ contexto: string, sql: string, linhasAfetadas: number, timestamp: string }}
   */
  query(sql) {
    if (this.#status !== "conectado") {
      throw new Error(`Conexão "${this.#contexto}" não está ativa. Status: ${this.#status}`);
    }

    this.#totalQueries += 1;
    this.#ultimaQuery = new Date().toLocaleString("pt-BR");

    // Valida se a query toca apenas tabelas do contexto correto
    const tabelasNaQuery = this.#tabelas.filter((t) =>
      sql.toUpperCase().includes(t.toUpperCase())
    );

    const resultado = {
      contexto:       this.#contexto,
      sql:            sql.trim(),
      linhasAfetadas: Math.floor(Math.random() * 5) + 1, // simulado
      tabelasEnvolvidas: tabelasNaQuery,
      timestamp:      this.#ultimaQuery,
    };

    console.log(
      `[${this.#contexto.toUpperCase()}] Query #${this.#totalQueries}: "${sql.trim()}" ` +
      `→ ${resultado.linhasAfetadas} linha(s) afetada(s)`
    );

    return resultado;
  }

  /** Retorna o nome do contexto desta conexão. */
  getContexto() {
    return this.#contexto;
  }

  /** Retorna a lista de tabelas que esta conexão gerencia. */
  getTabelas() {
    return [...this.#tabelas]; // cópia defensiva
  }

  /** Retorna o status atual da conexão. */
  getStatus() {
    return this.#status;
  }

  /** Exibe o estado completo da conexão no console. */
  exibirStatus() {
    console.log(`\n── ConexaoDB: "${this.#contexto}" ${"─".repeat(30 - this.#contexto.length)}`);
    console.log(`  Status        : ${this.#status}`);
    console.log(`  Descrição     : ${this.#descricao}`);
    console.log(`  Tabelas       : ${this.#tabelas.join(", ")}`);
    console.log(`  Total queries : ${this.#totalQueries}`);
    console.log(`  Última query  : ${this.#ultimaQuery ?? "nenhuma"}`);
    console.log(`${"─".repeat(50)}\n`);
  }

  // ── Métodos estáticos utilitários ───────────────────────────

  /** Retorna quantas conexões distintas estão abertas no pool. */
  static quantidadeDeConexoes() {
    return ConexaoDB.#pool.size;
  }

  /** Lista os contextos com conexão aberta. */
  static listarConexoes() {
    return [...ConexaoDB.#pool.keys()];
  }

  /**
   * Fecha todas as conexões e limpa o pool.
   * Útil para encerramento do servidor ou testes automatizados.
   */
  static resetar() {
    for (const [contexto] of ConexaoDB.#pool) {
      console.log(`[ConexaoDB] ✗ Conexão fechada para contexto "${contexto}"`);
    }
    ConexaoDB.#pool.clear();
  }
}

module.exports = ConexaoDB;

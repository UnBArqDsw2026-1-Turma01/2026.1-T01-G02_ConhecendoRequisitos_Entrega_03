// config/contextos.js
// Configuração dos contextos de banco de dados do projeto ConhecendoRequisitos
// Baseado no Diagrama Lógico de Dados (DLD) — Entrega 02
//
// Cada contexto agrupa tabelas com afinidade semântica,
// evitando que uma única conexão genérica acesse todo o schema.

const CONTEXTOS_DB = {
  /**
   * Contexto de autenticação e perfis de usuário.
   * Tabelas: Usuario (supertabela), Aluno, Administrador
   * Herança mapeada via tabelas separadas com FK → Usuario(email)
   */
  usuarios: {
    descricao: "Autenticação e perfis de usuário (Usuario, Aluno, Administrador)",
    tabelas: ["Usuario", "Aluno", "Administrador"],
    schema: {
      Usuario:        { pk: "email",  tipo: "VARCHAR(255)" },
      Aluno:          { pk: "email",  fk: "Usuario(email)" },
      Administrador:  { pk: "email",  fk: "Usuario(email)" },
    },
  },

  /**
   * Contexto de gestão de conteúdo educacional.
   * Tabelas: Trilha, Modulo, Conteudo, Quiz, Questao, Alternativa
   * Hierarquia: Trilha → Modulo → Conteudo / Quiz → Questao → Alternativa
   */
  conteudo: {
    descricao: "Gestão de conteúdo educacional (Trilha, Modulo, Conteudo, Quiz, Questao, Alternativa)",
    tabelas: ["Trilha", "Modulo", "Conteudo", "Quiz", "Questao", "Alternativa"],
    schema: {
      Trilha:      { pk: "id", tipo: "AUTO_INCREMENT" },
      Modulo:      { pk: "id", fk: "Trilha(id)" },
      Conteudo:    { pk: "id", fk: "Modulo(id)" },
      Quiz:        { pk: "id", fk: "Modulo(id) ON DELETE SET NULL" },
      Questao:     { pk: "id", fk: "Quiz(id)" },
      Alternativa: { pk: "id", fk: "Questao(id)" },
    },
  },

  /**
   * Contexto de rastreamento de progresso do aluno.
   * Tabelas: ProgressoTrilha, ProgressoModulo, ProgressoConteudo
   * Todas com restrição UNIQUE composta para evitar duplicidade de registro.
   */
  progresso: {
    descricao: "Rastreamento de progresso do aluno (ProgressoTrilha, ProgressoModulo, ProgressoConteudo)",
    tabelas: ["ProgressoTrilha", "ProgressoModulo", "ProgressoConteudo"],
    schema: {
      ProgressoTrilha:   { pk: "id", unique: "email_aluno, id_trilha" },
      ProgressoModulo:   { pk: "id", unique: "id_progresso_trilha, id_modulo" },
      ProgressoConteudo: { pk: "id", unique: "id_progresso_modulo, id_conteudo" },
    },
  },

  /**
   * Contexto de tentativas de quiz.
   * Tabela: TentativaQuiz
   * Sem restrição UNIQUE — um aluno pode ter múltiplas tentativas no mesmo quiz.
   */
  quizzes: {
    descricao: "Tentativas e respostas de quizzes (TentativaQuiz)",
    tabelas: ["TentativaQuiz"],
    schema: {
      TentativaQuiz: { pk: "id", fk: "Aluno(email), Quiz(id)" },
    },
  },
};

module.exports = CONTEXTOS_DB;

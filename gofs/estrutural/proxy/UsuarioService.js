// UsuarioService.js — Interface (Subject) do padrão Proxy
// Classe abstrata que define o contrato para todos os serviços de usuário.

class UsuarioService {
  constructor() {
    if (new.target === UsuarioService) {
      throw new Error(
        "UsuarioService é uma interface abstrata e não pode ser instanciada diretamente.",
      );
    }
  }

  // ─── Gestão de Trilhas ──────────────────────────────

  /** @abstract */
  criarTrilha(titulo, descricao) {
    throw new Error("Método abstrato criarTrilha() não implementado.");
  }

  /** @abstract */
  editarTrilha(id, titulo, descricao) {
    throw new Error("Método abstrato editarTrilha() não implementado.");
  }

  /** @abstract */
  excluirTrilha(id) {
    throw new Error("Método abstrato excluirTrilha() não implementado.");
  }

  // ─── Gestão de Módulos ──────────────────────────────

  /** @abstract */
  criarModulo(id, titulo, descricao) {
    throw new Error("Método abstrato criarModulo() não implementado.");
  }

  /** @abstract */
  editarModulo(id, titulo, descricao) {
    throw new Error("Método abstrato editarModulo() não implementado.");
  }

  /** @abstract */
  excluirModulo(id) {
    throw new Error("Método abstrato excluirModulo() não implementado.");
  }

  // ─── Gestão de Quizzes ──────────────────────────────

  /** @abstract */
  criarQuizz(id, titulo) {
    throw new Error("Método abstrato criarQuizz() não implementado.");
  }

  /** @abstract */
  editarQuizz(id, titulo) {
    throw new Error("Método abstrato editarQuizz() não implementado.");
  }

  /** @abstract */
  excluirQuizz(id) {
    throw new Error("Método abstrato excluirQuizz() não implementado.");
  }

  // ─── Estatísticas ───────────────────────────────────

  /** @abstract */
  VisualizarEstatisticas() {
    throw new Error(
      "Método abstrato VisualizarEstatisticas() não implementado.",
    );
  }

  // ─── Gestão de Perfil ───────────────────────────────

  /** @abstract */
  editarUsuario(email, nome, senha) {
    throw new Error("Método abstrato editarUsuario() não implementado.");
  }

  /** @abstract */
  deletarUsuario(email) {
    throw new Error("Método abstrato deletarUsuario() não implementado.");
  }

  /** @abstract */
  visualizarInformacoes(email) {
    throw new Error(
      "Método abstrato visualizarInformacoes() não implementado.",
    );
  }
}

module.exports = UsuarioService;

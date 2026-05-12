// UsuarioServiceReal.js — RealSubject do padrão Proxy
// Implementação concreta que executa todas as operações reais.

const UsuarioService = require("./UsuarioService");

class UsuarioServiceReal extends UsuarioService {
  constructor() {
    super();
    this.trilhas = [];
    this.modulos = [];
    this.quizzes = [];
    this.usuarios = [];
  }

  // ─── Gestão de Trilhas ──────────────────────────────

  criarTrilha(titulo, descricao) {
    const id = this.trilhas.length + 1;
    this.trilhas.push({ id, titulo, descricao });
    console.log(`  ✔ Trilha '${titulo}' criada com id=${id}.`);
  }

  editarTrilha(id, titulo, descricao) {
    const trilha = this.trilhas.find((t) => t.id === id);
    if (trilha) {
      trilha.titulo = titulo;
      trilha.descricao = descricao;
      console.log(`  ✔ Trilha ${id} editada para '${titulo}'.`);
    } else {
      console.log(`  ✘ Trilha ${id} não encontrada.`);
    }
  }

  excluirTrilha(id) {
    const idx = this.trilhas.findIndex((t) => t.id === id);
    if (idx !== -1) {
      const removida = this.trilhas.splice(idx, 1)[0];
      console.log(`  ✔ Trilha '${removida.titulo}' excluída.`);
    } else {
      console.log(`  ✘ Trilha ${id} não encontrada.`);
    }
  }

  // ─── Gestão de Módulos ──────────────────────────────

  criarModulo(id, titulo, descricao) {
    this.modulos.push({ id, titulo, descricao });
    console.log(`  ✔ Módulo '${titulo}' criado na trilha ${id}.`);
  }

  editarModulo(id, titulo, descricao) {
    const modulo = this.modulos.find((m) => m.id === id);
    if (modulo) {
      modulo.titulo = titulo;
      modulo.descricao = descricao;
      console.log(`  ✔ Módulo ${id} editado para '${titulo}'.`);
    } else {
      console.log(`  ✘ Módulo ${id} não encontrado.`);
    }
  }

  excluirModulo(id) {
    const idx = this.modulos.findIndex((m) => m.id === id);
    if (idx !== -1) {
      const removido = this.modulos.splice(idx, 1)[0];
      console.log(`  ✔ Módulo '${removido.titulo}' excluído.`);
    } else {
      console.log(`  ✘ Módulo ${id} não encontrado.`);
    }
  }

  // ─── Gestão de Quizzes ──────────────────────────────

  criarQuizz(id, titulo) {
    this.quizzes.push({ id, titulo });
    console.log(`  ✔ Quiz '${titulo}' criado no módulo ${id}.`);
  }

  editarQuizz(id, titulo) {
    const quiz = this.quizzes.find((q) => q.id === id);
    if (quiz) {
      quiz.titulo = titulo;
      console.log(`  ✔ Quiz ${id} editado para '${titulo}'.`);
    } else {
      console.log(`  ✘ Quiz ${id} não encontrado.`);
    }
  }

  excluirQuizz(id) {
    const idx = this.quizzes.findIndex((q) => q.id === id);
    if (idx !== -1) {
      const removido = this.quizzes.splice(idx, 1)[0];
      console.log(`  ✔ Quiz '${removido.titulo}' excluído.`);
    } else {
      console.log(`  ✘ Quiz ${id} não encontrado.`);
    }
  }

  // ─── Estatísticas ───────────────────────────────────

  VisualizarEstatisticas() {
    const stats =
      `  📊 Estatísticas da plataforma:\n` +
      `     Trilhas criadas : ${this.trilhas.length}\n` +
      `     Módulos criados : ${this.modulos.length}\n` +
      `     Quizzes criados : ${this.quizzes.length}`;
    return stats;
  }

  // ─── Gestão de Perfil ───────────────────────────────

  editarUsuario(email, nome, senha) {
    console.log(`  ✔ Perfil de '${email}' atualizado (nome='${nome}').`);
  }

  deletarUsuario(email) {
    console.log(`  ✔ Conta '${email}' excluída com sucesso.`);
  }

  visualizarInformacoes(email) {
    console.log(`  ✔ Informações do usuário '${email}' exibidas.`);
  }
}

module.exports = UsuarioServiceReal;

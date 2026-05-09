// models/Administrador.js
// Produto concreto — representa um administrador da plataforma

const Usuario = require("./Usuario");

class Administrador extends Usuario {
  constructor() {
    super();
    this.tipo = "administrador";
    this.qtdConteudosCriados = 0;
    this.qtdQuizzesCriados = 0;
  }

  criarTrilha(titulo, descricao) {
    console.log(`Trilha '${titulo}' criada: ${descricao}`);
  }

  editarTrilha(id, titulo, descricao) {
    console.log(`Trilha ${id} editada para '${titulo}'.`);
  }

  excluirTrilha(id) {
    console.log(`Trilha ${id} excluída.`);
  }

  criarModulo(id, titulo, descricao) {
    this.qtdConteudosCriados += 1;
    console.log(`Módulo '${titulo}' criado (total: ${this.qtdConteudosCriados}).`);
  }

  editarModulo(id, titulo, descricao) {
    console.log(`Módulo ${id} editado.`);
  }

  excluirModulo(id) {
    console.log(`Módulo ${id} excluído.`);
  }

  criarQuizz(id, titulo) {
    this.qtdQuizzesCriados += 1;
    console.log(`Quiz '${titulo}' criado (total: ${this.qtdQuizzesCriados}).`);
  }

  editarQuizz(id, titulo) {
    console.log(`Quiz ${id} editado para '${titulo}'.`);
  }

  excluirQuizz(id) {
    console.log(`Quiz ${id} excluído.`);
  }

  VisualizarEstatisticas() {
    return (
      `Estatísticas do Admin '${this.nome}':\n` +
      `  Conteúdos criados : ${this.qtdConteudosCriados}\n` +
      `  Quizzes criados   : ${this.qtdQuizzesCriados}`
    );
  }
}

module.exports = Administrador;

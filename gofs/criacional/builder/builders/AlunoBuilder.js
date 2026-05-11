// builders/AlunoBuilder.js
// Builder concreto para construção de objetos Aluno

const UsuarioBuilder = require("./UsuarioBuilder");
const Aluno = require("../models/Aluno");

class AlunoBuilder extends UsuarioBuilder {
  /** Instancia o produto Aluno. */
  definirTipo() {
    this.usuario = new Aluno();
  }

  /**
   * Inicializa os campos exclusivos do Aluno com valores padrão.
   * Deve ser chamado após definirTipo().
   */
  definirCamposAluno() {
    if (!(this.usuario instanceof Aluno)) {
      throw new Error("definirTipo() deve ser chamado antes de definirCamposAluno().");
    }
    this.usuario.MaiorOfensiva = 0;
    this.usuario.ofensivaAtual = 0;
    this.usuario.ultimoAcesso = new Date().toISOString().slice(0, 10);
  }
}

module.exports = AlunoBuilder;

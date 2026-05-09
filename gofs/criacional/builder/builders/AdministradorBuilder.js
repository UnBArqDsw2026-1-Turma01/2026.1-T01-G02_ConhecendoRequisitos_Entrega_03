// builders/AdministradorBuilder.js
// Builder concreto para construção de objetos Administrador

const UsuarioBuilder = require("./UsuarioBuilder");
const Administrador = require("../models/Administrador");

class AdministradorBuilder extends UsuarioBuilder {
  constructor() {
    super();
    this.qtdConteudosCriados = 0;
    this.qtdQuizzesCriados = 0;
  }

  /** Instancia o produto Administrador. */
  definirTipo() {
    this.usuario = new Administrador();
  }

  /**
   * Inicializa os contadores administrativos.
   * Deve ser chamado após definirTipo().
   */
  definirPermissoesAdmin() {
    if (!(this.usuario instanceof Administrador)) {
      throw new Error("definirTipo() deve ser chamado antes de definirPermissoesAdmin().");
    }
    this.usuario.qtdConteudosCriados = this.qtdConteudosCriados;
    this.usuario.qtdQuizzesCriados = this.qtdQuizzesCriados;
  }
}

module.exports = AdministradorBuilder;

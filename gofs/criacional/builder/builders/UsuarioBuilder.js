// builders/UsuarioBuilder.js
// Builder abstrato — define a interface de construção comum

class UsuarioBuilder {
  constructor() {
    if (new.target === UsuarioBuilder) {
      throw new Error("UsuarioBuilder é abstrato e não pode ser instanciado diretamente.");
    }
    this.usuario = null;
  }

  /** @abstract */
  definirTipo() {
    throw new Error("definirTipo() deve ser implementado pelo builder concreto.");
  }

  definirNome(nome) {
    this.usuario.nome = nome;
  }

  definirEmail(email) {
    this.usuario.email = email;
  }

  definirSenha(senha) {
    this.usuario.senha = senha;
  }

  /** Retorna o produto e limpa o estado interno do builder. */
  getResultado() {
    const resultado = this.usuario;
    this.usuario = null;
    return resultado;
  }
}

module.exports = UsuarioBuilder;

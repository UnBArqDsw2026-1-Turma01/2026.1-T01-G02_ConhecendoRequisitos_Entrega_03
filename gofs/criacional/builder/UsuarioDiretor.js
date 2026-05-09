// UsuarioDiretor.js
// Diretor — orquestra a sequência de passos do Builder

const AlunoBuilder = require("./builders/AlunoBuilder");
const AdministradorBuilder = require("./builders/AdministradorBuilder");

class UsuarioDiretor {
  /**
   * Constrói um usuário completo usando o builder fornecido.
   * @param {import('./builders/UsuarioBuilder')} builder - Builder concreto
   * @param {string} nome
   * @param {string} email
   * @param {string} senha
   * @returns {import('./models/Usuario')} Produto finalizado
   */
  construirUsuario(builder, nome, email, senha) {
    // Passo 1: instancia o produto correto
    builder.definirTipo();

    // Passo 2: campos comuns a todos os usuários
    builder.definirNome(nome);
    builder.definirEmail(email);
    builder.definirSenha(senha);

    // Passo 3: campos específicos do tipo
    if (builder instanceof AlunoBuilder) {
      builder.definirCamposAluno();
    } else if (builder instanceof AdministradorBuilder) {
      builder.definirPermissoesAdmin();
    }

    // Passo 4: retorna o produto finalizado
    return builder.getResultado();
  }
}

module.exports = UsuarioDiretor;

// UsuarioServiceProxy.js — Protection Proxy do padrão Proxy
// Controla o acesso aos métodos do UsuarioServiceReal com base no tipo do usuário.

const UsuarioService = require("./UsuarioService");

class UsuarioServiceProxy extends UsuarioService {
  /**
   * @param {import('./UsuarioService')} serviceReal - Instância do serviço real
   * @param {import('./models/Usuario')} usuario - Usuário autenticado
   */
  constructor(serviceReal, usuario) {
    super();
    this.serviceReal = serviceReal;
    this.usuario = usuario;
  }

  // ─── Helpers de Verificação ─────────────────────────

  /**
   * Verifica se o usuário tem permissão de administrador.
   * @param {string} operacao - Nome da operação para mensagem de log
   * @returns {boolean}
   */
  _verificarPermissaoAdmin(operacao) {
    if (!this.usuario.ehAdministrador()) {
      console.log(
        `  ✘ ACESSO NEGADO: '${this.usuario.nome}' (${this.usuario.tipo}) ` +
          `não tem permissão para ${operacao}.`,
      );
      return false;
    }
    return true;
  }

  /**
   * Verifica se o usuário pode acessar dados do email informado.
   * Administradores podem acessar qualquer perfil.
   * Alunos só podem acessar o próprio perfil.
   * @param {string} email
   * @param {string} operacao
   * @returns {boolean}
   */
  _verificarAcessoPerfil(email, operacao) {
    if (this.usuario.ehAdministrador()) {
      return true;
    }
    if (this.usuario.email !== email) {
      console.log(
        `  ✘ ACESSO NEGADO: '${this.usuario.nome}' (${this.usuario.tipo}) ` +
          `não pode ${operacao} perfil de '${email}'.`,
      );
      return false;
    }
    return true;
  }

  // ─── Gestão de Trilhas (somente Admin) ──────────────

  criarTrilha(titulo, descricao) {
    if (!this._verificarPermissaoAdmin("criar trilha")) return;
    this.serviceReal.criarTrilha(titulo, descricao);
  }

  editarTrilha(id, titulo, descricao) {
    if (!this._verificarPermissaoAdmin("editar trilha")) return;
    this.serviceReal.editarTrilha(id, titulo, descricao);
  }

  excluirTrilha(id) {
    if (!this._verificarPermissaoAdmin("excluir trilha")) return;
    this.serviceReal.excluirTrilha(id);
  }

  // ─── Gestão de Módulos (somente Admin) ──────────────

  criarModulo(id, titulo, descricao) {
    if (!this._verificarPermissaoAdmin("criar módulo")) return;
    this.serviceReal.criarModulo(id, titulo, descricao);
  }

  editarModulo(id, titulo, descricao) {
    if (!this._verificarPermissaoAdmin("editar módulo")) return;
    this.serviceReal.editarModulo(id, titulo, descricao);
  }

  excluirModulo(id) {
    if (!this._verificarPermissaoAdmin("excluir módulo")) return;
    this.serviceReal.excluirModulo(id);
  }

  // ─── Gestão de Quizzes (somente Admin) ──────────────

  criarQuizz(id, titulo) {
    if (!this._verificarPermissaoAdmin("criar quiz")) return;
    this.serviceReal.criarQuizz(id, titulo);
  }

  editarQuizz(id, titulo) {
    if (!this._verificarPermissaoAdmin("editar quiz")) return;
    this.serviceReal.editarQuizz(id, titulo);
  }

  excluirQuizz(id) {
    if (!this._verificarPermissaoAdmin("excluir quiz")) return;
    this.serviceReal.excluirQuizz(id);
  }

  // ─── Estatísticas (somente Admin) ───────────────────

  VisualizarEstatisticas() {
    if (!this._verificarPermissaoAdmin("visualizar estatísticas")) return "";
    return this.serviceReal.VisualizarEstatisticas();
  }

  // ─── Gestão de Perfil (Admin = qualquer, Aluno = próprio) ─

  editarUsuario(email, nome, senha) {
    if (!this._verificarAcessoPerfil(email, "editar o")) return;
    this.serviceReal.editarUsuario(email, nome, senha);
  }

  deletarUsuario(email) {
    if (!this._verificarAcessoPerfil(email, "deletar o")) return;
    this.serviceReal.deletarUsuario(email);
  }

  visualizarInformacoes(email) {
    if (!this._verificarAcessoPerfil(email, "visualizar informações do"))
      return;
    this.serviceReal.visualizarInformacoes(email);
  }
}

module.exports = UsuarioServiceProxy;

// models/Usuario.js — Modelo de usuário da plataforma ConhecendoRequisitos

class Usuario {
  /**
   * @param {string} email
   * @param {string} nome
   * @param {string} senha
   * @param {"aluno"|"administrador"} tipo
   */
  constructor(email, nome, senha, tipo) {
    this.email = email;
    this.nome = nome;
    this.senha = senha;
    this.tipo = tipo;
  }

  ehAdministrador() {
    return this.tipo === "administrador";
  }

  toString() {
    return `Usuario(nome='${this.nome}', email='${this.email}', tipo='${this.tipo}')`;
  }
}

module.exports = Usuario;

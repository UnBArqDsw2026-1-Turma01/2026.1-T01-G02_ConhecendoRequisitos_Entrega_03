// models/Usuario.js
// Classe base abstrata — representa qualquer usuário da plataforma

class Usuario {
  constructor() {
    if (new.target === Usuario) {
      throw new Error("Usuario é uma classe abstrata e não pode ser instanciada diretamente.");
    }
    this.email = "";
    this.nome = "";
    this.senha = "";
    this.tipo = "";
  }

  /** Valida as credenciais. Retorna true se válidas. */
  logar(email, senha) {
    return this.email === email && this.senha === senha;
  }

  /** Encerra a sessão do usuário. */
  deslogar() {
    console.log(`[${this.tipo.toUpperCase()}] ${this.nome} deslogado com sucesso.`);
  }

  /** Dispara o fluxo de recuperação de senha. */
  recuperarSenha(email) {
    if (this.email === email) {
      console.log(`Link de recuperação enviado para: ${email}`);
    } else {
      console.log("E-mail não encontrado.");
    }
  }

  /** Atualiza os dados pessoais do usuário. */
  editarUsuario(email, nome, senha) {
    this.email = email;
    this.nome = nome;
    this.senha = senha;
  }

  /** Exclui a conta, exigindo confirmação de e-mail. */
  deletarUsuario(email) {
    if (this.email === email) {
      console.log(`Conta de '${this.nome}' excluída.`);
    } else {
      console.log("Confirmação de e-mail falhou.");
    }
  }

  /** Exibe as informações do perfil. */
  visualizarInformacoes(email) {
    if (this.email === email) {
      console.log(`Nome: ${this.nome} | E-mail: ${this.email} | Tipo: ${this.tipo}`);
    }
  }

  toString() {
    return `${this.constructor.name}(nome='${this.nome}', email='${this.email}', tipo='${this.tipo}')`;
  }
}

module.exports = Usuario;

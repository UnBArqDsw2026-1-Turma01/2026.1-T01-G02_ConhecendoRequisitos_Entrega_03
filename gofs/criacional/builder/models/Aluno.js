// models/Aluno.js
// Produto concreto — representa um aluno da plataforma

const Usuario = require("./Usuario");

class Aluno extends Usuario {
  constructor() {
    super();
    this.tipo = "aluno";
    this.MaiorOfensiva = 0;
    this.ofensivaAtual = 0;
    this.ultimoAcesso = new Date().toISOString().slice(0, 10); // "YYYY-MM-DD"
  }

  /**
   * Verifica se o aluno acessou hoje e atualiza a ofensiva.
   * - Mesmo dia    → mantém
   * - 1 dia depois → incrementa
   * - Mais de 1    → reinicia
   */
  verificarOfensiva() {
    const hoje = new Date().toISOString().slice(0, 10);
    const ultimo = this.ultimoAcesso;

    if (ultimo === hoje) {
      console.log(`Ofensiva mantida! Sequência atual: ${this.ofensivaAtual} dias.`);
      return;
    }

    const diffMs = new Date(hoje) - new Date(ultimo);
    const diffDias = Math.round(diffMs / (1000 * 60 * 60 * 24));

    if (diffDias === 1) {
      this.ofensivaAtual += 1;
      if (this.ofensivaAtual > this.MaiorOfensiva) {
        this.MaiorOfensiva = this.ofensivaAtual;
      }
      console.log(`Ofensiva aumentada para ${this.ofensivaAtual} dias!`);
    } else {
      this.ofensivaAtual = 1;
      console.log("Ofensiva reiniciada. Não perca o fio!");
    }

    this.ultimoAcesso = hoje;
  }
}

module.exports = Aluno;

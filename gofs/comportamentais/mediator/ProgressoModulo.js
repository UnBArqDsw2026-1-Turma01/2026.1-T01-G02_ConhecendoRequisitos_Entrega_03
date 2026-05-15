// ProgressoModulo.js — Colleague
// Registra o progresso de um módulo específico.

class ProgressoModulo {
  constructor(id, alunoEmail, moduloId) {
    this.id = id;
    this.alunoEmail = alunoEmail;
    this.moduloId = moduloId;
    this.progresso = 0; // percentual
    this.dataFinalizacao = null;
  }

  atualizar(novaPercentagem) {
    this.progresso = novaPercentagem;
    console.log(
      `[PROGRESSO_MODULO] Módulo ${this.moduloId} do aluno ${this.alunoEmail} agora em ${this.progresso}%.`,
    );

    if (novaPercentagem === 100) {
      this.dataFinalizacao = new Date();
      console.log(
        `[PROGRESSO_MODULO] Módulo ${this.moduloId} concluído em ${this.dataFinalizacao.toLocaleString("pt-BR")}.`,
      );
    }
  }

  toString() {
    return `ProgressoModulo(aluno='${this.alunoEmail}', modulo=${this.moduloId}, progresso=${this.progresso}%)`;
  }
}

module.exports = ProgressoModulo;

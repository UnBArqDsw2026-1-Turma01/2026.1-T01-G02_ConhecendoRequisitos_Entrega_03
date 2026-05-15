// ProgressoConteudo.js — Colleague
// Registra o progresso de um conteúdo específico.

class ProgressoConteudo {
  constructor(id, alunoEmail, conteudoId) {
    this.id = id;
    this.alunoEmail = alunoEmail;
    this.conteudoId = conteudoId;
    this.status = "não iniciado";
    this.dataFinalizacao = null;
  }

  atualizar(novoStatus) {
    this.status = novoStatus;
    if (novoStatus === "concluído") {
      this.dataFinalizacao = new Date();
      console.log(
        `[PROGRESSO_CONTEUDO] Conteúdo ${this.conteudoId} do aluno ${this.alunoEmail} finalizado em ${this.dataFinalizacao.toLocaleString("pt-BR")}.`,
      );
    }
  }

  toString() {
    return `ProgressoConteudo(aluno='${this.alunoEmail}', conteudo=${this.conteudoId}, status='${this.status}')`;
  }
}

module.exports = ProgressoConteudo;

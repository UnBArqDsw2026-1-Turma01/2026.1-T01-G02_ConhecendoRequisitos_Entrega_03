// Aluno.js — Colleague
// Representa um aluno que interage com o mediador para coordenar ações de aprendizagem.

class Aluno {
  constructor(email, nome) {
    this.email = email;
    this.nome = nome;
    this.ofensivaAtual = 0;
    this.maiorOfensiva = 0;
    this.ultimoAcesso = new Date();
  }

  selecionarTrilha(mediator, trilhaId) {
    console.log(`[ALUNO] '${this.nome}' selecionou a trilha ${trilhaId}.`);
    mediator.iniciarFluxo(this.email, trilhaId);
  }

  concluirConteudo(mediator, conteudoId) {
    console.log(`[ALUNO] '${this.nome}' concluiu o conteúdo ${conteudoId}.`);
    mediator.concluirConteudo(this.email, conteudoId);
  }

  iniciarQuiz(mediator, quizId) {
    console.log(`[ALUNO] '${this.nome}' iniciou o quiz ${quizId}.`);
    mediator.iniciarTentativaQuiz(this.email, quizId);
  }

  verificarOfensiva() {
    console.log(
      `[ALUNO] Ofensiva atual: ${this.ofensivaAtual} | Maior ofensiva: ${this.maiorOfensiva}`,
    );
    return this.ofensivaAtual;
  }

  toString() {
    return `Aluno(email='${this.email}', nome='${this.nome}', ofensiva=${this.ofensivaAtual})`;
  }
}

module.exports = Aluno;

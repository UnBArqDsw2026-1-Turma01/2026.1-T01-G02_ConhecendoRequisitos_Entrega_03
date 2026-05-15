const NaoIniciado = require("./NaoIniciado");

class TentativaQuiz {
  constructor(id, quiz) {
    this.id = id;
    this.quiz = quiz;
    this.status = "Não iniciado";
    this.dataDeFinalizacao = null;
    this.notaFinal = 0;
    this.aprovado = false;
    this.questaoAtual = null;
    this.respostas = [];
    this.acertos = 0;
    this.indiceAtual = 0;
    this.state = new NaoIniciado(this);
  }

  setState(state) {
    this.state = state;
  }

  iniciarQuiz(idQuiz) {
    console.log(`[TENTATIVA_QUIZ] Solicitado início do quiz ${idQuiz}.`);

    if (!this.quiz || this.quiz.id !== idQuiz) {
      console.log(
        `[TENTATIVA_QUIZ] O quiz informado não corresponde a esta tentativa.`,
      );
      return;
    }

    this.state.iniciar();
  }

  getProximaQuestao() {
    return this.state.proximo();
  }

  registrarResposta(correta) {
    if (!this.questaoAtual) {
      console.log(
        `[TENTATIVA_QUIZ] Nenhuma questão ativa para registrar resposta.`,
      );
      return;
    }

    this.respostas.push({
      questaoId: this.questaoAtual.id,
      correta,
    });

    if (correta) {
      this.acertos += 1;
    }

    console.log(
      `[TENTATIVA_QUIZ] Resposta da questão ${this.questaoAtual.id}: ${correta ? "correta" : "incorreta"}.`,
    );
    this.questaoAtual = null;
  }

  marcarQuestaoAtual(questao) {
    this.questaoAtual = questao;
    this.indiceAtual += 1;
  }

  obterQuestaoDisponivel() {
    return this.quiz.questoes[this.indiceAtual] ?? null;
  }

  calcularNotaFinal() {
    const totalQuestoes = this.quiz.questoes.length;
    this.notaFinal =
      totalQuestoes === 0
        ? 0
        : Math.round((this.acertos / totalQuestoes) * 100);
    this.aprovado = this.notaFinal >= 70;
  }

  atualizar() {
    console.log(
      `[TENTATIVA_QUIZ] Status=${this.status}, respostas=${this.respostas.length}/${this.quiz.questoes.length}, nota=${this.notaFinal}%.`,
    );
  }

  finalizar() {
    return this.state.finalizar();
  }

  visualizarResultado() {
    return this.state.visualizarResultado();
  }

  toString() {
    return `TentativaQuiz(id=${this.id}, status='${this.status}', notaFinal=${this.notaFinal}, aprovado=${this.aprovado})`;
  }
}

module.exports = TentativaQuiz;

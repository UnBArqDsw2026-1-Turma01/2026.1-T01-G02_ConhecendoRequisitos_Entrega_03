// TentativaQuiz.js — Colleague
// Registra uma tentativa do aluno em um quiz.

class TentativaQuiz {
  constructor(id, alunoEmail, quizId) {
    this.id = id;
    this.alunoEmail = alunoEmail;
    this.quizId = quizId;
    this.status = "iniciada";
    this.progresso = 0;
    this.dataFinalizacao = null;
  }

  iniciar() {
    this.status = "em progresso";
    console.log(
      `[TENTATIVA_QUIZ] Tentativa ${this.id} iniciada para o quiz ${this.quizId}.`,
    );
  }

  finalizar() {
    this.status = "finalizada";
    this.progresso = 100;
    this.dataFinalizacao = new Date();
    console.log(
      `[TENTATIVA_QUIZ] Tentativa ${this.id} finalizada em ${this.dataFinalizacao.toLocaleString("pt-BR")}.`,
    );
  }

  atualizarProgresso(novoProgresso) {
    this.progresso = novoProgresso;
    console.log(
      `[TENTATIVA_QUIZ] Tentativa ${this.id} agora em ${this.progresso}% de progresso.`,
    );
  }

  toString() {
    return `TentativaQuiz(id=${this.id}, aluno='${this.alunoEmail}', quiz=${this.quizId}, status='${this.status}')`;
  }
}

module.exports = TentativaQuiz;

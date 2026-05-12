const Prototype = require("../prototypes/Prototype");

class Quizz extends Prototype {
  constructor(id, titulo, qtdQuestoes) {
    super();
    this.id = id;
    this.titulo = titulo;
    this.qtdQuestoes = qtdQuestoes;
  }

  exibirProgresso() {
    return `Quiz ${this.titulo} possui ${this.qtdQuestoes} questões.`;
  }

  iniciarQuiz(email) {
    return `Quiz iniciado para o usuário ${email}.`;
  }

  clone() {
    return Object.assign(Object.create(Object.getPrototypeOf(this)), this);
  }
}

module.exports = Quizz;
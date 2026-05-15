class StateTentativaQuiz {
  constructor(tentativaQuiz) {
    if (new.target === StateTentativaQuiz) {
      throw new Error(
        "StateTentativaQuiz é abstrato e não pode ser instanciado diretamente.",
      );
    }

    this.tentativaQuiz = tentativaQuiz;
  }

  iniciar() {
    throw new Error("iniciar() deve ser implementado pela classe concreta.");
  }

  proximo() {
    throw new Error("proximo() deve ser implementado pela classe concreta.");
  }

  finalizar() {
    throw new Error("finalizar() deve ser implementado pela classe concreta.");
  }

  visualizarResultado() {
    throw new Error(
      "visualizarResultado() deve ser implementado pela classe concreta.",
    );
  }
}

module.exports = StateTentativaQuiz;

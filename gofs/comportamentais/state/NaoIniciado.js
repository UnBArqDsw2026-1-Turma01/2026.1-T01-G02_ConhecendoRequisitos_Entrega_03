const StateTentativaQuiz = require("./StateTentativaQuiz");

class NaoIniciado extends StateTentativaQuiz {
  iniciar() {
    const EmAndamento = require("./EmAndamento");

    this.tentativaQuiz.status = "Em andamento";
    console.log(
      `[NAO_INICIADO] Tentativa ${this.tentativaQuiz.id} iniciada para o quiz ${this.tentativaQuiz.quiz.id}.`,
    );
    this.tentativaQuiz.setState(new EmAndamento(this.tentativaQuiz));
    this.tentativaQuiz.atualizar();
  }

  proximo() {
    console.log(
      `[NAO_INICIADO] Não é possível avançar porque a tentativa ainda não foi iniciada.`,
    );
    return null;
  }

  finalizar() {
    console.log(
      `[NAO_INICIADO] Não é possível finalizar uma tentativa que ainda não começou.`,
    );
    return null;
  }

  visualizarResultado() {
    console.log(
      `[NAO_INICIADO] Resultado indisponível enquanto a tentativa não for iniciada.`,
    );
    return null;
  }
}

module.exports = NaoIniciado;

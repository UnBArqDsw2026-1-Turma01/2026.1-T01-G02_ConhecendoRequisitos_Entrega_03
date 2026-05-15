const StateTentativaQuiz = require("./StateTentativaQuiz");

class EmAndamento extends StateTentativaQuiz {
  iniciar() {
    console.log(
      `[EM_ANDAMENTO] A tentativa ${this.tentativaQuiz.id} já está em andamento.`,
    );
  }

  proximo() {
    const questao = this.tentativaQuiz.obterQuestaoDisponivel();

    if (!questao) {
      console.log("[EM_ANDAMENTO] Não há mais questões disponíveis.");
      return null;
    }

    this.tentativaQuiz.marcarQuestaoAtual(questao);
    console.log(`[EM_ANDAMENTO] Próxima questão: ${questao.enunciado}.`);
    return questao;
  }

  finalizar() {
    const Finalizado = require("./Finalizado");

    this.tentativaQuiz.calcularNotaFinal();
    this.tentativaQuiz.status = "Finalizado";
    this.tentativaQuiz.dataDeFinalizacao = new Date();
    console.log(
      `[EM_ANDAMENTO] Tentativa ${this.tentativaQuiz.id} finalizada.`,
    );
    this.tentativaQuiz.setState(new Finalizado(this.tentativaQuiz));
    this.tentativaQuiz.atualizar();
    return this.tentativaQuiz;
  }

  visualizarResultado() {
    console.log(
      `[EM_ANDAMENTO] O resultado só pode ser visualizado após a finalização.`,
    );
    return null;
  }
}

module.exports = EmAndamento;

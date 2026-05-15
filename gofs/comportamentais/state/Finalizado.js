const StateTentativaQuiz = require("./StateTentativaQuiz");

class Finalizado extends StateTentativaQuiz {
  iniciar() {
    console.log(
      `[FINALIZADO] A tentativa ${this.tentativaQuiz.id} já foi finalizada e não pode ser reiniciada.`,
    );
  }

  proximo() {
    console.log(
      `[FINALIZADO] Não existem próximas questões porque a tentativa já terminou.`,
    );
    return null;
  }

  finalizar() {
    console.log(
      `[FINALIZADO] A tentativa ${this.tentativaQuiz.id} já está finalizada.`,
    );
    return this.tentativaQuiz;
  }

  visualizarResultado() {
    const mensagem = `[FINALIZADO] Resultado da tentativa ${this.tentativaQuiz.id}: nota ${this.tentativaQuiz.notaFinal}%, ${this.tentativaQuiz.aprovado ? "aprovado" : "reprovado"}.`;
    console.log(mensagem);
    return mensagem;
  }
}

module.exports = Finalizado;

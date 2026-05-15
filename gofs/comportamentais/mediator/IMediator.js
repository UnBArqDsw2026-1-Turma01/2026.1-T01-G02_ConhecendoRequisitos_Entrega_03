// IMediator.js — Interface Mediator
// Define o contrato que o mediador deve implementar para coordenar colegas.

class IMediator {
  constructor() {
    if (new.target === IMediator) {
      throw new Error(
        "IMediator é uma interface e não pode ser instanciada diretamente.",
      );
    }
  }

  notify(sender, event, payload) {
    throw new Error("notify() deve ser implementado pela classe concreta.");
  }

  concluirConteudo(alunoId, conteudoId) {
    throw new Error(
      "concluirConteudo() deve ser implementado pela classe concreta.",
    );
  }

  iniciarQuiz(alunoId, quizId) {
    throw new Error(
      "iniciarQuiz() deve ser implementado pela classe concreta.",
    );
  }

  verificarConclusaoModulo(moduloId) {
    throw new Error(
      "verificarConclusaoModulo() deve ser implementado pela classe concreta.",
    );
  }

  obterProximoConteudo(alunoId, moduloId) {
    throw new Error(
      "obterProximoConteudo() deve ser implementado pela classe concreta.",
    );
  }
}

module.exports = IMediator;

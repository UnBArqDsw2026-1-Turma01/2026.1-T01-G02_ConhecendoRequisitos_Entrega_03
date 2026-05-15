// FluxoAprendizagemMediator.js — ConcreteMediator
// Implementação concreta do mediador que coordena o fluxo de aprendizagem.

const IMediator = require("./IMediator");

class FluxoAprendizagemMediator extends IMediator {
  constructor() {
    super();
    this.alunoAtual = null;
    this.trilhaAtual = null;
    this.moduloAtual = null;
    this.conteudoAtual = null;
    this.quizAtual = null;
    this.progressoConteudos = new Map(); // email_aluno:conteudo_id -> ProgressoConteudo
    this.progressoModulos = new Map(); // email_aluno:modulo_id -> ProgressoModulo
    this.tentativasQuiz = new Map(); // email_aluno:quiz_id -> TentativaQuiz
    this.proximoConteudoIndex = {}; // modulo_id -> índice do próximo conteúdo
  }

  iniciarFluxo(alunoEmail, trilhaId) {
    console.log(
      `\n[MEDIATOR] Iniciando fluxo para aluno ${alunoEmail} na trilha ${trilhaId}.\n`,
    );
    // Simulação: em produção, buscaria do banco dados
    this.alunoAtual = alunoEmail;
    this.trilhaAtual = trilhaId;
    this.proximoConteudoIndex[trilhaId] = 0;
  }

  concluirConteudo(alunoEmail, conteudoId) {
    console.log(
      `\n[MEDIATOR] Processando conclusão do conteúdo ${conteudoId} pelo aluno ${alunoEmail}.\n`,
    );

    // 1. Atualizar progresso do conteúdo
    const chaveProgresso = `${alunoEmail}:${conteudoId}`;
    if (this.progressoConteudos.has(chaveProgresso)) {
      this.progressoConteudos.get(chaveProgresso).atualizar("concluído");
    }

    // 2. Verificar se módulo foi concluído (simplificado)
    if (this.moduloAtual && this.moduloAtual.verificarConclusao()) {
      this.atualizarProgressoModulo(alunoEmail, this.moduloAtual.id, 100);

      // 3. Liberar quiz se houver
      this.liberarProximoQuiz(alunoEmail);
    }
  }

  atualizarProgressoConteudo(alunoEmail, conteudoId, status) {
    const chaveProgresso = `${alunoEmail}:${conteudoId}`;
    if (!this.progressoConteudos.has(chaveProgresso)) {
      const ProgressoConteudo = require("./ProgressoConteudo");
      this.progressoConteudos.set(
        chaveProgresso,
        new ProgressoConteudo(1, alunoEmail, conteudoId),
      );
    }
    this.progressoConteudos.get(chaveProgresso).atualizar(status);
  }

  atualizarProgressoModulo(alunoEmail, moduloId, percentagem) {
    const chaveModulo = `${alunoEmail}:${moduloId}`;
    if (!this.progressoModulos.has(chaveModulo)) {
      const ProgressoModulo = require("./ProgressoModulo");
      this.progressoModulos.set(
        chaveModulo,
        new ProgressoModulo(1, alunoEmail, moduloId),
      );
    }
    this.progressoModulos.get(chaveModulo).atualizar(percentagem);
  }

  verificarConclusaoModulo(moduloId) {
    return (
      this.moduloAtual &&
      this.moduloAtual.id === moduloId &&
      this.moduloAtual.concluido
    );
  }

  liberarQuiz(quizId) {
    console.log(`[MEDIATOR] Liberando quiz ${quizId}.`);
    if (this.quizAtual && this.quizAtual.id === quizId) {
      this.quizAtual.iniciar();
    }
  }

  liberarProximoQuiz(alunoEmail) {
    if (this.quizAtual) {
      console.log(
        `[MEDIATOR] Um quiz está disponível: ${this.quizAtual.titulo}`,
      );
      this.iniciarTentativaQuiz(alunoEmail, this.quizAtual.id);
    }
  }

  iniciarTentativaQuiz(alunoEmail, quizId) {
    console.log(
      `\n[MEDIATOR] Criando tentativa de quiz para aluno ${alunoEmail}.\n`,
    );

    const chaveQuiz = `${alunoEmail}:${quizId}`;
    if (!this.tentativasQuiz.has(chaveQuiz)) {
      const TentativaQuiz = require("./TentativaQuiz");
      const tentativa = new TentativaQuiz(1, alunoEmail, quizId);
      tentativa.iniciar();
      this.tentativasQuiz.set(chaveQuiz, tentativa);
      return tentativa;
    }
    return null;
  }

  obterProximoConteudo(alunoEmail, moduloId) {
    if (this.moduloAtual && this.moduloAtual.id === moduloId) {
      const indice = this.proximoConteudoIndex[moduloId] || 0;
      if (indice < this.moduloAtual.conteudos.length) {
        const proximoConteudo = this.moduloAtual.conteudos[indice];
        this.proximoConteudoIndex[moduloId] = indice + 1;
        console.log(`[MEDIATOR] Próximo conteúdo: ${proximoConteudo.titulo}`);
        return proximoConteudo;
      }
    }
    console.log(`[MEDIATOR] Sem mais conteúdos disponíveis.`);
    return null;
  }

  notify(sender, event, payload) {
    console.log(`[MEDIATOR] Notificação recebida de ${sender}: ${event}`);
  }

  finalizarFluxo() {
    console.log(
      `\n[MEDIATOR] Finalizando fluxo para aluno ${this.alunoAtual}.\n`,
    );
    this.alunoAtual = null;
    this.trilhaAtual = null;
    this.moduloAtual = null;
    this.conteudoAtual = null;
    this.quizAtual = null;
  }
}

module.exports = FluxoAprendizagemMediator;
